import { Injectable } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { KadoNotificationEvent } from '../../enums/kado.events.enum';
import { ISingleEmail } from './notification.enum';

@Injectable()
export default class NotificationService {
  private notificationClient: ClientProxy;

  constructor() {
    const tcpOptions: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host: process.env.NOTIFICATION_SERVICE_HOST,
        port: parseInt(process.env.NOTIFICATION_SERVICE_PORT),
      },
    };

    this.notificationClient = ClientProxyFactory.create(tcpOptions);
  }

  async sendOneEmail(payload: ISingleEmail): Promise<void> {
    this.notificationClient.emit(KadoNotificationEvent.SINGLE_MAIL, payload);
  }
}
