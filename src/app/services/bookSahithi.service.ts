import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../pojo/book';
import { CartQuantity } from '../pojo/cart-quantity';
import { Bookorder } from '../pojo/classes/bookorderSahithi';
import { Cart } from '../pojo/classes/cartSahithi';
import { Payment } from '../pojo/classes/paymentSahithi';
import { Register } from '../pojo/classes/registerSahithi';

@Injectable({
  providedIn: 'root'
})
export class BookSahithiService {
  //  private baseUrl:string ="http://localhost:8085/BookManagement/getall";
  
  constructor(private httpClient:HttpClient) { }
  
  // public getBookList():Observable<Book[]>{
  //    return this.httpClient.get<Book[]>(`${this.baseUrl}`);
  // }

  // public doRegistration(register: any){
  //   return this.httpClient.post("http://localhost:8085/BookManagement/addRegisterer",
  //                                  register,{responseType:'text' as 'json'});
  // }
 
  // private loginURL:string ="http://localhost:8085/BookManagement/login";
  // public login():Observable<Register[]>{
  //   return this.httpClient.get<Register[]>(`${this.loginURL}`);
  // }
  
  public showCart():Observable<Cart[]>{
    return this.httpClient.get<Cart[]>(`${"http://localhost:8080/BookManagement/showCart"}`);
  }

  public addToCart(cart: Cart) {
    return this.httpClient.post("http://localhost:8080/BookManagement/addToCart", cart);
  }

  public deleteBookFromCart(title:string) {
    console.log(title);
    return  this.httpClient.delete("http://localhost:8080/BookManagement/deleteBookFromCart/"+title);
  }

  public increaseQuantity(title: any) {
    return  this.httpClient.put("http://localhost:8080/BookManagement/addQuantity/"+title,title
    ,{responseType:'text' as 'json'});
  }
  
  public bookOrderDetails(bookOrder: any) {
    return this.httpClient.post("http://localhost:8080/BookManagement/addBookOrder",bookOrder,{responseType:'text' as 'json'});
  }
   public decreaseQunatity(title:any){
    return  this.httpClient.put("http://localhost:8080/BookManagement/decreaseQuantity/"+title,title
    ,{responseType:'text' as 'json'});
   }
   public addPayment(payment: Payment) {
    return this.httpClient.post("http://localhost:8080/BookManagement/doPayment",
    payment,{responseType:'text' as 'json'});
  }
  public getOrderDetails(orderId:number):Observable<Bookorder[]> {
    return this.httpClient.get<Bookorder[]>(`${"http://localhost:8080/BookManagement/getOrder/"+orderId}`);
  }

  public getCartValue(customerId: string): Observable<CartQuantity> {
    return this.httpClient.get<CartQuantity>("http://localhost:8080/api/v1/cartQuantity/getCartValue/"+ customerId)
  }

  public increaseCartValue(cartQuantity: CartQuantity): Observable<CartQuantity> {
    return this.httpClient.put<CartQuantity>("http://localhost:8080/api/v1/cartQuantity/increaseCartValue", cartQuantity)
  }


  public decreasedCartValue(cartQuantity: CartQuantity): Observable<CartQuantity> {
    return this.httpClient.put<CartQuantity>("http://localhost:8080/api/v1/cartQuantity/decreasedCartValue", cartQuantity)
  }


  // private totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // getCartItems() {
  //     return this.totalItems.asObservable();
  // }

  // updateCartItems(items: number) {
  //     this.totalItems.next(items);
  // }
  
  
  
 
  
  
  

}

