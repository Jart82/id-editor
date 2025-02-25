import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-template02',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './template02.component.html',
  styleUrl: './template02.component.css'
})
export class Template02Component {

   schoolLogo: string = 'assets/bird_2.jpg'; 
   studentName: string = 'Abraham Nicholas';
   schoolName: string = 'Classical International High School';
   studentYear: string = '2015/2016'
   studentId: string = 'STU-123456';
   grade: string = '200 Level';
   schoolAddress: string = '3125ELM ST, SCOTTSDALE AZ 85257'
   studentPhoto: string = 'assets/serious-young-african-man-standing-isolated.jpg';
}
