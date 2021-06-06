import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { BookComponent } from './components/book/book.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryComponent } from './components/category/category.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AdminHomeComponent } from './components/home/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ReviewComponent } from './components/review/review.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  // { path: 'customer', component: CustomerComponent },
  // { path: 'book', component: BookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'log-out', component: LogOutComponent },



  { path: 'book-list', component: BookListComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
