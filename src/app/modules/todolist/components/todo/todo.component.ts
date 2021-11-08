import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent  {
  constructor() { }

  @Input() toDo: Task;

  @Output() completeChange = new EventEmitter<MatCheckboxChange>();

  @Output() deleteTask = new EventEmitter<Task>();
}
