import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  @Input() todoTask: Task;
  @Input() color;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  getAllTask() {
    this.taskService.getAll()
      .subscribe(all => {
        console.log(all);
      });
  }

  getOneTask(id: number) {
    this.taskService.getOne(id)
      .subscribe(one => {
        console.log(one);
      });
  }

  createTask() {

  }

  updateTask() {

  }

  deleteTask() {

  }



}
