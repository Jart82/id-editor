import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-template03',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './template03.component.html',
  styleUrls: ['./template03.component.css'] // ✅ Fixed incorrect property name
})
export class Template03Component {
  currentView: string = 'front';
  selectedTemplate: any = null;

  templates = [
    {
      name: "ID Template 1",
      schoolLogo: "assets/school-logo.jpg",
      studentName: "ABRAHAM JOHN",
      schoolName: "Springfield High",
      studentYear: "2025",
      studentId: "12345",
      grade: "10th Grade",
      schoolAddress: "123 School St, City",
      studentPhoto: "assets/serious-young-african-man-standing-isolated.jpg",
      signature: "assets/signature.png",
      schoolWaterMark: "assets/watermark.png"
    },
    {
      name: "ID Template 2",
      schoolLogo: "assets/school-logo.jpg",
      studentName: "HARRY MAGUIRE",
      schoolName: "FEDERAL UNIVERSITY OF BENIN",
      studentYear: "2025",
      studentId: "12345",
      grade: "200 LEVEL",
      department: "PHARMACY",
      schoolAddress: "123 School St, City",
      studentPhoto: "assets/closeup-young-female-professional-making-eye-contact-against-colored-background.jpg",
      signature: "assets/signature.png",
      schoolWaterMark: "assets/watermark.png"
    }
  ];

  constructor(private router: Router) {}

  

  selectTemplate(template: any) {
    this.selectedTemplate = template;
  
    console.log("Navigating to editor with:", template); 
  
    this.router.navigate(['editor'], { state: { templateData: this.selectedTemplate } });
  }
  
  

  editTemplate(template: any) {
    // ✅ Uses object spread to prevent missing fields
    const editingTemplate = { ...template };
    
    this.router.navigate(['/editor'], { state: { templateData: editingTemplate } });
  }
}
