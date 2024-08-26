import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { CommonModule } from '@angular/common'
import { AppComponent } from './app.component'
import { HomeComponent } from './component/home/home.component'
import { AddCustomerComponent } from './component/add-customer/add-customer.component'
import { EditCustomerComponent } from './component/edit-customer/edit-customer.component'
import { AddOrderComponent } from './order/add-order/add-order.component'
import { PagesOrderComponent } from './order/pages-order/pages-order.component'
import { AddItemComponent } from './items/add-item/add-item.component'
import { EditItemComponent } from './items/edit-item/edit-item.component'
import { PagesItemComponent } from './items/page-items/page-items.component'
import { NavbarComponent } from './component/navbar/navbar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { EditOrdersComponent } from './order/edit-order/edit-order.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    AddOrderComponent,
    PagesOrderComponent,
    AddItemComponent,
    EditItemComponent,
    PagesItemComponent,
    NavbarComponent,
    EditOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}