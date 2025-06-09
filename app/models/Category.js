import { AppState } from "../AppState.js"

export class Category {
  constructor(data) {
    this.id = data.id
    this.name = Category.sanitizeCategoryName(data.name)
  }

  get buttonColor() {
    if (this.id == AppState.activeCategory?.id) {
      return 'btn-success'
    }
    return 'btn-secondary'
  }

  get buttonHTMLTemplate() {
    return `
    <button onclick="app.CategoriesController.setActiveCategory(${this.id})" class="btn ${this.buttonColor} fw-bold" type="button">
      ${this.name}
    </button>`
  }

  static sanitizeCategoryName(categoryName) {
    const badWords = ['Entertainment: ', 'Science: ']
    badWords.forEach(badWord => categoryName = categoryName.replace(badWord, ''))
    return categoryName
  }
}

let data = {
  "id": 9,
  "name": "General Knowledge"
}