import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Payment } from 'src/app/pojo/classes/paymentSahithi';
import { BookSahithiService } from 'src/app/services/bookSahithi.service';

@Component({
  selector: 'app-debit-card',
  templateUrl: './debit-card.component.html',
  styleUrls: ['./debit-card.component.css']
})
export class DebitCardComponent implements OnInit,OnChanges {
  isPresent=true;
  constructor(private bookService:BookSahithiService) { }
  ngOnChanges(): void {
    this.isPresent=!this.isPresent;
  }
  payment:Payment=new Payment("",0,"",0,"");
  message:any;


  ngOnInit(): void {
  }
  public addPayment(){
    this.bookService.addPayment(this.payment).subscribe((data)=>{this.message=data;});
    this.isPresent=!this.isPresent;
    alert("Your OTP is: "+Math.floor(1000 + Math.random() * 9000));
  }
 
}
