import { AppState } from "../AppState.js";
import { generateId } from "../utils/GenerateId.js";
import { Category } from "./Category.js";


export class Question {
  constructor(data) {
    this.id = generateId();
    this.type = data.type;
    this.difficulty = data.difficulty;
    this.category = data.category;
    this.question = data.question;
    this.answered = false;
    this.answeredCorrectly = false;
    this.correctAnswer = data.correct_answer;
    this.answers = this.type == 'boolean' ? ['True', 'False'] : [this.correctAnswer, ...data.incorrect_answers,];
    if (this.type == 'multiple') {
      this.correctAnswer = this.correctAnswer.replaceAll("'", "\'");
      this.answers = this.answers.map(answer => answer.replaceAll("'", "\'"));
      this.answers.sort(() => Math.random() - .5);
    }
  }

  get positionNumber() {
    return AppState.questions.findIndex(question => question.id === this.id) +1;
  }

  get cardHTMLTemplate() {
    return `
      <div class="col-md-6 mb-3">
        <div>
          <span class="category bg-warning fw-bold"> Question 1: Television </span>
          <span class="difficulty bg-info text-light"> hard </span>
        </div>
        <div class="border border-1 border-secondary rounded bg-dark p-3 mt-3">
          <p class="text-light fw-bold">${this.question}</p>
          <div class="d-flex flex-wrap gap-3">
            <button onlick="app.QuestionsController.answerQuestion('${this.id}')" class="btn btn-outline-secondary"> ${this.answers} </button>
            <button onlick="app.QuestionsController.answerQuestion('${this.id}')" class="btn btn-outline-secondary"> ${this.answers} </button>
            <button onlick="app.QuestionsController.answerQuestion('${this.id}')" class="btn btn-outline-secondary"> ${this.answers} </button>
            <button onlick="app.QuestionsController.answerQuestion('${this.id}')" class="btn btn-outline-secondary"> ${this.answers} </button>
          </div>
        </div>
      </div>
    `
  }
}