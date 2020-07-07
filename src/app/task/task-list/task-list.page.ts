import { Component, OnInit, Input, DoCheck, AfterContentChecked } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { StorageAPIWrapperService } from 'src/app/services/storage-api-wrapper.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, ViewDidEnter } from '@ionic/angular';
import { TaskList } from 'src/app/interfaces/task-list';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit, ViewDidEnter {
  editInput = false;
  titleInput = null;
  colorItem: string;
  id: string | number;
  task: Task = {} as Task;
  @Input() taskList: TaskList[] = [{} as TaskList];
  itemInput = null;

  constructor(
    private storage: StorageAPIWrapperService,
    private toastCtrl: ToastController
  ) {
  }
  async ionViewDidEnter() {
    console.log('did enter')
    this.id = location.href.split('/')[5];

    await this.getTask();
    this.changeColor();
    this.taskList = this.task.taskItems;

  }

  async ngOnInit() {
    this.storage.refreshNeeded$
      .subscribe(() => {
        this.getTask().finally(() => {
          this.taskList = this.task.taskItems;
        });
      });
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

  async addItem() {
    this.changeColor();
    // Convert to an array
    const todo = {
      name: this.itemInput,
      completed: false
    };
    // Validate if the addTask input isnt null
    if (this.itemInput !== null) {
      await this.task.taskItems.push(todo); // Push new items
      this.task.progress = await this.checkProgress(); // Change progress value

      await this.storage.setItem(this.id.toString(), JSON.stringify(this.task));
      this.itemInput = null; // Clean the  task add input
    }
  }

  changeColor() {
    // Change color items depending of the relevance
    switch (this.task.priority) {
      case 'important':
        this.colorItem = 'danger';
        break;
      case 'general':
        this.colorItem = 'warning';
        break;
      case 'least':
        this.colorItem = 'tertiary';
        break;
    }
  }

  async editAndSave() {
    if (this.editInput) {
      // Verify if not null
      if (this.task.title !== null) {
        // Store the data on storage
        this.task.progress = await this.checkProgress(); // Update the current progress
        await this.storage.setItem(this.id.toString(), JSON.stringify(this.task));
      }
      this.editInput = false;
    } else {
      this.editInput = true;
    }
  }

  async deleteItem(id) {
    await this.task.taskItems.splice(id, 1);
  }
  async checkItem(index: number, checkVal: any) {
    if (index >= 0 && (checkVal || !checkVal)) {
      console.log(index, checkVal)
      // Assign check value
      this.task.taskItems[index].completed = !checkVal;
      this.task.progress = await this.checkProgress(); // Update the current progress
    }
    await this.storage.setItem(this.id.toString(), JSON.stringify(this.task));

  }

  async checkProgress() {
    let completed = 0;
    const taskItems = this.task.taskItems.length;
    for (const items of this.task.taskItems) {
      if (items.completed) {
        completed++;
      }
    }
    return (completed / taskItems) * 100;
  }

  // Helper
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: '🚧 Not ready to use this funtion yet. 👷‍♂️',
      duration: 2000,
    });
    await toast.present();
  }

}
