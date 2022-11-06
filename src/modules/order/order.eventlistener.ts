import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { KadoEvent } from '../../enums/kado.events.enum';
import NotificationService from '../../providers/notification/notification.service';
import { UserDocument } from '../user/user.schema';
import { OrderDocument } from './order.schema';

@Injectable()
export class OrderEventListener {
  constructor(private readonly sendEmailService: NotificationService) {}

  @OnEvent(KadoEvent.ORDER_SUCCESSFUL)
  handleOrderSuccessfulEvent(order: OrderDocument, user: UserDocument) {
    // this.sendEmailService.sendOneEmail({
    //   email: user?.email,
    //   subjectOrTemplateId: '',
    // });
    console.log('handleOrderSuccessfulEvent :: order \n %o', order);
  }
}
