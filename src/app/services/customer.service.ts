import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../pojo/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8080/api/v1/customer';

  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/getAllCustomers`);
  }

  getCustomerById(customerId: number): Observable<Customer>{
    return this.http.get<Customer>(`${this.baseUrl}/getCustomerById/${customerId}`);
  }

  deleteCustomer(customerId: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/deleteCustomerById/${customerId}`);
  }

  createCustomer(customer: Customer): Observable<any>{
    return this.http.post(`${this.baseUrl}/createCustomer`, customer);
  }

  updateCustomer(customer: Customer): Observable<any>{
    return this.http.put(`${this.baseUrl}/updateCustomer`, customer);
  }
  // getProductList(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/getall`);
  // }

  // removeProductById(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/deleteproduct/` + id);
  // }

  // createProduct(product: Product): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/create`, product);
  // }

  // getProduct(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/getproduct/${id}`);
  // }

  // editProduct(product: Product): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/updateproduct`, product);
  // }

  // getAboutUs(): Observable<any> {
  //   return this.http.get('assets/about.json');
  // }
  
}
