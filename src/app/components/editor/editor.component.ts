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
  borderRadius: number = 40;
  borderSize: number = 2;
  borderStyle: string = 'solid';
  borderColor: string = 'black';

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

  editField(field: string) {
    this.selectedField = field;
    this.editMode = true;
  }

  saveChanges() {
    if (this.selectedField) {
      this.templateData[this.selectedField] = {
        text: this.templateData[this.selectedField]?.text || "",
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

  isImageField(field: string): boolean {
    return ['studentPhoto', 'schoolLogo', 'signature'].includes(field);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.templateData[this.selectedField] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
