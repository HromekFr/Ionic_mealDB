import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
  searchUrl = 'search.php?s=';
  detailUrl = 'lookup.php?i=';
  constructor(
    private http: HttpClient
  ) { }

  searchRecipes(name: string): Observable<Recipe[]> {
    const searchRecipe = `${this.apiUrl}${this.searchUrl}${encodeURI(name)}`;
    return this.http.get(searchRecipe).pipe(map(recipes => recipes['meals']));
  }

  getRecipe(id: string) {
    const getRecipe = `${this.apiUrl}${this.detailUrl}${id}`;
    const recipe =  this.http.get(getRecipe).pipe(map(recipes => recipes['meals']));;
    return recipe;
  }


}
