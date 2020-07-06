import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { TaskList } from 'src/app/interfaces/task-list';
import { Task } from 'src/app/interfaces/task';
import { StorageAPIWrapperService } from 'src/app/services/storage-api-wrapper.service';


@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.page.html',
  styleUrls: ['./task-modal.page.scss'],
})
export class TaskModalPage implements OnInit {
  newTask: Task = null;
  @Output() save: EventEmitter<Task> = new EventEmitter();

  @Input() title: string;
  @Input() relevance = 'least';
  @Input() itemArray: TaskList[] = [];

  @Input() item: string = null;
  @Input() itemColor;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private storage: StorageAPIWrapperService

  ) { }

  ngOnInit() {
  }

  async onSave() {
    // First We need to validate if the data is valid 🚧👷‍♂️

    // Create the loading controller
    await this.loadingCtrl.create({
      message: 'Saving task...',
      duration: 1000 // This time its just for visual <We can remove 🔥 it>
    }).then(async loadingEl => {
      await loadingEl.present();
      const id = Date.now();

      this.newTask = {
        id,
        title: this.title,
        priority: this.relevance,
        progress: 0,
        taskItems: this.itemArray
      };
      await this.save.emit(this.newTask);
      await this.saveToStorage(id, this.newTask);
      this.modalCtrl.dismiss();
      // Here i need to save the information 🚧👷‍♂️
    });

    console.log('saved');
  }

  changeColor() {
    // Change color items depending of the relevance
    switch (this.relevance) {
      case 'important':
        this.itemColor = 'danger';
        break;
      case 'general':
        this.itemColor = 'warning';
        break;
      case 'least':
        this.itemColor = 'tertiary';
        break;
    }
  }

  async addItem() {
    this.changeColor();
    // Convert to an array
    const todo = {
      name: this.item,
      completed: false
    };
    // Validate if the addTask input isnt null
    if (this.item !== null) {
      await this.itemArray.push(todo); // Push new items
      this.item = null; // Clean the  task add input
    }
  }

  dismiss() {
    this.modalCtrl.dismiss(); // Dismiss the modal
  }

  async deleteItem(element: any) {
    // Delete the array element
    await this.itemArray.splice(element, 1);
  }

  async saveToStorage(id: number, data: Task) {
    // Conect to a database table
    let result: boolean = await this.storage.openStore({});

    // Verify conection If true we can use sqlite db
    if (result) {
      // 1️⃣ create or open a database and table
      result = await this.storage.openStore({ database: 'TaskDB', table: 'tasks' });
      // 2️⃣ Save the item on the storage opened
      await this.storage.setItem(JSON.stringify(id), JSON.stringify(data));
    }
  }
}
