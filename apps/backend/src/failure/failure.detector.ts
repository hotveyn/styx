import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Device, Goal } from '@prisma/client';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { DateTime } from 'luxon';
import { ParameterCenter } from 'src/parameter/parameter.center';
import { PrismaService } from 'src/prisma/prisma.service';

interface IMetric {
  achieves: string[];
  infoes: { date: string; log: string }[];
  errors: { date: string; log: string }[];
}

@Injectable()
export class FailureDetector implements OnApplicationBootstrap {
  devices: Device[] = [];
  a: AxiosInstance;
  tryingParse: boolean = false;
  POOL = 20;
  lastStartDate: DateTime;
  openConnections: number = 0;

  async onApplicationBootstrap() {
    await this.prisma.device.updateMany({ data: { isAlive: false } });

    // this.start();
  }

  constructor(
    private readonly prisma: PrismaService,
    private readonly parameterCenter: ParameterCenter,
  ) {
    this.a = axios.create({
      timeout: 500,
    });

    axiosRetry(this.a, {
      retries: 2,
      retryDelay: (retryCount) => retryCount * 1000,
    });
  }

  private async start() {
    console.log('------------------------- STARTING -------------------------');
    this.lastStartDate = DateTime.now();
    await this.parseDevices();
    await this.fillPrimaryDevicesPool();
  }

  private async fillPrimaryDevicesPool() {
    const devicesToCheck = new Array(
      this.POOL > this.devices.length ? this.devices.length : this.POOL,
    )
      .fill(0)
      .map(() => this.checkDevice(this.devices.shift()));

    await Promise.all(devicesToCheck);
  }

  async signalAboutChecked() {
    this.openConnections--;
    console.log(this.openConnections, this.devices.length);
    if (this.openConnections === 0 && this.devices.length === 0) {
      const nextStartDelay =
        this.parameterCenter.getDeviceDetectInterval() -
        (Number(DateTime.now().toFormat('x')) -
          Number(this.lastStartDate.toFormat('x')));

      setTimeout(
        async () => {
          await this.start();
        },
        nextStartDelay > 0 ? nextStartDelay : 0,
      );
    } else {
      setImmediate(async () => {
        await this.checkDevice(this.devices.shift());
      });
    }
  }

  private async checkDevice(device: Device | undefined) {
    if (!device) return;
    this.openConnections++;

    try {
      const metric = await this.a.get<IMetric>(
        `http://${device.ip}:${device.port}/metric`,
      );
      await Promise.all([
        this.signalAboutChecked(),
        this.processAcceptedDeviceData(device, metric.data),
      ]);
      console.log(`${device.code} access`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        await Promise.all([
          this.signalAboutChecked(),
          this.processRejectedDeviceData(device),
        ]);
        console.log(`${device.code} error`);
      } else {
        console.log(e);
      }
    }
  }

  private async processAcceptedDeviceData(
    device: Partial<Device>,
    metrics: IMetric,
  ) {
    const goals: Array<Goal> = await Promise.all(
      metrics.achieves.map(async (achieve) => {
        return await this.prisma.goal.findUnique({
          where: {
            code: achieve,
          },
        });
      }),
    );

    const goalAchievePrefab: {
      goalId: number | bigint;
      deviceId: number | bigint;
    }[] = [];

    for (let i = 0; i < goals.length; i++) {
      if (!goals[i]) {
        goals.splice(i, 1);
        i--;
      } else {
        if (goals[i].id)
          goalAchievePrefab.push({
            goalId: goals[i].id,
            deviceId: device.id,
          });
      }
    }

    await this.prisma.$transaction([
      this.prisma.device.update({
        where: {
          id: device.id,
        },
        data: {
          lastActionDate: DateTime.now().toISO(),
          isAlive: true,
        },
      }),
      this.prisma.logInfo.createMany({
        data: metrics.infoes.map((info) => {
          return {
            deviceCode: device.code,
            requestTime: DateTime.now().toISO(),
            body: info,
          };
        }),
      }),
      this.prisma.logError.createMany({
        data: metrics.errors.map((error) => {
          return {
            deviceCode: device.code,
            requestTime: DateTime.now().toISO(),
            body: error,
          };
        }),
      }),
      this.prisma.goalAchiev.createMany({
        data: goalAchievePrefab,
      }),
      this.prisma.failure.updateMany({
        data: {
          reparedDate: DateTime.now().toISO(),
        },
        where: {
          reparedDate: null,
          deviceId: device.id,
        },
      }),
    ]);
  }

  private async processRejectedDeviceData(device: Partial<Device>) {
    if (!device.isAlive) return;

    const prismaCallbacks = [
      this.prisma.device.update({
        where: {
          id: device.id,
        },
        data: {
          isAlive: false,
        },
      }),
      this.prisma.failure.create({
        data: {
          deviceId: device.id,
        },
      }),
    ];

    await this.prisma.$transaction(prismaCallbacks);
  }

  private async parseDevices() {
    this.tryingParse = true;

    this.devices = await this.prisma.device.findMany({
      where: {
        isDeleted: null,
      },
    });

    this.tryingParse = false;
  }
}
