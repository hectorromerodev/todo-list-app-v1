# 📝 Todo task list app ✅ 🚀 

### Just a to do task list app, to get your task done. 

## 🏁 With this app you will

1. Create many tasks you want. ✅
2. Update the tasks. ✅
3. Delete a task. ✅
4. Mark as donde the tasks. ✅
5. When you create the task, you may be able to prioritize the task with a selector. (Important, general or least), and the todo list will be sorted by priority. ✅

## 🎉 Offline features will be added
1. Progess bar or spinner to show the progress of the task. ✅

## 🚧 Online features coming soon
1. Login interface with firebase authentication, hosting and server.
2. Save the data through devices.
3. feedback of the app.


### 🏗 How I make this project 👷‍♂️
1. `ionic start` todo-list-app-v1 `--type=angular`
2. `ng g service` services/task
3. `ng g interface` interfaces/task
4. `ng g page` task
6. `ng g page` task/task-list
7. `ng g page` task/task-modal
8. `npm i @ionic/storage capacitor-data-storage-sqlite`
9. `ionic g service` services/storage
10. Import `import { HttpClientModule } from '@angular/common/http';` in appModule imports.
11. `ionic capacitor add android`
12. `ionic capacitor copy android`
13. `ionic capacitor run android -l`

#### Case of android studio error
1. If does not install the app on your device
  try adb uninstall io.ionic.starter, clean, rebuil, sync then run again
