import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JagarinVariablesComponent } from "./components/jagarin-variables/jagarin-variables.component";
import { TemplateListComponent } from './components/template-list/template-list/template-list.component';

@Component({
  selector: 'app-root',
  imports: [TemplateListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'id-creator';
}
