import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './component/home/home.component'
import { AddCustomerComponent } from './component/add-customer/add-customer.component'
import { EditCustomerComponent } from './component/edit-customer/edit-customer.component'
import { AddOrderComponent } from './order/add-order/add-order.component'
import { PagesOrderComponent } from './order/pages-order/pages-order.component'
import { AddItemComponent } from './items/add-item/add-item.component'
import { EditItemComponent } from './items/edit-item/edit-item.component'
import { PagesItemComponent } from './items/page-items/page-items.component'
import { NavbarComponent } from './component/navbar/navbar.component'
import { EditOrdersComponent } from './order/edit-order/edit-order.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'edit-customer/:idCustomer', component: EditCustomerComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'order', component: PagesOrderComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'edit-item/:itemId', component: EditItemComponent },
  { path: 'item', component: PagesItemComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'edit-order/:orderId', component: EditOrdersComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}