import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { BookComponent } from './components/book/book.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryComponent } from './components/category/category.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CustomerOrderDetailsComponent } from './components/customer-order-details/customer-order-details.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DebitCardComponent } from './components/debit-card/debit-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminHomeComponent } from './components/home/admin-home/admin-home.component';
import { CustomerHomeComponent } from './components/home/customer-home/customer-home.component';
import { HomeComponent } from './components/home/home.component';
import { ListbooksComponent } from './components/listbooks/listbooks.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OurMissionComponent } from './components/our-mission/our-mission.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ReviewComponent } from './components/review/review.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'book', component: BookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'log-out', component: LogOutComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'customer-home', component: CustomerHomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'our-mission', component: OurMissionComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'cart', component: CartComponent },
  { path: 'debit-card', component: DebitCardComponent },
  { path: 'listbooks', component: ListbooksComponent },
  { path: 'order-detailsSahithi', component: CustomerOrderDetailsComponent },
  { path: 'place-order', component: PlaceOrderComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
