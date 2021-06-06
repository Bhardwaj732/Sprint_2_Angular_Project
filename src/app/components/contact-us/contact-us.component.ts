import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactUs } from 'src/app/pojo/contact-us';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private contactUsService: ContactUsService,
    private modalService: NgbModal) { }

  displayedColumns: string[] = ['heading', 'comment', 'date', 'email', 'actions'];
  dataSource!: MatTableDataSource<ContactUs>;
  searchKey: string='';
  closeResult: string = '';

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  contacts!: ContactUs[];
  contact: ContactUs = new ContactUs();

  ngOnInit(): void {
    this.getAllContactUs();
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


  openDetails(targetModal: any, contactUs: ContactUs) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
    document.getElementById('heading')?.setAttribute('value', contactUs.heading);
    document.getElementById('comment')?.setAttribute('value', contactUs.comment);
    document.getElementById('date')?.setAttribute('value', contactUs.date+"");
    document.getElementById('email')?.setAttribute('value', contactUs.email);

  }

  remove(contactId: number): void {
    this.contactUsService.deleteContactUs(contactId)
      .subscribe(
        data => {
          console.log(data);
          this.contacts = data;
          this.ngOnInit();
          console.log(this.contacts);
        },
        error => { 
          console.log(error); 
          alert(error); }
      );
  }


  public getAllContactUs(): void {
    this.contactUsService.getAllContactUs().subscribe(
     data => {
        this.contacts = data;
        console.log(this.contacts);
        this.dataSource = new MatTableDataSource(this.contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
