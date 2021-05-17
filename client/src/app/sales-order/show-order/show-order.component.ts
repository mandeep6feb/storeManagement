import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {
  orders: any;
  role: any;

  constructor(public api: ApiServiceService) { }
getOrders() {
      this.api.getdata('orderDetails').subscribe( (res: any) => {
        this.orders = res
      }, err => {
        console.log(err);
  });
  }
  ngOnInit(): void {
  this.role = JSON.parse(localStorage.getItem('user'));
  this.getOrders()
  }

}
