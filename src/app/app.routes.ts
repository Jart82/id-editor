import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditorComponent } from './components/editor/editor.component';
import { AppComponent } from './app.component';
import { Template03Component } from './components/template-list/template03/template03.component';

export const routes: Routes = [  // Add 'export' before 'const routes'
  { path: '', redirectTo: 'template', pathMatch: 'full' },
  { path: 'template', component: Template03Component },
  { path: 'editor', component: EditorComponent},
  { path: '**', redirectTo: 'template' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
