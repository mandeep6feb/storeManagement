import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { noop } from 'rxjs';
import { ApiServiceService } from 'src/app/api.service';
export class Distributort {
      distributor_name: any;
    distributor_address: any;
    userId: any;
    Code: any;
  constructor() {
  }
}
export class Inventory {
      productId: any;
      distributorId: any;
      units: any;
      distributor_price: any;
  constructor() {
  }
}
@Component({
  selector: 'app-add-distributor',
  templateUrl: './add-distributor.component.html',
  styleUrls: ['./add-distributor.component.css']
})
export class AddDistributorComponent implements OnInit {

  dist: any;
  distributor: any;
  inventry: any;
  contactNumber: any;
  manufacturer: any;
  file: File;
  @Output() added = new EventEmitter<boolean>();
  products: any;
  users: any;
  quantity: any;
  role: any;
  codeLast: any;
  lastCODE: string;
  constructor(public api: ApiServiceService) { 
    this.dist = new Distributort();
    this.inventry = new Distributort();
  }
    getUser(id) {
      this.api.getDataByID('register', id).subscribe( ( res: any) => {
         this.contactNumber = res.contact_number;
      }, error => {
        console.log(error)
      });
    }
    getProducts(id) {
      this.api.getDataByID('products', id).subscribe( ( res: any) => {
        this.manufacturer = res.manufacturer;
        this.inventry.units = res.quantity;
        this.inventry.distributor_price = res.price;
      }, error => {
        console.log(error)
      });
    }
  getProductsData() {
      this.api.getdata('products').subscribe( ( res: any) => {
        this.products = res.Data;
      }, error => {
        console.log(error)
      });
  }
  get() {
      this.api.getdata('distributor').subscribe( ( res: any) => {
        this.distributor = res.data;
          
          
      }, error => {
        console.log(error)
      });
  }
  getuserData() {
      this.api.getdata('register').subscribe( ( res: any) => {
        this.users = res;
      }, error => {
        console.log(error)
      });
  }
  postRegister() {
      if(this.distributor.length >= 1){
        this.codeLast = this.distributor[0].Code;
        let spilt = Number = this.codeLast.split('C00')[1];
          let increaseCodeNo = parseInt(spilt) + 1;
          this.lastCODE = "C00" + increaseCodeNo;
        this.dist.Code = this.lastCODE;
        this.api.postdata('distributor', this.dist).subscribe( ( res: any) => {
          this.dist = new Distributort();
          this.get()
          this.added.emit(true)
        }, error => {
          console.log(error)
        });
      } else {
        this.dist.Code = "C001"
        this.api.postdata('distributor', this.dist).subscribe( ( res: any) => {
          this.dist = new Distributort();
          this.get()
          this.added.emit(true)
        }, error => {
          console.log(error)
        });
      }
      
  }
 
  
  ngOnInit(): void {
  this.role = JSON.parse(localStorage.getItem('user'));
    this.get();
    this.getuserData();
    this.getProductsData();
  }

}
