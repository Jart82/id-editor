import { Component,  } from '@angular/core';
import { TemplateListComponent } from '../template-list/template-list.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [TemplateListComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})


export class CategoryComponent {
  isSidebarOpen = false;
  selectedCategory: string = 'all';

  constructor(private router: Router) {}

  changeCat(category: string) {
    this.selectedCategory = category;
  }

  // ✅ Navigate to editor when a template is clicked
  onTemplateSelected(template: any) {
    this.router.navigate(['/editor', template.id]); // Pass template ID to route
  }
}
