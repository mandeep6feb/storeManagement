import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from './api.service';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { TrackComponent } from './track/track.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddDistributorComponent } from './distributors/add-distributor/add-distributor.component';
import { ShowOrderComponent } from './sales-order/show-order/show-order.component';
import { ViewOrderComponent } from './sales-order/view-order/view-order.component';
import { CustomersComponent } from './customers/customers.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    ProductsComponent,
    UsersComponent,
    ProfileComponent,
    DistributorsComponent,
    SalesOrderComponent,
    TrackComponent,
    AddProductComponent,
    AddDistributorComponent,
    ShowOrderComponent,
    ViewOrderComponent,
    CustomersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoadingBarModule,
    NgxPaginationModule
  ],
  providers: [ApiServiceService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
