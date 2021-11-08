import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './modules/todolist/todolist.component';


const routes: Routes = [

  { path: 'home', component: TodolistComponent},


  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**',redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
