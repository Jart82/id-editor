import { Routes } from '@angular/router';
import { EditorComponent } from './components/template-list/editor/editor.component';
import { TemplateListComponent } from './components/template-list/template-list/template-list.component';

export const routes: Routes = [  // Add 'export' before 'const routes'
  { path: '', component: TemplateListComponent },
  { path: 'editor/:id', component: EditorComponent },
];
export class AppRoutingModule { }
