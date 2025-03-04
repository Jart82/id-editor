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

  // Styling properties
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
      this.editableFields = Object.keys(this.templateData);
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
    if (this.selectedField) {
      this.templateData[this.selectedField] = {
        text: this.templateData[this.selectedField] || "",
        styles: {
          fontSize: this.fontSize,
          color: this.fontColor,
          textAlign: this.textAlign
        }
      };
    }
    
    localStorage.setItem('templates', JSON.stringify([this.templateData]));
    alert('Changes Saved!');
  }

  // Function to get dynamic styles for a specific field
  getTextStyles(field: string) {
    if (this.templateData[field] && this.templateData[field].styles) {
      return {
        'font-size.px': this.templateData[field].styles.fontSize,
        'color': this.templateData[field].styles.color,
        'text-align': this.templateData[field].styles.textAlign
      };
    }
    return {};
  }
}
