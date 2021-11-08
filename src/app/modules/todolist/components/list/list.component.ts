import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor() { }

  @Input() toDos: Task[];

  @Output() toDoChange = new EventEmitter<Task>();

  @Output() toDeleteTask = new EventEmitter<Task>();

  onCompleteChange(toDo: Task, change: MatCheckboxChange) {
    this.toDoChange.emit({
      ...toDo,
      concluido: change.checked
    });
  }

  onDeleteTask(toDo: Task) {
    this.toDeleteTask.emit({
      ...toDo,
    });
  }
}
