import { Component } from '@angular/core';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  importantTask: Task[] = [
    { title: 'Love my girl', priority: 'important', progress: 0.99 },
    { title: 'Develop a todo app', priority: 'important', progress: 0.25 },
    { title: 'Read a book', priority: 'least', progress: 0.89 },
  ];
  generalTask: Task[] = [
    { title: 'Wash the dishes', priority: 'general', progress: 0.20 },
  ];
  leastTask: Task[] = [
    { title: 'Eat an apple', priority: 'least', progress: 0.5 },
    { title: 'Learn Arduino', priority: 'least', progress: 0.0 },
  ];

  priority = ['Important', 'General', 'Least'];
  title = ['Amar a Michelle', 'Work with TODO app', 'Do homework'];
  constructor() { }

}
