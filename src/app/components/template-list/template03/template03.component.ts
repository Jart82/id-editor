import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-template03',
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './template03.component.html',
  styleUrl: './template03.component.css'
})
export class Template03Component {
  schoolLogo: string = 'assets/bird_2.jpg'; 
   studentName: string = 'Abraham Nicholas';
   schoolName: string = 'Classical International High School';
   studentYear: string = '2015/2016'
   studentId: string = 'STU-123456';
   grade: string = '200 Level';
   schoolAddress: string = '3125ELM ST, SCOTTSDALE AZ 85257'
   studentPhoto: string = 'assets/serious-young-african-man-standing-isolated.jpg';
}
