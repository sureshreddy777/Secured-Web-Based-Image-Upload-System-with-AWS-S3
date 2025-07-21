document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // 🔐 Multiple users and their passwords
  const validUsers = {
    "jnanadeep": "Jnana@123",
    "suresh": "Sureshmd515",
    "aditya": "Aditya@1710",
    "tarun": "Tarun@1234"
  };

  // 🧠 Check credentials
  if (validUsers[username] && validUsers[username] === password) {
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("username", username);
    window.location.href = "upload.html";
  } else {
    document.getElementById('login-status').textContent = "Invalid credentials";
  }
});
