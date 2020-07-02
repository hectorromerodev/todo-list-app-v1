import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskService } from '../services/task.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TaskModalPage } from '../task/task-modal/task-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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
  constructor(
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.get();
  }
  async get() {
    await this.taskService.getAll()
      .subscribe(all => {
        this.importantTask = all.slice(0, 10);
      });
  }

  async deleteAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Delete this task?',
      message: 'Are you sure to do this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('confirm Cancel');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: TaskModalPage,
      keyboardClose: true,

    });

    return await modal.present();
  }
}
