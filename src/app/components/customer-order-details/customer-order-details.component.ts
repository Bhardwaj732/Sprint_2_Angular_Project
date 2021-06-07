import { Component, OnInit } from '@angular/core';
import { Bookorder } from 'src/app/pojo/classes/bookorderSahithi';
import { BookSahithiService } from 'src/app/services/bookSahithi.service';
import {orderId} from 'src/app/components/place-order/place-order.component'

@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.css']
})
export class CustomerOrderDetailsComponent implements OnInit {

  constructor(private bookService:BookSahithiService) { }

  bookOrder:Bookorder=new Bookorder(0,0,new Date(2021, 1, 1),0,"","","","","","");
  ngOnInit(): void {
    console.log("Order Id " + orderId);
    this.bookService.getOrderDetails(orderId).subscribe((data:any)=>{this.bookOrder=data;})
  }

}
