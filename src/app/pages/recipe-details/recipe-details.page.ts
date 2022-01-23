import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  recipe: any;
  id: string;
  list = [];
  ingredients:any = {};


  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    public alertController: AlertController,
    public storageService: StorageService
  ) { 
    this.id = this.route.snapshot.paramMap.get("id");
    this.recipe = this.recipeService.getRecipe(this.id);
    
  }

  public addFavorite() {
    var inFavorites = false;
    this.recipe.subscribe(rec => {
      this.storageService._storage.get("favorites").then(f => {
        if(f == null) {
          console.log("Favorites empty");
          this.list.push(rec[0]);
          this.storageService._storage.set("favorites", this.list);
          this.addedAlert();
        }
        else {
          console.log("Favorites not empty");
          console.log(f);
          f.forEach(element => {
            if(element.idMeal == rec[0].idMeal) {
              console.log("Already in favorites");
              inFavorites = true;
            }
          });

          if(inFavorites) {
            this.alertController.create({
              header: 'Recipe is already in favorites',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel'
                }
              ]
            }).then(alert => alert.present());
          }
          else {
            console.log("Pushed to favorites");
            f.push(rec[0]);
            this.storageService._storage.set("favorites", f);

            this.addedAlert();
          }
        }
      });
    })
  }
  
  
  public addedAlert() {
    this.alertController.create({
      header: 'Recipe added to favourites',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    }).then(alert => alert.present());
  }

  ngOnInit() {
  }

  

  
}

// const recipes = this.storageService._storage.get("favorites");
//       if(recipes == null) {
//         this.list.push(rec[0]);
//         this.storageService._storage.set("favorites", JSON.stringify(this.list));

//         this.alertController.create({
//           header: 'Added to favorites',
//           buttons: [
//             {
//               text: 'ADD',
//               role: 'cancel'
//             }
//           ]
//         }).then(alert => alert.present());
//       }
//       else {
//         recipes.then(r => console.log(r));
//       } 