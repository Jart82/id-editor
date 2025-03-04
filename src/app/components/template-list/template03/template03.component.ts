import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-template03',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './template03.component.html',
  styleUrls: ['./template03.component.css']
})
export class Template03Component implements OnInit {
  currentView: string = 'front';
  selectedTemplate: any = null;
  templates: any[] = [];

  defaultTemplates = [
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
      schoolWaterMark: "assets/watermark.png",
      bgColor: "#ffffff"
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
      schoolWaterMark: "assets/watermark.png",
      bgColor: "#ffffff"
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTemplates();
  }

  loadTemplates() {
    const storedTemplates = localStorage.getItem('templates');
    if (storedTemplates) {
      this.templates = JSON.parse(storedTemplates);
    } else {
      // Save initial templates if nothing is found in local storage
      this.templates = [...this.defaultTemplates];
      localStorage.setItem('templates', JSON.stringify(this.templates));
    }
  }

  selectTemplate(template: any) {
    this.selectedTemplate = template;
    console.log("Navigating to editor with:", template);
    this.router.navigate(['editor'], { state: { templateData: this.selectedTemplate } });
  }

  editTemplate(template: any) {
    const editingTemplate = { ...template };
    this.router.navigate(['/editor'], { state: { templateData: editingTemplate } });
  }
}
