import { Component, OnInit } from '@angular/core'
import axios from 'axios'
import { Router } from '@angular/router'
import {
  faEye,
  faEdit,
  faTrash,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-pages-item',
  templateUrl: './page-items.component.html',
  styleUrl: './page-items.component.css'
})
export class PagesItemComponent implements OnInit {
  items: any[] = []
  totalPages: number = 0
  currentPage: number = 0
  pageSize: number = 10
  searchItemName: string = ''
  sortDirection: string = 'asc'
  isModalOpen: boolean = false
  itemNameToDelete: string = ''
  itemIdToDelete: number = 0

  constructor(private router: Router) {}

  faEye = faEye
  faEdit = faEdit
  faTrash = faTrash
  faCheck = faCheck
  faTimes = faTimes

  goDetailItem(itemId: number): void {
    this.router.navigate(['/detail-item', itemId])
  }

  goAddItem(): void {
    this.router.navigate(['/add-item'])
  }

  goEditItem(itemId: number): void {
    this.router.navigate(['/edit-item', itemId])
  }

  ngOnInit(): void {
    this.getItems()
  }

  async getItems(page: number = 0): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/items?search=${this.searchItemName}&page=${page}&size=${this.pageSize}`
      )
      this.items = response.data._embedded.resAllItemses
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1 // currentPage dimulai dari 1
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  openDeleteConfirmationModal(itemId: number, itemName: string): void {
    this.itemIdToDelete = itemId
    this.itemNameToDelete = itemName
    this.isModalOpen = true
  }

  closeDeleteConfirmationModal(): void {
    this.isModalOpen = false
  }

  async confirmDeleteItem(): Promise<void> {
    try {
      const response = await axios.delete(
        `http://localhost:8080/items/${this.itemIdToDelete}`
      )
      console.log('Items deleted:', response.data)
      alert('Items berhasil dihapus')
      this.getItems(0)
    } catch (error) {
      console.error('Error deleting Items:', error)
      alert('Gagal menghapus Items')
    } finally {
      this.closeDeleteConfirmationModal()
    }
  }

  onPageChange(page: number): void {
    this.getItems(page - 1) // Karena pagination dimulai dari 1, sedangkan index page dimulai dari 0
  }

  searchItems(): void {
    this.getItems()
  }

  sortItems(): void {
    this.getItems()
  }

  pageSizeItems(): void {
    this.getItems()
  }

  formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  }
}