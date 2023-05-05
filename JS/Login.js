const loginForm = document.getElementById("login-form");
const loggedInUser = document.getElementById("loggedInUser");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        sessionStorage.setItem('loggedIn', 'true');

        // Redirect to different welcome pages based on user type
        switch (user.userType) {
            case 'Student':
                location.href = "./HtmlPage.html";
                break;
            case 'Supervisor':
                location.href = "./WelcomePageSupervisor.html";
                break;
            case 'Senior Tutor':
                location.href = "./SeniorTutorWelcome.html";
                break;
            default:
                location.href = "./HtmlPage.html";
        }
    } else {
        alert("Invalid username or password.");
    }
});
document.getElementById('signup-button').addEventListener('click', () => {
    window.location.href = "/Pages/signup.html";
});
