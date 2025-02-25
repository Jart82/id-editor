import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Template01Component } from '../template01/template01.component';
import { CommonModule } from '@angular/common';
import { Template02Component } from "../template02/template02.component";
import { Template03Component } from "../template03/template03.component";

@Component({
  selector: 'app-template-list',
  standalone: true,  // ✅ Add this line
  imports: [Template01Component, CommonModule, Template02Component, Template03Component],
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {
  @Input() category: string = 'all';
  @Output() templateSelected = new EventEmitter<any>(); // Emit selected template data

  selectTemplate(templateData: any) {
    this.templateSelected.emit(templateData); // Send selected template data to parent
  }
}
