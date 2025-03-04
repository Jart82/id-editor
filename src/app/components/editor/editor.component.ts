import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeComponent, DragDropModule ],
})
export class EditorComponent implements OnInit {
  templateData: any = {};
  currentView: string = 'front';
  editMode: boolean = false;

  // Styling properties
  fontSize: number = 16;
  fontColor: string = '#000000';
  textAlign: string = 'center';
  bgColor: string = '#ffffff';
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
      console.warn('No template data found in state. Redirecting...');
      this.router.navigate(['/template']);
    } else {
      console.log('Loaded template data:', this.templateData);
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
        text: this.templateData[this.selectedField] || '',
        styles: {
          fontSize: this.fontSize,
          color: this.fontColor,
          textAlign: this.textAlign,
        },
      };
    }

    // Retrieve existing templates from local storage
    let storedTemplates = localStorage.getItem('templates');
    let templates: any[] = storedTemplates ? JSON.parse(storedTemplates) : [];

    const index = templates.findIndex(
      (t: any) => t.studentId === this.templateData.studentId
    );

    if (index !== -1) {
      templates[index] = this.templateData;
    } else {
      templates.push(this.templateData);
    }

    localStorage.setItem('templates', JSON.stringify(templates));
    alert('Changes Saved!');
  }

  onDragEnd(event: any, field: string) {
    if (!this.templateData[field]) {
      this.templateData[field] = {};
    }
  
    this.templateData[field].position = {
      x: event.source.getFreeDragPosition().x,
      y: event.source.getFreeDragPosition().y,
    };
  
    this.saveTemplateToLocalStorage();
  }

  saveTemplateToLocalStorage() {
    localStorage.setItem('templates', JSON.stringify(this.templateData));
  }
  

  getTextStyles(field: string) {
    if (this.templateData[field] && this.templateData[field].styles) {
      return {
        'font-size.px': this.templateData[field].styles.fontSize,
        color: this.templateData[field].styles.color,
        'text-align': this.templateData[field].styles.textAlign,
        'position': 'absolute',
        'left.px': this.templateData[field]?.position?.x || 0,
        'top.px': this.templateData[field]?.position?.y || 0,
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
