import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiServiceService } from '../api.service';
import { Products } from '../products/add-product/add-product.component';
import { Register } from '../register/register.component';
export class Orders {
  discount: any;
  amount: any;
  productID: any;
  customerAddress: any;
  customerContactNumber: any;
  quantity: any;
  userId: any;
  constructor() {
    this.discount = 0
  }
}
@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent implements OnInit {
discontDetails: any;
products: any
  order: any;
  manufacturer: any;
  rate: any;
  amount: any;
  quantity: any;
  customers: any;
  address: any;
  contact_number: any;
  date = new Date()
  @Output() added = new EventEmitter<boolean>();
  productUpdate: any;
  userInfo: any;
  constructor(public api: ApiServiceService) {
    this.order = new Orders();
    this.productUpdate = new Products();
    this.userInfo = new Register();

   }
   addOrder(){
     console.log(this.order);
     this.order.quantity = this.quantity;
      this.api.postdata('orderdata', this.order).subscribe( ( res: any) => {
      this.productUpdate.quantity = this.productUpdate.quantity - this.quantity
        this.api.patchdata('products/' + this.order.productID, this.productUpdate).subscribe( ( res: any) => {
          console.log(res)
      }, error => {
        console.log(error)
      });
      this.userInfo.createLastBill = new Date()
      this.userInfo.billAmount = this.order.amount;
        this.api.patchdata('register/' + this.order.userId, this.userInfo).subscribe( ( res: any) => {
          console.log(res)
      }, error => {
        console.log(error)
      });
        this.order = new Orders();
        this.rate= '';
        this.manufacturer= '';
        this.amount= '';
        this.quantity= '';
        this.address= '';
        this.contact_number= '';
        this.added.emit(true)
        window.alert('Added')
      }, error => {
        console.log(error)
      });
   }
   upadteCustomeAddress(ev) {
     this.order.customerAddress = ev
   }
   upadteCustomeNumber(ev) {
     this.order.customerContactNumber = ev
   }
   getProductsBy(id) {
      this.api.getDataByID('products', id).subscribe( ( res: any) => {
        this.manufacturer = res.manufacturer;
        this.rate = res.price;
        this.productUpdate.quantity = res.quantity
      }, error => {
        console.log(error)
      });
    }
   getCustomerBy(id) {
      this.api.getDataByID('register', id).subscribe( ( res: any) => {
        this.address = res?.address + ' ' + res?.city + ' '+ res?.state  + ' '+res?.country;
        this.contact_number = res.contact_number;
        this.order.customerAddress = this.address
        this.order.customerContactNumber = this.contact_number
      }, error => {
        console.log(error)
      });
    }
  getCustomers() {
      this.api.getdata('register').subscribe( ( res: any) => {
        this.customers = res;
      }, error => {
        console.log(error)
      });
  }
 getProducts() {
      this.api.getdata( 'Allproducts').subscribe( (res: any) => {
        this.products = res
      }, err => {
        console.log(err);
  });
  }
  upadteQuantity(event) {
    setTimeout( () => {
      this.amount = event * this.rate;
      this.order.amount = this.amount - this.order.discount
      }, 500);
  }
  upadteQuantityWithDiscount(event) {
    setTimeout( () => {
      this.order.amount = this.amount - event
      }, 500);
  }
  ngOnInit(): void {
    this.getProducts();
    this.getCustomers();
  }

}
