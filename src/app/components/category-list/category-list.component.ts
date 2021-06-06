import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/pojo/category';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(
    private service: CategoryService, 
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['categoryId', 'categoryName', 'actions', ];
  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  searchKey: string='';
  closeResult: string = '';
  editForm!: FormGroup;
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  cateroies!: Category[];

  category: Category = new Category();
  
  ngOnInit(): void {
    this.reloadData();
    this.editForm = this.fb.group({
      categoryId: [0],
      categoryName: ['']
    });
  }


  reloadData() {

    this.service.getAllCategories().subscribe(
      data => {
        this.cateroies = data;
        this.listData = new MatTableDataSource(this.cateroies);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    // this.service.getAllCategories().subscribe(
    //   list => {
    //     let array = list.map(item => {
    //       return {
    //         categoryId: item.categoryId,
    //         categoryName: item.categoryName                                      //payload.val()
    //       };
    //     });
    //     this.listData = new MatTableDataSource(array);
    //     console.log(array);
    //     this.listData.sort = this.sort;
    //     this.listData.paginator = this.paginator;
    //     this.listData.filterPredicate = (data, filter) => {
    //       return this.displayedColumns.some(ele => {
    //         return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
    //       });
    //     };
    //   }
    // );
  }


  onSearchClear() {
    this.searchKey='';
    this.applyFilter();
  }


  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
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


  onSubmit(f: NgForm) {
    console.log(f.value);
    this.service.addCategory(f.value).subscribe(
      result => {
        this.cateroies=result;
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.modalService.dismissAll();
  }


  openEdit(targetModal: any, category: Category) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'sm'
    });
    console.log(category.categoryId);
    console.log(category.categoryName);
    this.editForm.patchValue({
      categoryId: category.categoryId,
      categoryName: category.categoryName
    });
  }


  onSave() {
    console.log(this.editForm.value);
    this.service.updateCategory(this.editForm.value)
      .subscribe((result) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }


  onCreate() {
      this.service.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "50%";
      this.dialog.open(CategoryComponent, dialogConfig);
  }


  // onEdit(row: any) {
  //     this.service.populateForm(row);
  //     const dialogConfig = new MatDialogConfig();
  //     dialogConfig.disableClose = true;
  //     dialogConfig.autoFocus = true;
  //     dialogConfig.width = "50%";
  //     this.dialog.open(CategoryComponent, dialogConfig);
  // }

  editproduct():void{​​​​​​​​
    this.service.updateCategory(this.category)
      .subscribe(
        data => {​​​​​​​​ console.log(data);  
          // this.cateroies = data; 
          this.reloadData();}​​​​​​​​,
        error => {​​​​​​​​ console.log(error);  }​​​​​​​​
      );
  }​​​​​​​​


  // onDelete(categoryId: any) {
  //   this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
  //     .afterClosed().subscribe(res => {
  //       if(res) {
  //         this.service.removeCategoryById(categoryId);
  //         this.notificationService.warn('! Deleted successfully');
  //       }
  //     });
  // }


  onDelete(categoryId: number): void {
    this.service.removeCategoryById(categoryId).subscribe(
      (result) => {
        console.log("In delete=== result " + result);
        this.cateroies=result;
        this.ngOnInit();
        console.log("In delete=== categories " + this.cateroies);
      },
      error => {
        console.log(error);
      }
    );


    // this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    // .afterClosed().subscribe( res => {
    //   if(res) {
    //     this.service.removeCategoryById(categoryId)
    //      .subscribe(
    //       data => { console.log(data); 
    //         this.cateroies = data;
    //       this.notificationService.warn('! Deleted successfully');
    //       console.log(this.cateroies);
    //     },
    //     error => { console.log(error);  alert(error);}
    //   );
    //   }
    // });
    // this.ngOnInit();
     
  }

}
