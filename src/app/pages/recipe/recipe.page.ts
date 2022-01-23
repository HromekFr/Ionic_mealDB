import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  recipes: Observable<Recipe[]>;
  searchString = '';
  constructor(
    private recipeService: RecipeService
  ) { }

  async ngOnInit() {
   
  }

  searchRecipe() {
    this.recipes = this.recipeService.searchRecipes(this.searchString);
    
  }

}
