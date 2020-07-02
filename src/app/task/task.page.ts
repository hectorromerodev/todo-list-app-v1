import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  @Input() color;
  @Input() progress = 0.0;
  @Input() title;

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
