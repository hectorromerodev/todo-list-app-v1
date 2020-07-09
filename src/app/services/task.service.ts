import { Injectable } from '@angular/core';
// We need to import HttpClient and Task interface
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly api = '';
  readonly endpoint = '';
  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    const path = `${this.api}/${this.endpoint}`;
    return this.http.get<Task[]>(path);
  }

  getOne(id: string | number) {
    const path = `${this.api}/${this.endpoint}/${id}`;
    return this.http.get<Task>(path);
  }

  create(body: Task) {
    const path = `${this.api}/${this.endpoint}`;
    return this.http.post(path, body);
  }

  update(body: Task, id: string | number) {
    const path = `${this.api}/${this.endpoint}/${id}`;
    return this.http.put(path, body);
  }

  delete(id: string | number) {

  }
}
