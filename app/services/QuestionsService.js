import { AppState } from "../AppState.js";
import { Question } from "../models/Question.js";
import { triviaAPI } from "./AxiosService.js";


class QuestionsService {
  async answerQuestion(questionId, userAnswer) {
    const question = AppState.questions.find(qeustion => question.id == questionId)

    question.answered = true;
    question.answeredCorrectly = question.correctAnswer == userAnswer;

    AppState.emit('questions');

  }

  async getQuestions() {
    const res = await triviaAPI.get('api.php?amount=10');
    console.log('Got Qs', res.data);
    AppState.questions = res.data.results.map(questionPOJO => new Question(questionPOJO));
  }

  async getQuestionsByCategoryId() {
    const category = AppState.activeCategory;
    const res = await triviaAPI.get(`api.php?amount=10&category=${category.id}`);
    console.log('got Qs', res.data);
    AppState.questions = res.data.results.map(questionPOJO => new Question(questionPOJO));
  }
}

export const questionsService = new QuestionsService();