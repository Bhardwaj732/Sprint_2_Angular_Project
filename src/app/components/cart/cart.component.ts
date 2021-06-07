import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cart } from 'src/app/pojo/classes/cartSahithi';
import { BookSahithiService } from 'src/app/services/bookSahithi.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private bookService:BookSahithiService) { }
  
  // cart:Cart =new Cart(1,"",2,1,1);
  cart1:Cart[] =[];
  
  sum=0;
  ngOnInit(): void {   
    this.showCart();
  }
  public showCart(){
    
    this.bookService.showCart().subscribe(data=>{this.cart1=data;});
   
   }
   public deleteBookFromCart(cart: any){
     this.bookService.deleteBookFromCart(cart.title).subscribe(()=>{});
     
   }
   public increaseQunatity(cart:any){
     this.bookService.increaseQuantity(cart.title).subscribe(()=>{ this.ngOnInit();
});
     
   }
   public decreaseQunatity(cart:any){
     this.bookService.decreaseQunatity(cart.title).subscribe(()=>{ this.ngOnInit();
    
    });
   }
   public totalBill(){
    this.bookService.showCart().subscribe(data=>{this.cart1=data;
      this.sum=0;
      this.cart1.forEach((data)=>{
        this.sum=(data.price*data.quantity)+this.sum;
        sessionStorage.setItem('subTotal', this.sum+'');
  });
    });
    return this.sum;
  
   
   }
   
   exit() {
    location.reload();
  }
  
  
}
