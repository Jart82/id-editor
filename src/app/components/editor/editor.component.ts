import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeComponent]
})
export class EditorComponent implements OnInit {
  templateData: any = {}; 
  currentView: string = 'front';
  editMode: boolean = false;

  // Default Styles
  fontSize: number = 16;
  fontColor: string = "#000000";
  textAlign: string = "center";
  bgColor: string = "#ffffff";

  // Editable fields
  editableFields: string[] = [];
  selectedField: string = '';

  constructor(private router: Router) {
    this.templateData = history.state.templateData || {};

    if (!this.templateData || Object.keys(this.templateData).length === 0) {
      console.warn("No template data found in state. Redirecting...");
      this.router.navigate(['/template']);
    } else {
      console.log("Loaded template data:", this.templateData);
      this.editableFields = Object.keys(this.templateData); // Extract field names dynamically
    }
  }

  ngOnInit() {}

  changeView(viewName: string) {
    this.currentView = viewName;
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    console.log('Updated Template:', this.templateData);
    alert('Changes Saved!');
  }
}
