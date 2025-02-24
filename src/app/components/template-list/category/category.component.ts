import { Component, inject } from '@angular/core';
import { TemplateListComponent } from '../template-list/template-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [TemplateListComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})


export class CategoryComponent {
  isSidebarOpen = false;
  selectedCategory: string = 'all'; // Default category

  // Function to update category
  changeCat(category: string) {
    this.selectedCategory = category;
  }
}
