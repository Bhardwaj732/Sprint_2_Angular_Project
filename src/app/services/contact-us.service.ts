import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactUs } from '../pojo/contact-us';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/v1/contactUs';

  getAllContactUs(): Observable<ContactUs[]> {
    return this.http.get<ContactUs[]>(`${this.baseUrl}/getAllContactUs`);
  }


  addContactUs(contactUs: ContactUs): Observable<any>{
    return this.http.post(`${this.baseUrl}/addContactUs`, contactUs);
  }


  deleteContactUs(contactId: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/deleteContactUs/${contactId}`);
  }
}
