import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


export class QuestionsController {
  constructor() {
    
  }

  async getQuestions() {
    try {
      await questionsService.getQuestions();
    } catch (error) {
      Pop.error(error);
      console.error(error);
    }
  }

  async getQuestionsByCategoryId() {
    try {
      await questionsService.getQuestionsByCategoryId();
    } catch (error) {
      Pop.error(error);
      console.error(error);
      
    }
  }

  drawQuestions() {
    const questions = AppState.questions;
    let htmlContent = '';
    questions.forEach((question) => htmlContent += question.cardHTMLTemplate)
    setHTML('questions', htmlContent);
    const questionsElm = document.getElementById('questions');
    questionsElm.innerHTML = htmlContent;
  }

}