interface StyxBrowserOptions {
  test: boolean;
  url: string;
  deviceCode: string;
}

export class StyxBrowser {
  constructor(private readonly options: StyxBrowserOptions) {}

  public async sendInfo(log: Record<string, unknown>) {
    await fetch(new URL('/log-info/send-log', this.options.url).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: JSON.stringify(log),
        deviceCode: this.options.deviceCode,
        requestTime: new Date(),
      }),
    });
  }

  public async sendError(log: Record<string, unknown>) {
    await fetch(new URL('/log-error/send-log', this.options.url).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: JSON.stringify(log),
        deviceCode: this.options.deviceCode,
        requestTime: new Date(),
      }),
    });
  }

  public async achieveGoal(goalCode: string) {
    await fetch(new URL('/goal-achieve', this.options.url).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        goalCode: goalCode,
        deviceCode: this.options.deviceCode,
      }),
    });
  }
}
