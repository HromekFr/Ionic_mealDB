import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public _storage: Storage;
  constructor(private storage: Storage) {
    this.initStorage()
  }

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
    
}
