import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  recipes: any;
  length = 0;
  constructor(
    private storageService: StorageService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getFavorites();
  }

  getFavorites() {  
    this.recipes = this.storageService._storage.get("favorites");
    this.recipes.then(data => {
      this.length = data.length;
    });
    console.log(this.length);
  }

  removeFavorite(id:string) {
    this.recipes.then(f => {
      f.forEach(function(item, index, object) {
        if (item.idMeal == id) {
          object.splice(index, 1);
        }
      });
      this.storageService._storage.set("favorites", f);
    });
  }

  removeAll() {
    this.recipes = null;
    this.storageService._storage.remove("favorites");
  }

}
