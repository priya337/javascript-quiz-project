document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");
  const timeRemainingContainer = document.getElementById("timeRemaining");

  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3
    )
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/
  // Create a new Quiz instance object
  let quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);

  const restartButton = document.getElementById("restartButton");
  if (restartButton) {
    // Add event listener for the restart button
    restartButton.addEventListener('click', function() {
      console.log('Restart button clicked');
      restartQuiz();
    });
  } else {
    console.error('Restart button not found');
  }

  /************  FUNCTIONS  ************/
  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();

    questionContainer.innerText = question.text;

    const total = questions.length;
    const current = (questions.indexOf(question)) + 1;

    const percentage = (current / total) * 100;
    progressBar.style.width = `${percentage}%`;

    questionCount.innerText = `Question ${current} of ${questions.length}`;

    question.choices.forEach((choice) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "choice";
      radioInput.value = choice;

      const radioLabel = document.createElement("label");
      radioLabel.innerText = choice;

      choiceContainer.appendChild(radioInput);
      choiceContainer.appendChild(radioLabel);
      choiceContainer.appendChild(document.createElement('br'));
    });
  }

  function nextButtonHandler() {
    let selectedAnswer;

    const choiceElements = document.querySelectorAll("#choices input[type=radio]");
    choiceElements.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer !== undefined) {
      quiz.checkAnswer(selectedAnswer);
    }
    quiz.moveToNextQuestion();
    showQuestion();
  }

  function showResults() {
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.score} out of ${questions.length} correct answers!`;
  }

  function restartQuiz() {
    // Reset the quiz instance without redeclaring the 'quiz' variable
    quiz = new Quiz(questions, quizDuration, quizDuration); // Reset the quiz
    quiz.shuffleQuestions(); // Shuffle the questions again

    // Reset views
    quizView.style.display = "block";
    endView.style.display = "none";

    // Show the first question
    showQuestion();

    console.log('Quiz restarted');
  }
});
