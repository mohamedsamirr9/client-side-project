const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

loginBtn.addEventListener("click", () => {
  loginBtn.style.backgroundColor = "#855706";
  registerBtn.style.backgroundColor = "rgba(255,255,255,0.2)";
  loginForm.style.left = "50%";
  registerForm.style.left = "-50%";
  loginForm.style.opacity = 1;
  registerForm.style.opacity = 0;
});

registerBtn.addEventListener("click", () => {
  registerBtn.style.backgroundColor = "#855706";
  loginBtn.style.backgroundColor = "rgba(255,255,255,0.2)";
  loginForm.style.left = "150%";
  registerForm.style.left = "50%";
  loginForm.style.opacity = 0;
  registerForm.style.opacity = 1;
});

// === Validation + Local Storage ===

const registerEmail = document.querySelector(
  '.register-form input[placeholder="Email"]'
);
const registerUsername = document.querySelector(
  '.register-form input[placeholder="User Name"]'
);
const registerPassword = document.querySelector(
  '.register-form input[placeholder="Password"]'
);
const registerSubmit = document.querySelector(".register-form .submit-btn");
const createsucess = document.querySelector(".create-sucess");

// login inputs
const loginUsername = document.querySelector(
  '.login-form input[placeholder="User Name"]'
);
const loginPassword = document.querySelector(
  '.login-form input[placeholder="Password"]'
);
const loginSubmit = document.querySelector(".login-form .submit-btn");
const error = document.querySelector(".error");

// save users ion local storge
function saveUser(user) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
// validation
registerSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  createsucess.style.display = "block";
  const email = registerEmail.value.trim();
  const username = registerUsername.value.trim();
  const password = registerPassword.value.trim();

  if (!email || !username || !password) {
    alert("Please Put Full Fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((u) => u.username === username)) {
    alert("Username already exists");
    return;
  }

  saveUser({ email, username, password });

  registerEmail.value = "";
  registerUsername.value = "";
  registerPassword.value = "";
});

// login
loginSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let validUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (validUser) {
    localStorage.setItem("currentUser", JSON.stringify(validUser));
    var ref = (window.location.href = "./question.html");
  } else {
    error.style.display = "block";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
});
