import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateListComponent } from './components/template-list/template-list/template-list.component';
import { CategoryComponent } from "./components/template-list/category/category.component";

@Component({
  selector: 'app-root',
  imports: [CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'id-creator';
}
