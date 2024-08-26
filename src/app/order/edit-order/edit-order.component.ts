import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import axios from 'axios'

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
export class EditOrdersComponent implements OnInit {
  orderId: number = 0
  formGroup!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  goToPagesOrder(): void {
    this.router.navigate(['/order'])
  }

  ngOnInit() {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'))

    this.formGroup = this.formBuilder.group({
      orderCode: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(32)]
      ],
      quantity: [
        '',
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(/^[0-9]+$/)
        ]
      ]
    })

    this.loadOrderData()
  }

  async loadOrderData(): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/orders/${this.orderId}`
      )
      const orderData = response.data

      this.formGroup.patchValue({
        orderCode: orderData.codeOrder,
        quantity: orderData.quantity
      })
    } catch (error) {
      console.error('Error fetching order data:', error)
    }
  }

  async onSubmitForm(): Promise<void> {
    if (this.formGroup.invalid) {
      console.log('Formulir tidak valid');
      return;
    }
  
    try {
      const jsonData = {
        orderCode: this.formGroup.get('orderCode')?.value,
        quantity: this.formGroup.get('quantity')?.value
      };
  
      console.log('JSON Data:', jsonData);
  
      const response = await axios.put(
        `http://localhost:8080/orders/${this.orderId}`,
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log('Order yang berhasil diupdate:', response.data); // Log data yang berhasil diupdate
  
      alert('Order berhasil diupdate');
      this.router.navigate(['/order']);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Order gagal diupdate');
    }
  }
  
}