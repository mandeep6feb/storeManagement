import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api.service';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.css']
})
export class DistributorsComponent implements OnInit {
distributors: any;
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

      let link= `distributor?` + `page=` + this.page + `&limit=` + this.limit;
      this.api.getdata( link).subscribe( (res: any) => {
        this.distributors = res.data;
        this.totalItems = res.meta;
        for (let index = 1; index <= res.meta.totalPages; index++) {
          this.pages.push({index: index})
        }
      }, err => {
        console.log(err);
  });

  }
  goToPage(event): void {
    this.pages = []
    this.pageNo =event;
    this.page = this.pageNo;
    this.get();
  } 
  onTableDataChange(event){
    this.pages = []

    this.page = event;
    this.get();
  } 
   onTableSizeChange(event): void {
    this.pages = []

    this.limit = event.target.value;
    this.page = 1;
    this.get();
  }  
  del(id){
    window.alert('Are you sure ?')
    this.api.deletedata('distributor', id).subscribe( res=> {
      this.get();
      
      window.location.reload()
    })
  }
  ngOnInit(): void {
  this.role = JSON.parse(localStorage.getItem('user'));

  this.get()
  }

}
