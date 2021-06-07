import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Bookorder } from 'src/app/pojo/classes/bookorderSahithi';
import { Customer } from 'src/app/pojo/customer';
import { BookSahithiService } from 'src/app/services/bookSahithi.service';
export var orderId=Math.floor(1000 + Math.random() * 9000);
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit,OnChanges {
  constructor(private bookService:BookSahithiService) { }

  customerId: string = sessionStorage.getItem('userId') as string;
  subTotal: string = sessionStorage.getItem('subTotal') as string;
  customer: Customer  = new Customer();

  ngOnChanges(): void {
    if(this.bookOrder.paymentMethod==="CashOnDelivery") {
      this.isValid=true;
    }
    else {
      this.isValid=false;
    }
   
  }
  ngOnInit(): void {

  }
  array: string[] = ["CashOnDelivery","DebitCard"];
  bookOrder:Bookorder=new Bookorder(0,0,new Date(2021, 1, 1),0,"","","","","","");
  //orderId=Math.floor(1000 + Math.random() * 9000);
  orderID=orderId;
  isValid=true;
  
  
  public bookOrderDetails(){
    this.bookOrder.orderId = orderId;
    this.bookOrder.status="success";
    this.bookOrder.orderTotal = this.subTotal;
    this.bookOrder.cId = '45';
    console.log(sessionStorage.getItem('userId') as string);
    this.bookService.bookOrderDetails(this.bookOrder).subscribe((data:any)=>{this.bookOrder=data;});
    // if(this.bookOrder.paymentMethod==="CashOnDelivery")
    // this.isValid= true;      
  }
  

  

}
