import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';


// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      maxPercent: 100,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      outerStrokeGradientStopColor: '#53a9ff',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      title: 'UI',
      animateTitle: false,
      animationDuration: 4000,
      showUnits: false,
      showBackground: false,
      clockwise: false
    })
  ],
  exports: [
    TaskPage // Export task page to use <app-task> in home
  ],
  declarations: [TaskPage]
})
export class TaskPageModule { }
