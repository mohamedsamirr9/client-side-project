//question-page//

if (document.body.classList.contains("question-page")) {
  var questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
        "HyperText Markup Language",
        "Hyper Transfer Markup Language",
      ],
      answer: 2,
    },
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "JQuery", "CSS", "XML"],
      answer: 2,
    },
    {
      question: "Which is not a JavaScript Framework?",
      options: ["Python Script", "JQuery", "Django", "NodeJS"],
      answer: 2,
    },
    {
      question: "Which is used for connecting to databases?",
      options: ["HTML", "PHP", "JS", "All"],
      answer: 1,
    },
    {
      question: "Which HTML tag is used to display an image?",
      options: [
        "&lt;image&gt;",
        "&lt;img&gt;",
        "&lt;src&gt;",
        "&lt;picture&gt;",
      ],
      answer: 1,
    },
    {
      question: "Which HTML element is used for the largest heading?",
      options: ["&lt;h6&gt;", "&lt;head&gt;", "&lt;h1&gt;", "&lt;header&gt;"],
      answer: 2,
    },
    {
      question: "Inside which HTML element do we put JavaScript?",
      options: [
        "&lt;javascript&gt;",
        "&lt;js&gt;",
        "&lt;script&gt;",
        "&lt;scripting&gt;",
      ],
      answer: 2,
    },

    {
      question: "Which HTML attribute is used to define inline styles?",
      options: ["font", "styles", "style", "class"],
      answer: 2,
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      options: [
        "msgBox('Hello World');",
        "alertBox('Hello World');",
        "alert('Hello World');",
        "msg('Hello World');",
      ],
      answer: 2,
    },
    {
      question: "Which property is used to change text color in CSS?",
      options: ["text-color", "font-color", "color", "background-color"],
      answer: 2,
    },
  ];

  function mixQuestions(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  questions = mixQuestions(questions);
  var currentQuestion = 0;
  var userAnswers = new Array(questions.length).fill(null);
  var markedQuestions = [];

  var questionText = document.getElementById("question-text");
  var optionsContainer = document.getElementById("options");
  var questionNumber = document.getElementById("question-number");
  var markedList = document.getElementById("marked-list");
  var marks = 0;

  function loadQuestion(index) {
    var q = questions[index];
    questionNumber.textContent =
      "Question " + (index + 1) + " of " + questions.length;
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";

    for (var i = 0; i < q.options.length; i++) {
      var label = document.createElement("label");
      label.classList.add("option");
      label.innerHTML =
        '<input type="radio" name="q" ' +
        (userAnswers[index] === i ? "checked" : "") +
        "><span>" +
        q.options[i] +
        "</span>";

      label.addEventListener(
        "click",
        (function (choiceIndex) {
          return function () {
            userAnswers[index] = choiceIndex;
          };
        })(i)
      );
      optionsContainer.appendChild(label);
    }
  }
  loadQuestion(currentQuestion);

  document.getElementById("next-btn").addEventListener("click", function () {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion(currentQuestion);
    }
  });

  document.getElementById("prev-btn").addEventListener("click", function () {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion(currentQuestion);
    }
  });

  document.getElementById("mark-btn").addEventListener("click", function () {
    if (!markedQuestions.includes(currentQuestion)) {
      markedQuestions.push(currentQuestion);
      updateMarkedList();
    }
  });
  function endQuiz(timeout, page) {
    userAnswers.map((answer, i) => {
      if (questions[i].answer === answer) {
        marks += 10;
      }
    });
    clearInterval(timer);
    localStorage.setItem("marks", marks);
    localStorage.setItem("timeout", timeout);
    window.location.href = page;
  }
  document.getElementById("end-btn").addEventListener("click", () => {
    endQuiz(false, "grade.html");
  });

  function updateMarkedList() {
    markedList.innerHTML = "";
    for (var i = 0; i < markedQuestions.length; i++) {
      var btn = document.createElement("div");
      btn.textContent = "Q" + (markedQuestions[i] + 1);
      btn.classList.add("marked-item");
      btn.addEventListener(
        "click",
        (function (index) {
          return function () {
            currentQuestion = index;
            loadQuestion(currentQuestion);
          };
        })(markedQuestions[i])
      );
      markedList.appendChild(btn);
    }
  }

  var totalTime = 5;
  var timeDisplay = document.getElementById("time");
  var progressBar = document.querySelector(".progress");

  var timer = setInterval(function () {
    totalTime--;
    var minutes = Math.floor(totalTime / 60);
    var seconds = totalTime % 60;
    timeDisplay.textContent =
      minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    progressBar.style.width = (totalTime / (15 * 60)) * 100 + "%";

    if (totalTime <= 0) {
      endQuiz(true, "timeout.html");
    }
  }, 1000);
}

//grade-page//
if (document.body.classList.contains("grade-page")) {
  var grade = localStorage.getItem("marks");
  var timeout = localStorage.getItem("timeout");
  var gradeHeader = document.querySelector(".grade-header");
  var gradePara = document.querySelector(".para-1");
  var score = document.querySelector(".score");
  var circle = document.querySelector(".score-circle");
  var resultPara = document.querySelector(".result-para");
  var gradeImg = document.querySelector(".grade-img");
  var users = JSON.parse(localStorage.getItem("users"));
  var username = users[0].username.toUpperCase();

  if (+grade < 50) {
    gradeHeader.textContent = "“Oops!”";
    gradeHeader.style.color = "red";
    gradePara.textContent = `${username}, You completed the quiz, but your score was below the pass.`;
    resultPara.textContent = "You didn’t pass the quiz.";
    resultPara.style.color = "red";
    score.textContent = grade;
    gradeImg.src = "img/failed.png";

    circle.style.background = `conic-gradient(#00bcd4 0% ${grade}%, #e0e0e0 ${grade}% 100%)`;
  } else {
    gradeHeader.textContent = "Congratulations!";
    gradePara.textContent = `Well done, ${username}! You’ve completed the Client Side quiz.
Keep learning and exploring the front-end world! 💻`;
    resultPara.textContent = "You Passed The Quiz.";
    score.textContent = grade;
    gradeImg.src = "img/passed.png";
    circle.style.background = `conic-gradient(#00bcd4 0% ${grade}%, #e0e0e0 ${grade}% 100%)`;
  }
}
//timeout--page//
if (document.body.classList.contains("timeout-page")) {
  var grade = localStorage.getItem("marks");
  var timeout = localStorage.getItem("timeout");
  var score = document.querySelector(".score");
  var circle = document.querySelector(".score-circle");
  var resultPara = document.querySelector(".result-para");
  var users = JSON.parse(localStorage.getItem("users"));
  var username = users[0].username.toUpperCase();

  if (+grade < 50) {
    resultPara.textContent = `${username}, You didn’t pass the quiz.`;
    resultPara.style.color = "red";
    score.textContent = grade;
    circle.style.background = `conic-gradient(#00bcd4 0% ${grade}%, #e0e0e0 ${grade}% 100%)`;
  } else {
    resultPara.textContent = `${username}, You passed The quiz.`;
    score.textContent = grade;
    circle.style.background = `conic-gradient(#00bcd4 0% ${grade}%, #e0e0e0 ${grade}% 100%)`;
  }
}
