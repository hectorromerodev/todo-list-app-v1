import { Plugins } from '@capacitor/core';
import * as CapacitorSQLPlugin from 'capacitor-data-storage-sqlite';
const { CapacitorDataStorageSqlite, Device } = Plugins;
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageAPIWrapperService {
  public storage: any = {};

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor() {
  }
  async init(): Promise<void> {
    const info = await Device.getInfo();
    console.log('platform ', info.platform);
    if (info.platform === 'ios' || info.platform === 'android') {
      this.storage = CapacitorDataStorageSqlite;
    } else {
      this.storage = CapacitorSQLPlugin.CapacitorDataStorageSqlite;
    }
  }
  public async openStore(options: any): Promise<boolean> {
    await this.init();
    const { result } = await this.storage.openStore(options);
    return result;
  }
  public async setTable(table: any): Promise<any> {
    const { result, message } = await this.storage.setTable(table);
    return Promise.resolve([result, message]);
  }
  public async setItem(key: string, value: string): Promise<void> {
    await this.storage.set({ key, value });
    this._refreshNeeded$.next();
    return;
  }
  public async getAllItems(): Promise<any[]> {
    const { keys } = await this.storage.keys();
    const data = [];
    for (const key of keys) {
      const { value } = await this.storage.get({ key });
      // Check if the storage exist that key, if not return []
      if (!value) {
        return [];
      } else {
        data.push(JSON.parse(value));
      }
    }
    return data;
  }
  public async getItem(key: string): Promise<string> {
    const { value } = await this.storage.get({ key });
    if (!value) {
      return;
    } else {
      return value;
    }
  }
  public async getAllKeys(): Promise<Array<string>> {
    const { keys } = await this.storage.keys();
    if (!keys) {
      return;
    } else {
      return keys;
    }
  }

  public async updateItem(item: any, changes: any, id?: string | number,) {
    // 🏗 We need to add the logic🚧
    // this.todoList[index] = { ...item, ...changes }; // I can use this
  }

  public async removeItem(key: string): Promise<void> {
    await this.storage.remove({ key });
    this._refreshNeeded$.next();
    return;
  }
  public async clear(): Promise<void> {
    await this.storage.clear();
    this._refreshNeeded$.next();
    return;
  }
  public async deleteStore(options: any): Promise<boolean> {
    await this.init();
    const { result } = await this.storage.deleteStore(options);
    return result;
  }
}
