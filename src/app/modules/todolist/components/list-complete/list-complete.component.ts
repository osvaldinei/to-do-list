import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-list-complete',
  templateUrl: './list-complete.component.html',
  styleUrls: ['./list-complete.component.css']
})
export class ListCompleteComponent {

  constructor() { }

  @Input() toDos: Task[];

  @Output() toDoChange = new EventEmitter<Task>();

  onCompleteChange(toDo: Task, change: MatCheckboxChange) {
    this.toDoChange.emit({
      ...toDo,
      concluido: change.checked
    });
  }

}
