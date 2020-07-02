import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { TaskList } from 'src/app/interfaces/task-list';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.page.html',
  styleUrls: ['./task-modal.page.scss'],
})
export class TaskModalPage implements OnInit {

  @Input() relevance = 'least';
  @Input() task: string = null;
  @Input() taskArray: TaskList[] = [];
  @Input() itemColor;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,

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
      // Here i need to save the information 🚧👷‍♂️

    });

    console.log('saved');
  }

  async changeColor() {
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

  async addTask() {
    this.changeColor();
    // Convert to an array
    const todo: TaskList = {
      name: this.task,
      completed: false
    };
    await this.taskArray.push(todo); // Push new items
    this.task = null; // Clean the  task add input
  }

  dismiss() {
    this.modalCtrl.dismiss(); // Dismiss the modal
  }

  async deleteItem(element: number) {
    // Delete the array element
    await this.taskArray.splice(element, 1);
  }

}
