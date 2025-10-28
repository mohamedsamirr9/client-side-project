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

  var currentQuestion = 0;
  var userAnswers = new Array(questions.length).fill(null);
  var markedQuestions = [];

  var questionText = document.getElementById("question-text");
  var optionsContainer = document.getElementById("options");
  var questionNumber = document.getElementById("question-number");
  var markedList = document.getElementById("marked-list");

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

  var totalTime = 15 * 60;
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
      clearInterval(timer);
    }
  }, 1000);
}

//home-page//
