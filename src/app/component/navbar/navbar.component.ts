import { Component } from '@angular/core';
import {
  faUsers,
  faBox,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faUsers = faUsers
  faBox = faBox
  faShoppingCart = faShoppingCart
}
