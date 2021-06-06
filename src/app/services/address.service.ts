import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../pojo/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl = 'http://localhost:8080/api/v1/address';

  constructor(private http: HttpClient) { }

  addAddress(address: Address): Observable<any>{
    return this.http.post(`${this.baseUrl}/addAddress`, address);
  }
}
