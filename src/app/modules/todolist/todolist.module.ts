import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from './todolist.component';
import { FormTodolistComponent } from './components/form-todolist/form-todolist.component';
import { MatCardModule } from '@angular/material/card';

import { ListComponent } from './components/list/list.component';
import { TodoService } from './services/todo.service';
import { MatButtonModule, MatCheckbox, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatTreeModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { TodoComponent } from './components/todo/todo.component';
import { ListCompleteComponent } from './components/list-complete/list-complete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatTreeModule,

    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [

  ],
  declarations: [
    TodolistComponent,
    FormTodolistComponent,
    ListComponent,
    ListCompleteComponent,
    TodoComponent
  ],
  providers:[
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    TodoService
  ]
})
export class TodolistModule { }
