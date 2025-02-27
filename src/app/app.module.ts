import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/template-list/category/category.component';
import { TemplateListComponent } from './components/template-list/template-list/template-list.component';
import { EditorComponent } from './components/editor/editor.component';
import { AppRoutingModule } from './app.routes';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppComponent,
    TemplateListComponent,
    CategoryComponent,
    EditorComponent,
    AppRoutingModule
  ]
})
export class AppModule { }
