document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");

    if(loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            const users = JSON.parse(localStorage.getItem("users")) || [];

            const user = users.find( user => user.email === email && user.password === password);

            if(!user){
                message.textContent = "Email ou mot passe incorrect !";
                return;
            }

            sessionStorage.setItem("currentUser", JSON.stringify(user));
            message.style.color = "green";
            message.textContent = "Connexion reussie ! Redirection...";
            setTimeout(() => {
                window.location.href = "html/dashboard.html";
            }, 2000);
        });
    };
});
