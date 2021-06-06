import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/pojo/book';
import { Customer } from 'src/app/pojo/customer';
import { OrderDetails } from 'src/app/pojo/order-details';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns: string[] = ['orderId', 'bookId', 'title', 'email', 'quantity', 'subtotal', 'actions'];
  dataSource!: MatTableDataSource<OrderDetails>;
  searchKey: string='';
  closeResult: string = '';

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  public orderDetails!: OrderDetails[];
  public books!: Book[];
  orderDetail: OrderDetails = new OrderDetails();

  constructor(
    private orderDetailsService: OrderDetailsService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllOrders();
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


  openDetails(targetModal: any, orderDetail: OrderDetails) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
    document.getElementById('orderId')?.setAttribute('value', orderDetail.bookOrder.orderId+"");
    document.getElementById('bookId')?.setAttribute('value', orderDetail.book.bookId+"");
    document.getElementById('title')?.setAttribute('value', orderDetail.book.title);
    document.getElementById('paymentMethod')?.setAttribute('value', orderDetail.bookOrder.paymentMethod);
    document.getElementById('author')?.setAttribute('value', orderDetail.book.author);
    document.getElementById('email')?.setAttribute('value', orderDetail.bookOrder.customer.email);
    document.getElementById('quantity')?.setAttribute('value', orderDetail.quantity+"");
    document.getElementById('subtotal')?.setAttribute('value', orderDetail.subtotal+"");
    document.getElementById('categoryName')?.setAttribute('value', orderDetail.book.category.categoryName);
    document.getElementById('status')?.setAttribute('value', orderDetail.bookOrder.status);

  }


  public getAllOrders(): void {
    this.orderDetailsService.getAllOrders().subscribe(
      response => {
        this.orderDetails = response;
        this.dataSource = new MatTableDataSource(this.orderDetails);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public cancelOrder(orderDetail: OrderDetails): void {
    this.orderDetailsService.cancelOrder(orderDetail).subscribe(
      (response: OrderDetails) => {
        this.orderDetail = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public addOrder(orderDetail: OrderDetails): void {
    this.orderDetailsService.addOrder(orderDetail).subscribe(
      (response: any) => {
        this.orderDetails = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public orderByBook(): void {
    this.orderDetailsService.orderByBook().subscribe(
      (response: OrderDetails[]) => {
        this.orderDetails = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public viewOrderForCustomer(): void {
    this.orderDetailsService.viewOrderForCustomer().subscribe(
      (response: OrderDetails[]) => {
        this.orderDetails = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public viewOrderForAdmin(): void {
    this.orderDetailsService.viewOrderForAdmin().subscribe(
      (response: OrderDetails[]) => {
        this.orderDetails = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 


  public listOrderByCustomer(customer: Customer): void {
    this.orderDetailsService.listOrderByCustomer(customer).subscribe(
      (response: OrderDetails[]) => {
        this.orderDetails = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public listBestSellingBook(): void {
    this.orderDetailsService.listBestSellingBook().subscribe(
      (response: Book[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
