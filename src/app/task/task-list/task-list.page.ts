import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { StorageAPIWrapperService } from 'src/app/services/storage-api-wrapper.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  color: string;
  id: string | number;
  task: Task = {} as Task;
  item;

  constructor(
    private storage: StorageAPIWrapperService
  ) { }


  async ngOnInit() {
    this.storage.refreshNeeded$
      .subscribe(() => {
        this.getTask();
      });
    this.id = location.href.split('/')[5];
    await this.getTask();
    await this.changeColor();
  }


  async getTask() {
    // Firs create or open the database and table to work with
    const open: boolean = await this.storage.openStore({
      database: 'TaskDB', table: 'tasks'
    });
    // Verifi conection
    if (open) {
      // Get data
      const data = await this.storage.getItem(this.id.toString());
      this.task = JSON.parse(data);
    } else {
      return [];
    }
  }

  changeColor() {
    // Change color items depending of the relevance
    switch (this.task.priority) {
      case 'important':
        this.color = 'danger';
        break;
      case 'general':
        this.color = 'warning';
        break;
      case 'least':
        this.color = 'tertiary';
        break;
    }
  }

}
