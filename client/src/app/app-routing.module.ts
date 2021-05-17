import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductsComponent } from './products/products.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { TrackComponent } from './track/track.component';
import { ShowOrderComponent } from './sales-order/show-order/show-order.component';
import { ViewOrderComponent } from './sales-order/view-order/view-order.component';
import { CustomersComponent } from './customers/customers.component';
import { AddProductComponent } from './products/add-product/add-product.component';
const routes: Routes = [
  {path: '', redirectTo: '/login' , pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: DashboardComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'prdouct/edit/:id', component: AddProductComponent},
  {path: 'distributors', component: DistributorsComponent},
  {path: 'sales-orders', component: ShowOrderComponent},
  {path: 'track', component: TrackComponent},
  {path: 'profile/:id', component: RegisterComponent},
  {path: 'order/view/:id', component: ViewOrderComponent},
  {path: 'user/edit/:id', component: RegisterComponent},
  {path: 'customers', component: CustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
