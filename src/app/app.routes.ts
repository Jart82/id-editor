import { Routes } from '@angular/router';
import { JagarinVariablesComponent } from './components/jagarin-variables/jagarin-variables.component';
import { EditorComponent } from './components/editor/editor.component';

export const routes: Routes = [  // Add 'export' before 'const routes'
  { path: '', component: JagarinVariablesComponent },
  { path: 'editor/:id', component: EditorComponent },
];
export class AppRoutingModule { }
