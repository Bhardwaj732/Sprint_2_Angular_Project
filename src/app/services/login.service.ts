import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserClass } from '../pojo/user-class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) { }

  validateUser(email: string, password: string): Observable<any> {

    return this.http.get(`${this.baseUrl}/validateCustomer/${email}/${password}`);
  }


  addUser(userClass: UserClass): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUser`, userClass);
  }


}
