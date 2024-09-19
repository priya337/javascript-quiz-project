class Quiz {
    // YOUR CODE HERE:
    
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit= timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

   getQuestion() {
    return this.questions[this.currentQuestionIndex]
   }
    
    moveToNextQuestion() {
        this.currentQuestionIndex += 1;
    }

    shuffleQuestions(){
        for(let i = this.questions.length-1; i>0; i--)
            {
              const j = Math.floor(Math.random() * (this.questions.length));
              this.questions[i] = this.questions[j];
            }
    }

    checkAnswer(answer) {
      if(this.questions[this.currentQuestionIndex].answer === answer) {
        this.correctAnswers += 1;
      }
    }

   hasEnded(){
    if(this.questions.length === this.currentQuestionIndex) {
        return true;
    } else return false
   }
}