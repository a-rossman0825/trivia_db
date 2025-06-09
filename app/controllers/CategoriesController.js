import { AppState } from "../AppState.js";
import { Category } from "../models/Category.js";
import { categoriesService } from "../services/CategoriesService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


export class CategoriesController {
  constructor() {
    AppState.on('categories', this.drawCategories);
    this.getCategories();
  }

  async getCategories() {
    try {
      await categoriesService.getCategories();
    } catch (error) {
      Pop.error(error);
      console.error(error);
    }
  }

  setActiveCategory(categoryId) {
    categoriesService.setActiveCategory(categoryId);
  }

  drawCategories() {
    const categories = AppState.categories;
    let htmlContent = '';
    categories.forEach(category => htmlContent += category.buttonHTMLTemplate);
    setHTML('categories', htmlContent);
  }
}