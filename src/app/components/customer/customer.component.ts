import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/pojo/address';
import { Customer } from 'src/app/pojo/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['customerId', 'fullName', 'email', 'mobileNumber', 'actions'];
  dataSource!: MatTableDataSource<Customer>;
  searchKey: string='';
  closeResult: string = '';

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  

  customers!: Customer[];
  customer: Customer = new Customer();
  custAddress!: Address;

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    
    this.customerService.getCustomerList().subscribe(
      data => {
        this.customers = data;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  onSearchClear() {
    this.searchKey='';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  public getCustomers(): void {
    this.customerService.getCustomerList().subscribe(
     data => {
        this.customers = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  openDetails(targetModal: any, customer: Customer) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
    document.getElementById('customerId')?.setAttribute('value', customer.customerId+"");
    document.getElementById('fullName')?.setAttribute('value', customer.fullName);
    document.getElementById('email')?.setAttribute('value', customer.email);
    document.getElementById('mobileNumber')?.setAttribute('value', customer.mobileNumber+"");
    document.getElementById('registerOn')?.setAttribute('value', customer.registerOn + "");
    document.getElementById('address')?.setAttribute('value', customer.address.address);
    document.getElementById('city')?.setAttribute('value', customer.address.city);
    document.getElementById('country')?.setAttribute('value', customer.address.country);

  }




  // reloadData() {
  //   this.customerService.getCustomerList()
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.customers = data;
  //         console.log(this.customers);
  //       },
  //       error => { console.log(error); alert(error); }
  //     );
  // }

  remove(customerId: number): void {
    this.customerService.deleteCustomer(customerId)
      .subscribe(
        data => {
          console.log(data);
          this.customers = data;
          this.ngOnInit();
          console.log(this.customers);
        },
        error => { 
          console.log(error); 
          alert(error); }
      );
  }

  // remove(pid:number):void{
  //   //this.products = this.service.removeProductById(pid);
  //   this.service.removeProductById(pid)
  //     .subscribe(
  //       data => { console.log(data); 
  //        // this.products = data as Product[];
  //         this.products = data ;
  //         console.log(this.products);
  //       },
  //       error => { console.log(error);  alert(error);}
  //     );
     
  // }

  detail(customerId: number): void {
    this.customerService.getCustomerById(customerId)
      .subscribe(
        data => { console.log(data); this.customer = data; },
        error => { console.log(error); alert(error); }
      );

  }

  editproduct(): void {
    this.customerService.updateCustomer(this.customer)
      .subscribe(
        data => {
          console.log(data);
          this.customers = data;
          this.getCustomers();
        },
        error => { console.log(error); }
      );
  }


  saveproduct() {
    this.customerService.createCustomer(this.customer)
      .subscribe(
        data => {
          console.log(data);
          this.customers = data;
          console.log(this.customers);
          alert('Product is added');
          // this.router.navigate(['view']);              // route of view component
        },
        error => { console.log(error); alert(error); }
      );

  }

}
