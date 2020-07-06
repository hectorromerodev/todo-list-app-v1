import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task';
import { StorageAPIWrapperService } from '../services/storage-api-wrapper.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  @Input() todoTask: Task;
  @Input() color;

  constructor() { }

  ngOnInit() {
  }

  createTask() {

  }

  updateTask() {

  }

  deleteTask() {

  }



}
