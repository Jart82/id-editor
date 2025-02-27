import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Template01Component } from '../template01/template01.component';
import { CommonModule } from '@angular/common';
import { Template03Component } from "../template03/template03.component";
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-template-list',
  standalone: true,  // ✅ Add this line
  imports: [Template01Component, CommonModule,  Template03Component],
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {
  selectedTemplate: any;
  // @Input() category: string = 'all';

  // constructor(private router: Router) {}

  // openEditor(template: any) {
  //   const templateId = this.getTemplateId(template); // Get unique ID
  //   this.router.navigate(['/editor', templateId], { state: { templateData: template } });
  // }

  // getTemplateId(template: any): string {
  //   return template.idNumber || template.studentId || 'default-id'; // Ensure an ID exists
  // }
  @Input() category: string = 'all';

  constructor(private router: Router) {}

  openEditor(data: any) {
    console.log(data.idNumber)
  this.selectedTemplate = data;
    this.router.navigate([`/editor/${data.idNumber}`, {state:{
      template: this.selectedTemplate
    }}]); // Correctly formatted route
  }
  
  

  getTemplateId(template: any): string {
    return template.idNumber || template.studentId || 'default-id'; // Ensure an ID exists
  }
}
