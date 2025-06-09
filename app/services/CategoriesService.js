import { AppState } from "../AppState.js";
import { Category } from "../models/Category.js";
import { triviaAPI } from "./AxiosService.js";


class CategoriesService {
  setActiveCategory(categoryId) {
  const foundCategory = AppState.categories.find(category => category.id == categoryId);
  AppState.activeCategory = foundCategory;
  AppState.emit('categories');
  }

  async getCategories() {
    const res = await triviaAPI.get('api_category.php')
    console.log('got cats', res.data);
    const categories = res.data.trivia_categories.map(categoryPOJO => new Category(categoryPOJO));
    categories.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    AppState.categories = categories;
  }
}

export const categoriesService = new CategoriesService();