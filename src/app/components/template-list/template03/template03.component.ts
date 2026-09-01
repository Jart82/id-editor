import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdCardTemplate } from '../../../models/id-card.model';
import { IdCardService } from '../../../services/id-card.service';

@Component({
  selector: 'app-template03',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template03.component.html',
  styleUrls: ['./template03.component.css'],
})
export class Template03Component implements OnInit {
  currentView: string = 'front';
  templates: IdCardTemplate[] = [];

  constructor(private router: Router, private idCard: IdCardService) {}

  ngOnInit() {
    this.templates = this.idCard.listTemplates();
  }

  selectTemplate(template: IdCardTemplate) {
    this.router.navigate(['/editor', template.id]);
  }

  startBlankCard() {
    this.router.navigate(['/editor', 'new']);
  }
}
