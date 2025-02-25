import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  imports: [FormsModule, CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  logo: string = '';
  companyName: string = '';
  name: string = '';
  role: string = '';
  idNumber: string = '';
  passport: string = '';
  department: string = '';
  barcode: string = '';

  // Settings panel state
  isSettingsOpen: boolean = false;

  // Open/Close Settings Panel
  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }
}
