import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product: any;
  role: any;
  pagination: Array<any> = [];
  page = 1;
  pageNo: any;
  limit = 5;
  size = 5;
  totalItems : any;
  tableSizes = [5, 10, 15, 20, 25 , 50 ,100];
  pages: any;
  constructor(public api: ApiServiceService) { 
    this.pages = []
  }
   get() {
    this.pages = []

      let link= `products?` + `page=` + this.page + `&limit=` + this.limit;
      this.api.getdata( link).subscribe( (res: any) => {
        this.product = res.Data;
        this.totalItems = res;
        for (let index = 1; index <= res.totalPages; index++) {
          this.pages.push({index: index})
        }
        console.log( this.totalItems);
      }, err => {
        console.log(err);
  });

      // this.api.getdata('products').subscribe( ( res: any) => {
      //   console.log(res)
      //   this.product = res.Data;
      // this.totalItems = res;
        
      //   console.log(this.pages)
      // }, error => {
      //   console.log(error)
      // });
  }
  goToPage(event): void {
    this.pages = []
    this.pageNo =event;
    this.page = this.pageNo;
    // this.getFilterData();
    this.get();
  } 
  onTableDataChange(event){
    this.pages = []

    this.page = event;
    // this.getFilterData();
    this.get();
  } 
   onTableSizeChange(event): void {
    this.pages = []

    this.limit = event.target.value;
    this.page = 1;
    // this.getFilterData();
    this.get();
  }  
  del(id){
    this.api.deletedata('products', id).subscribe( res=> {
      this.get()
    })
  }
  ngOnInit(): void {
  this.role = JSON.parse(localStorage.getItem('user'));

    this.get()
  }

}
