import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { TemplateListModule } from '../template-list/template-list.module';

@NgModule({
  declarations: [], // Declare CategoryComponent here
  imports: [
    CommonModule,
    CategoryComponent,
    TemplateListModule // Import TemplateListModule instead of TemplateListComponent
  ],
  exports: [CategoryComponent], // Export CategoryComponent for use elsewhere
})
export class CategoryModule { }
