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
        <span class="category ${this.bubbleColor} fw-bold">
          Question ${this.positionNumber}: ${this.category}
        </span>
        <span class="difficulty bg-info text-light">
          ${this.difficulty}
        </span>
      </div>
      <div class="border border-1 border-secondary rounded bg-dark p-3 mt-3">
        <p class="text-light fw-bold">${this.question}</p>
        <div class="d-flex flex-wrap gap-3">
          ${this.answerButtons}
        </div>
      </div>
    </div>
    `
  }

  get bubbleColor() {
    if (!this.answered) return 'bg-warning'

    return this.answeredCorrectly ? 'bg-success' : 'bg-danger'
  }

  buttonColor(answer) {
    if (!this.answered) return 'btn-outline-secondary'

    return answer == this.correctAnswer ? 'btn-success' : 'btn-danger'
  }

  get answerButtons() {
    let buttonHTML = ''
    this.answers.forEach(answer => {
      buttonHTML += `
      <button onclick="app.QuestionsController.answerQuestion('${this.id}', '${answer}')" class="btn ${this.buttonColor(answer)}" ${this.answered ? 'disabled' : ''}>
        ${answer}
      </button>`
    })
    return buttonHTML
  }
}
