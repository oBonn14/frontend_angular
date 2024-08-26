import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import axios from 'axios'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit {
  formGroup!: FormGroup
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  goToPagesItem(): void {
    this.router.navigate(['/item'])
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      itemName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern(/^([^0-9]*)$/)
        ]
      ],
      stock: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(14),
          Validators.pattern(/^[1-9][0-9]*$/)
        ]
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(14),
          Validators.pattern(/^[1-9][0-9]*$/)
        ]
      ]
    })
  }
  async onSubmitForm(): Promise<void> {
    if (this.formGroup.invalid) {
      console.log('Formulir tidak valid')
      return
    }

    try {
      const itemData = {
        itemName: this.formGroup.value.itemName,
        stock: this.formGroup.value.stock,
        price: this.formGroup.value.price
      }

      const response = await axios.post(
        'http://localhost:8080/items/addItems',
        itemData, 
        {
          headers: {
            'Content-Type': 'application/json'  
          }
        }
      )

      console.log('Item added:', response.data)
      alert('Item berhasil ditambahkan')
      this.router.navigate(['/item'])
    } catch (error) {
      console.error('Error add Item:', error)
    }
}
}