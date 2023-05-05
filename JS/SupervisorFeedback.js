function loadStudentFeedback() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const feedbackList = document.getElementById("feedback-list");
    const feedbackTimestamp = document.getElementById("feedback-timestamp");
    const feedbackData = JSON.parse(localStorage.getItem("supervisor-feedback")) || [];
    const reports = JSON.parse(localStorage.getItem('self-reports')) || [];

    feedbackList.innerHTML = "";

    const userReports = reports.filter(report => report.username === currentUser.username);
    const userFeedback = feedbackData.filter(feedback => {
        return userReports.some(report => report.timestamp === feedback.timestamp);
    }).reverse();

  
    

    for (const feedback of userFeedback) {
        const li = document.createElement("li");
        li.classList.add("feedback-item"); // Add a class to the list item
        const feedbackText = document.createTextNode(`Feedback to Self Report made on: ${feedback.timestamp}, Response: ${feedback.response}`);
        li.appendChild(feedbackText);
        feedbackList.appendChild(li);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#feedback-list")) {
        loadStudentFeedback();
    }
});
document.getElementById("nav-toggle").addEventListener("click", function () {
    document.querySelector("header").classList.toggle("open");
});
document.getElementById("nav-toggle").addEventListener("click", function () {
    document.querySelector("body").classList.toggle("nav-open");
});

document.addEventListener('DOMContentLoaded', () => {
    updateLoggedInUser();
    document.getElementById("logoutButton").addEventListener("click", logout);
});

function updateLoggedInUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const loggedInUser = document.getElementById("loggedInUser");
    const logoutButton = document.getElementById("logoutButton");

    if (currentUser && loggedInUser) {
        loggedInUser.textContent = `Welcome, ${currentUser.username}`;
        logoutButton.style.display = "inline";
    } else {
        logoutButton.style.display = "none";
    }
}
function logout() {
    localStorage.removeItem("currentUser");
    sessionStorage.setItem('loggedIn', 'false');
    updateLoggedInUser();
    location.reload();
}
function checkLoginStatus() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn !== "true") {
        alert("You need to log in to access this page.");
        window.location.href = "./Login.html";
    }
}
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});