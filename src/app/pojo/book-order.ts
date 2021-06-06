import { Address } from "./address";
import { Customer } from "./customer";

export class BookOrder {

    orderId: number=0;
    customer: Customer = new Customer();
    orderDate!: Date;
    orderTotal: number = 0;
    status: string='';
    shippingAddress: Address = new Address();
    paymentMethod: string='';
    recipientName: string='';
    recipientPhone: string='';
}
