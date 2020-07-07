import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TaskPage } from '../task/task.page';
import { TaskPageModule } from '../task/task.module';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TaskPageModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      backgroundPadding: 7,
      radius: 60,
      space: -2,
      outerStrokeWidth: 2,
      outerStrokeColor: '#808080',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 2,
      title: [
        'working',
        'in',
        'progress'
      ],
      animateTitle: false,
      animationDuration: 1000,
      showUnits: false,
      clockwise: false
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
