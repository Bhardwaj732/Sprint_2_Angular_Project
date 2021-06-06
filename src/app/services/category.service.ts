import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../pojo/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/v1/category';

  constructor(private http: HttpClient) { }
  

  form: FormGroup = new FormGroup({

    categoryId: new FormControl(0),
    categoryName: new FormControl('', Validators.required)

});


initializeFormGroup() {
  this.form.setValue({
    categoryId:  0,
    categoryName: ''
  })
}


  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/viewAllCategory`);
  }

  removeCategoryById(categoryId: number): Observable<Category[]>{
    return this.http.delete<Category[]>(`${this.baseUrl}/removeCategoryById/${categoryId}`);
  }

  addCategory(category: Category): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/addCategory`, category);
  }

  updateCategory(category: Category): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/updateCategory`, category);
  }

  populateForm(category: any) {
    this.updateCategory(category);
  }
  
}
