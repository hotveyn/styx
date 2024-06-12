import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Client as SSHClient } from 'ssh2';

export interface Message {
  type: string;
  data: object;
}

export interface ConnectionMessage {
  user: string;
  password: string;
  host: string;
  port: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'ssh',
  transports: ['websocket'],
})
export class SshGateway {
  @WebSocketServer()
  server: Server;

  sshConnections: [];

  private logger = new Logger('SshGateway');

  handleConnection() {
    this.logger.debug('SSH client connected');
  }
  handleDisconnect() {}
  @SubscribeMessage('init')
  async handleSshConnect(
    @MessageBody() eData: ConnectionMessage,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(eData);
    const sshConnection = new SSHClient();
    sshConnection
      .on('ready', function () {
        client.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
        sshConnection.shell(function (err, stream) {
          if (err)
            return client.emit(
              'data',
              '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n',
            );
          client.on('data', function (data) {
            stream.write(data);
          });
          stream
            .on('data', function (d) {
              client.emit('data', d.toString());
            })
            .on('close', function () {
              sshConnection.end();
            });
        });
      })
      .on('close', function () {
        client.emit('data', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
      })
      .on('error', function (err) {
        client.emit(
          'data',
          '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n',
        );
      });

    sshConnection.connect(eData);
  }
}
