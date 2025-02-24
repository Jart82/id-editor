import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateListComponent } from './template-list.component';


@NgModule({
  declarations: [],
  imports: [CommonModule, TemplateListComponent],
  exports: [TemplateListComponent] // Export it so CategoryModule can use it
})
export class TemplateListModule { }
