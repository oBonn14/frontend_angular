import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import axios from 'axios'

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  idCustomer: number = 0
  formGroup!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.idCustomer = Number(this.route.snapshot.paramMap.get('idCustomer'))

    this.formGroup = this.formBuilder.group({
      customerName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern(/^([^0-9]*)$/)
        ]
      ],
      customerAddress: ['', [Validators.maxLength(100)]],
      customerNumber: ['', [Validators.pattern(/^0\d{9,12}$/)]],
      file: [null]
    })

    this.loadCustomerData()
  }

  async loadCustomerData(): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/${this.idCustomer}`
      )
      const customerData = response.data

      this.formGroup.patchValue({
        customerName: customerData.customerName,
        customerAddress: customerData.customerAddress,
        customerNumber: customerData.customerNumber
      })
    } catch (error) {
      console.error('Error fetching customer data:', error)
    }
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.files && inputElement.files.length > 0) {
      this.formGroup.controls['file'].setValue(inputElement.files[0])
    }
  }

  async onSubmitForm(): Promise<void> {
    if (this.formGroup.invalid) {
      console.log('Formulir tidak valid')
      return
    }

    try {
      const formData = new FormData()
      formData.append('customerName', this.formGroup.get('customerName')?.value)
      formData.append(
        'customerAddress',
        this.formGroup.get('customerAddress')?.value
      )
      formData.append(
        'customerNumber',
        this.formGroup.get('customerNumber')?.value
      )
      formData.append('file', this.formGroup.get('file')?.value)

      const response = await axios.put(
        `http://localhost:8080/customer/${this.idCustomer}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log('Customer updated:', response.data)
      alert('Customer berhasil di updated')
      this.router.navigate([''])
    } catch (error) {
      console.error('Error updating customer:', error)
      alert('Customer gagal di update')
    }
  }
}