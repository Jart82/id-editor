import { Component, Input } from '@angular/core';
import { Template01Component } from '../template01/template01.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-list',
  standalone: true,  // ✅ Add this line
  imports: [Template01Component, CommonModule],
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {
  @Input() category: string = 'all';
}
