export class Bookorder {
    orderId:number=0;
    customerId: string='';
    orderDate!:Date;
    orderTotal: string='';
    recipientName:string='';
    recipientPhone:string='';
    paymentMethod:string='';
    status:string ='';
    address:string ='';
    cId: string='';
    constructor(orderId:number,customerId:number,orderDate:Date,orderTotal:number, recipientName:string,
        recipientPhone:string , paymentMethod:string,address:string,status:string, cId: string ){}
}
