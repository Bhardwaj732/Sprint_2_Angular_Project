import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../pojo/book';
import { Customer } from '../pojo/customer';
import { OrderDetails } from '../pojo/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  private baseUrl = 'http://localhost:8080/api/v1/orderdetails';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`${this.baseUrl}/getAllOrders`);
  }

  cancelOrder(orderDetail: OrderDetails): Observable<OrderDetails>{
    return this.http.put<OrderDetails>(`${this.baseUrl}/deleteCustomerById/`, orderDetail);
  }

  addOrder(orderDetail: OrderDetails): Observable<any>{
    return this.http.post(`${this.baseUrl}/addOrder`, orderDetail);
  }

  orderByBook(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`${this.baseUrl}/orderByBook`);
  }
  
  viewOrderForCustomer(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`${this.baseUrl}/viewOrderForCustomer`);
  }

  viewOrderForAdmin(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`${this.baseUrl}/viewOrderForAdmin`);
  }

  listOrderByCustomer(customer: Customer): Observable<OrderDetails[]> {
    return this.http.post<OrderDetails[]>(`${this.baseUrl}/listOrderByCustomer`, customer);
  }

  listBestSellingBook(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/listBestSellingBook`);
  }
}
