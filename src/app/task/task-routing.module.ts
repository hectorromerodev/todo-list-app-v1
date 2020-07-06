import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskPage } from './task.page';

const routes: Routes = [
  {
    path: '',
    component: TaskPage
  },
  {
    path: 'task-list/:id',
    loadChildren: () => import('./task-list/task-list.module').then(m => m.TaskListPageModule)
  },
  {
    path: 'task-modal',
    loadChildren: () => import('./task-modal/task-modal.module').then(m => m.TaskModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskPageRoutingModule { }
