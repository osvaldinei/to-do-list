import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { API_CONFIG } from 'src/app/config/api.config';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Task[]>{
    return this.http.get<Task[]>(`${API_CONFIG.baseUrl}/tarefas`).pipe(
      timeout(1000)
    );
  }

  public createTask(obj: Task){
    return this.http.post(`${API_CONFIG.baseUrl}/tarefas`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    ).pipe(
      timeout(1000)
    );
  }

  public changeTask(obj: Task){
    return this.http.put(`${API_CONFIG.baseUrl}/tarefas/${obj.id}`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    ).pipe(
      timeout(1000)
    );;
  }

  public deleteTask(obj: Task){
    return this.http.delete(`${API_CONFIG.baseUrl}/tarefas/${obj.id}`
    ).pipe(
      timeout(1000)
    );
  }
}
