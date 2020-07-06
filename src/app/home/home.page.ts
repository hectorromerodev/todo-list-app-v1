import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskService } from '../services/task.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TaskModalPage } from '../task/task-modal/task-modal.page';
import { StorageAPIWrapperService } from '../services/storage-api-wrapper.service';
import { BehaviorSubject, Observable, pipe, combineLatest, of, concat, Subject } from 'rxjs';
import { startWith, scan, map } from 'rxjs/Operators';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  allTask: Task[] = [{} as Task];

  priority = ['Important', 'General', 'Least'];
  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private storage: StorageAPIWrapperService
  ) { }

  ngOnInit() {
    this.storage.refreshNeeded$
      .subscribe(() => {
        this.getTasks();
      });
    this.getTasks();

  }

  async getTasks() {
    // 1️⃣ create or open a database and table
    const result: boolean = await this.storage
      .openStore({ database: 'TaskDB', table: 'tasks' });
    // 2️⃣ Verify conection If true we can use sqlite db
    if (result) {
      // 3️⃣ get data and order the data
      this.allTask = (await this.storage.getAllItems())
        .sort((a, b) => // Order the data to be 'important' first then order alphabeticaly
          ('important' === b.priority ? // If important order first
            1 : 'important' === a.priority ?
              -1 : 'general' === b.priority ? // Then If general order before
                1 : -1)); // Then the least values
    } else {
      return [];
    }
  }

  async deleteAlert(id) {
    const alert = await this.alertCtrl.create({
      header: 'Delete this task?',
      message: 'Are you sure to do this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            await this.storage.removeItem(id.toString());
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