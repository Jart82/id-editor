import { Component } from '@angular/core';
import { NgxBarcode6Module } from 'ngx-barcode6';

@Component({
  selector: 'app-template01',
  standalone: true, // ✅ Ensure standalone component
  imports: [NgxBarcode6Module], // ✅ Correct usage in Angular 15+
  templateUrl: './template01.component.html',
  styleUrls: ['./template01.component.css']
})
export class Template01Component {
  logo: string = 'assets/bird_2.jpg';
  companyName: string = 'Sacred Heart Hospital';
  name: string = 'Sarah Symon';
  role: string = 'Nurse';
  idNumber: string = '12345';
  passport: string = 'assets/closeup-young-female-professional-making-eye-contact-against-colored-background.jpg';
  department: string = 'Pediatrics';
  barcode: string = '';

  currentView: string = 'front';

  changeView(viewName: string) {
    this.currentView = viewName;
  }
}
