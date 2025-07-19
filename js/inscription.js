document.addEventListener("DOMContentLoaded", () =>{ 
    const form = document.getElementById("registerForm");
    const message = document.getElementById("message");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = users.some(user => user.email === email);
        if(emailExists) {
            message.textContent = "Email deja Utilisé";
            return;
        }

        users.push({ username, email, password});
        localStorage.setItem("users", JSON.stringify(users)); 

        message.style.color = "green";
        message.textContent = "Inscription reussie ! Redirection...";

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2000);
    });
} );
