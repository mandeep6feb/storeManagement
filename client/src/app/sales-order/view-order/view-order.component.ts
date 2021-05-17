import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/api.service';
export class Orders {
  discount: any;
  amount: any;
  productID: any;
  customerAddress: any;
  customerContactNumber: any;
  userId: any;
  constructor() {
    this.discount = 0
  }
}
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
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
  customer: any;
  customerName: any;
  orders: any;
  constructor(public api: ApiServiceService, private route: ActivatedRoute) {
    this.order = new Orders();
    this.route.params.subscribe(param => {
      if (param.id) {
        this.getOrderBy(param.id);
      }
    });
   }
   print(){
     window.print()
   }
   getOrderBy(id) {
      this.api.getdata("orderls/" + id).subscribe(
      (res: any) => {
        this.order = res;
          this.api.getdata("products/" + this.order.productID).subscribe(
          (res1: any) => { this.products = res1;   },
          (error) => {
            console.log(error);
          }
        );
          this.api.getdata("register/" + this.order.userId).subscribe(
          (res2: any) => { this.customer = res2;  
           },
          (error) => {
            console.log(error);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
    }
  ngOnInit(): void {
  }

}
