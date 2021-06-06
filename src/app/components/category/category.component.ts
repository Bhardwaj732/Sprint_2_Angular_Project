import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/pojo/category';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  addForm!: FormGroup;
  Submitted = false; 
  categories!: Category[];

  category: Category = new Category();

  constructor(
    public categoryService: CategoryService, 
    public notificationService: NotificationService, 
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.getAllCategories();
   }


   saveproduct(): void {
    if (this.categoryService.form.valid) {
      // get('categoryId')?.value)
      if(this.categoryService.form.get('categoryId')?.value) {
        console.log(this.categoryService.form.get('categoryId')?.value);
        this.categoryService.addCategory(this.categoryService.form.value)
     .subscribe(
       data => { console.log(data); 
         this.categories=data;
         console.log(this.categories);
         this.notificationService.success(': :  Submitted successfully');
        //  this.router.navigate(['view']);              // route of view component
     },
       error => { console.log(error);  alert(error);}
     );
    }
    else {
      this.categoryService.updateCategory(this.category)
      .subscribe(
        data => { console.log(data); 
          this.categories=data;
          console.log(this.categories);
          this.notificationService.success(': :  Submitted successfully');
         //  this.router.navigate(['view']);              // route of view component
      },
        error => { console.log(error);  alert(error);}
      );
      console.log("Hello from Update");
    }
    this.categoryService.form.reset();
    this.categoryService.initializeFormGroup();
    this.onClose();
    }
 }




  onClear() {
    this.categoryService.form.reset();
    this.categoryService.initializeFormGroup();
  }


  // onSubmit() {
  //   if (this.categoryService.form.valid) {
  //     console.log("On submit")
  //     if(!this.categoryService.form.get('categoryId')?.value) {
  //       console.log("On submit2")
  //       this.categoryService.addCategory(this.categoryService.form.value);
  //       console.log("On submit3")
  //       this.notificationService.success(': :  Submitted successfully');
  //     }
  //     console.log("On submit4")
  //     this.categoryService.form.reset();
  //     this.categoryService.initializeFormGroup();
  //     // this.notificationService.success(': :  Submitted successfully');
  //     this.onClose();
  //   }
  // }


  onClose() {
    this.categoryService.form.reset();
    this.categoryService.initializeFormGroup();
    // this.dialogRef.close();
  }


  public getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public addCategory(category: Category): void {
    this.categoryService.addCategory(category).subscribe(
      (response: Category) => {
        this.category = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public updateCategory(category: Category): void {
    this.categoryService.updateCategory(category).subscribe(
      (response: Category) => {
        this.category = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public removeCategoryById(categoryId: number): void {
    this.categoryService.removeCategoryById(categoryId).subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
