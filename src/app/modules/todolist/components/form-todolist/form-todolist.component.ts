import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Task } from '../../model/task.model';
import { debounceTime, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-form-todolist',
  templateUrl: './form-todolist.component.html',
  styleUrls: ['./form-todolist.component.css']
})
export class FormTodolistComponent implements OnDestroy, OnInit {

  @Output() toDoChange = new EventEmitter<Partial<Task>>();
  @Output() forValidation = new EventEmitter<any>();

  formTask = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder) { }

  private unsubscribe = new Subject<void>();

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {

    this.createForm(new Task());

    this.formTask.valueChanges
      .pipe(debounceTime(200), takeUntil(this.unsubscribe))
      .subscribe(value => this.eventsEmit(value));

  }

  eventsEmit(e: any) {
    this.toDoChange.emit({
      descricao: e.descricao,
      titulo: e.titulo
    });

    this.forValidation.emit({
      validation: this.formTask.valid
    })

  }

  createForm(task: Task) {
    this.formTask = this.formBuilder.group({
      titulo: [task.titulo, Validators.required],
      descricao: [task.descricao, Validators.required]
    })
  }
}
