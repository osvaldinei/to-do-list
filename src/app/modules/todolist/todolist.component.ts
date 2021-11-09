import { Component, OnInit } from '@angular/core';
import { text } from '@angular/core/src/render3/instructions';
import { NgxSpinnerService } from 'ngx-spinner';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Task } from './model/task.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  breakpoint: Number;
  tasks: Task[];
  private _task: Partial<Task>;

  completeToDos: Task[] = [];
  incompleteToDos: Task[] = [];

  constructor(
    private todoService: TodoService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 3;

    this.spinner.show();
    this.todoService.findAll().subscribe(response => {
      this.tasks = response;
      this.completeToDos = this.findCompleteToDo(this.tasks);
      this.incompleteToDos = this.findInCompleteToDo(this.tasks),
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }, error => {
      this.spinner.hide();
      this.messageError('Ocorreu um erro ao tentar carregar as informações. Caso o erro persista, contate o administrador!');
      console.log(error);
    })

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 3;
  }

  findCompleteToDo(list: Task[]) : Task[]{
    return list.filter(
      t => t.concluido
    );
  }

  findInCompleteToDo(list: Task[]) : Task[]{
    return list.filter(
      t => !t.concluido
    );
  }

  onAddToDoChange(t: Partial<Task>) {
    this._task = t;
  }

  createTodo() {
    this.spinner.show();
    const t: Task = {
        id: null,
        titulo: this._task.titulo,
        descricao: this._task.descricao,
        concluido: false
      }

      this.todoService.createTask(t).subscribe(response => {
        console.log(response);
        this.reloadPage();
      }, error => {
         this.spinner.hide();
         this.messageError('Ocorreu um erro ao tentar salvar. Caso o erro persista, contate o administrador!');
        console.log(error);
      });
  }

  onCompleteToDo(t: Task) {
    this.spinner.show();
    t.concluido = true;
    this.todoService.changeTask(t).subscribe(response => {
      this.reloadPage();
    }, error => {
      this.spinner.hide();
      this.messageError('Ocorreu um erro ao tentar salvar. Caso o erro persista, contate o administrador!');
      console.log(error);
    });
  }

  onIncompleteToDo(t: Task) {
    this.spinner.show();
    t.concluido = false;
    this.todoService.changeTask(t).subscribe(response => {
      this.reloadPage();
    }, error => {
     this.spinner.hide();
     this.messageError('Ocorreu um erro ao tentar salvar. Caso o erro persista, contate o administrador!');
      console.log(error);
    });
  }

  onDeleteTask(t: Task){
    this.spinner.show();
    this.todoService.deleteTask(t).subscribe(response => {
      this.messageSucess('Tarefa Removida Com Sucesso!')
    }, error => {
     this.spinner.hide();
     this.messageError('Ocorreu um erro ao tentar deletar. Caso o erro persista, contate o administrador!');
      console.log(error);
    });
  }

  messageError(message: any){
    Swal({
      title: 'Oops...',
      text: message,
      type: 'error',
    });
  }

  messageSucess(message: any){
    Swal({
      title: 'Sucesso',
      text: message,
      type: 'success',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {

        this.reloadPage()
      }
    });;
  }

  reloadPage() {
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }


}
