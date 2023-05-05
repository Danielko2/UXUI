let currentReportIndex = 0;

function loadSupervisorReports() {
    const selfReports = document.getElementById("self-reports");
     reports = JSON.parse(localStorage.getItem("self-reports")) || [];
    const feedbackData = JSON.parse(localStorage.getItem("supervisor-feedback")) || [];
    const reversedReports = reports.reverse();
    calculateProgress(reports, feedbackData);
    displayReports();

    function displayReports() {
        selfReports.innerHTML = "";
        for (let i = currentReportIndex; i < currentReportIndex + 5 && i < reversedReports.length; i++) {
            const report = reversedReports[i];
            // Check if feedback exists for this report
            const hasFeedback = feedbackData.some(feedback => feedback.timestamp === report.timestamp);

            const li = document.createElement("li");
            if (hasFeedback) {
                li.style.backgroundColor = "green";
            }
            const reportText = document.createTextNode(
                `Username: ${report.username}, Timestamp: ${report.timestamp}, Mood: ${report.mood}, Stress: ${report.stress}, Sleep: ${report.sleep}, Academic Performance: ${report.academic}, Feelings: ${report.feelings}`
            );
            li.appendChild(reportText);

            const respondButton = document.createElement("button");
            const buttonText = document.createTextNode("Respond");
            respondButton.appendChild(buttonText);
            respondButton.classList.add("respond-button");
            respondButton.addEventListener("click", () => {
                respondToReport(report);
            });
            li.appendChild(respondButton);

            selfReports.appendChild(li);
        }
       
    }
}

function nextReports() {
    if (currentReportIndex + 5 < reports.length) {
        currentReportIndex += 5;
        loadSupervisorReports();
    }
}

function prevReports() {
    if (currentReportIndex - 5 >= 0) {
        currentReportIndex -= 5;
        loadSupervisorReports();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#self-reports")) {
        loadSupervisorReports();
    }
});

// ... the rest of the existing code ...

function calculateProgress(reports, feedbackData) {
    const totalReports = reports.length;
    const respondedReports = feedbackData.length;

    const progressBar = document.querySelector('.progress-bar');
    const totalReportsElement = document.getElementById('total-reports');
    const respondedReportsElement = document.getElementById('responded-reports');

    const progressPercentage = (respondedReports / totalReports) * 100;

    progressBar.style.width = `${progressPercentage}%`;
    totalReportsElement.textContent = totalReports;
    respondedReportsElement.textContent = respondedReports;
}

function respondToReport(report) {
    const responseModal = document.getElementById("responseModal");
    const responseText = document.getElementById("responseText");
    const saveResponse = document.getElementById("saveResponse");
    const cancelResponse = document.getElementById("cancelResponse");

    responseModal.style.display = "block";

    saveResponse.onclick = function () {
        const response = responseText.value;

        if (response !== "") {
            const feedback = {
                timestamp: report.timestamp,
                response: response
            };

            let storedFeedback = JSON.parse(localStorage.getItem("supervisor-feedback")) || [];
            storedFeedback.push(feedback);
            localStorage.setItem("supervisor-feedback", JSON.stringify(storedFeedback));

            alert("Response saved successfully!");
            responseModal.style.display = "none";
            location.reload();
        } else {
            alert("Please enter a response.");
        }
    };

    cancelResponse.onclick = function () {
        responseModal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == responseModal) {
            responseModal.style.display = "none";
        }
    };
}


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


