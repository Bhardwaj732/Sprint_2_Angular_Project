import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsService } from './services/order-details.service';
import { CustomerService } from './services/customer.service';
import { BookService } from './services/book.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CategoryService } from './services/category.service';
import { LoginService } from './services/login.service';
import { ReviewService } from './services/review.service';
import { NgxPopper } from 'angular-popper';
import { MaterialModule } from './material/material.module';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { BookComponent } from './components/book/book.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CategoryComponent } from './components/category/category.component';
import { ReviewComponent } from './components/review/review.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminHomeComponent } from './components/home/admin-home/admin-home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerComponent,
    LoginComponent,
    LogOutComponent,
    BookComponent,
    OrderDetailsComponent,
    CategoryComponent,
    ReviewComponent,
    MatConfirmDialogComponent,
    CategoryListComponent,
    BookListComponent,
    ContactUsComponent,
    AdminHomeComponent,
    FooterComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPopper,
    MaterialModule,
  ],
  providers: [BookService, CategoryService, CustomerService, LoginService, OrderDetailsService, ReviewService, FormBuilder],
  bootstrap: [AppComponent],
  entryComponents: [BookComponent, MatConfirmDialogComponent]
})
export class AppModule { }
