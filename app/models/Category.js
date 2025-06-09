import { AppState } from "../AppState.js";


export class Category {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;

  }

  get buttonHTMLTemplate() {
    return `
      <button onclick="app.CategoriesController.setActiveCategory(${this.id})" class="btn btn-secondary fw-bold" type="button"> Mythology </button>
    `
  }

  get buttonColor() {
    if (this.id == AppState.activeCategory?.id) {
      return 'btn-success';
    }
    return 'btn-secondary';
  }
}