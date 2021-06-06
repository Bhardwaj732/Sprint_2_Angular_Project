import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from 'src/app/pojo/address';
import { Customer } from 'src/app/pojo/customer';
import { SignUp } from 'src/app/pojo/sign-up';
import { UserClass } from 'src/app/pojo/user-class';
import { AddressService } from 'src/app/services/address.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private customerService: CustomerService,
    private addressService: AddressService) { }

    userClass: UserClass = new UserClass();
    customer: Customer = new Customer();
    addres: Address = new Address();
    signUp!: SignUp;
    userId: number =0;
    addressId: number=0;
    model: any = {};

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {
    this.userId = Math.floor((Math.random() * 10000) + 1);
    this.addressId = Math.floor((Math.random() * 1000000) + 1);
    console.log(this.userId);
    console.log(this.addressId);
    console.log(f.value);
    this.signUp=f.value;
    console.log("vale : " + this.signUp.email);

    this.userClass.userId = this.userId;
    this.userClass.email = this.signUp.email;
    this.userClass.password = this.signUp.password;
    this.userClass.role = "customer";

    this.addres.addressId = this.addressId;
    this.addres.address = this.signUp.address;
    this.addres.city = this.signUp.city;
    this.addres.country = this.signUp.country;
    this.addres.pincode = this.signUp.pincode;

    console.log(this.addres);

    this.customer.customerId = this.userId;
    this.customer.fullName = this.signUp.fullName;
    this.customer.email = this.signUp.email;
    this.customer.mobileNumber = this.signUp.mobileNumber;
    this.customer.password = this.signUp.password;
    this.customer.address = this.addres;
    this.customer.userClass = this.userClass;
    console.log(this.customer.mobileNumber);
    console.log(this.signUp.mobileNumber);

    console.log("userClass Value : " + this.userClass.userId);

    this.loginService.addUser(this.userClass).subscribe(
      result => {
        this.ngOnInit();
        this.addressService.addAddress(this.addres).subscribe(
          data => {
            this.ngOnInit();
            this.customerService.createCustomer(this.customer).subscribe(
              response => {
                this.ngOnInit();
              },
              error => {
                alert(error);
              }
            );
          }
        );
      },
      error => {
        alert(error);
      }
    );



    
    // this.addressService.addAddress(this.addres).subscribe(
    //   data => {
    //     this.ngOnInit();
    //   }
    // )

    
    // this.customerService.createCustomer(this.customer).subscribe(
    //   response => {
    //     this.ngOnInit();
    //   },
    //   error => {
    //     alert(error);
    //   }
    // );
    // this.loginService.addUser()
    // console.log(f.value);
    // this.bookService.addBook(f.value).subscribe(
    //   (result) => {
    //     this.ngOnInit();
    //   }
    // );
  }

}
