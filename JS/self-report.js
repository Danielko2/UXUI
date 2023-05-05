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
document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');
    const submitButton = document.querySelector('button[type="submit"]');
    const message = document.querySelector('.message');
    const savedReports = document.querySelector('#saved-reports');

    
    // Load saved reports on page load
    loadSavedReports();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data and save it to local storage
        const formData = getFormData();
        saveFormData(formData);

        // Display success message
        message.textContent = 'Self-report submitted!';
        message.classList.remove('hidden');
        setTimeout(() => {
            message.classList.add('show');
        }, 50);
        submitButton.disabled = true;

        // Clear form inputs
        clearFormInputs();

        // Load saved reports
        loadSavedReports();

        // Ask user if they want to add another report
        const confirmAddReport = confirm('Do you want to add another report?');
        if (confirmAddReport) {
            window.location.reload();
        } else {
            window.location.href = '/Pages/HtmlPage.html';
        }
    });

    function getFormData() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const username = currentUser.username;
        const mood = document.querySelector('#mood').value;
        const stress = document.querySelector('#stress').value;
        const sleep = document.querySelector('#sleep').value;
        const academic = document.querySelector('#academic').value;
        const feelings = document.querySelector('#feelings').value;
        return { username, mood, stress, sleep, academic, feelings };
    }

    function saveFormData(formData) {
        const reports = JSON.parse(localStorage.getItem('self-reports') || '[]');
        const timestamp = new Date().toLocaleString();
        const report = { ...formData, timestamp, responseStatus: 'unresponded' };
        reports.push(report);
        localStorage.setItem('self-reports', JSON.stringify(reports));
    }

    function loadSavedReports() {
        savedReports.innerHTML = '';
         reports = JSON.parse(localStorage.getItem('self-reports') || '[]');
        reports.reverse();
        const username = getCurrentUsername();
        const filteredReports = reports.filter(report => report.username === username);

        for (const report of filteredReports) {
            const li = document.createElement('li');
            const reportText = document.createTextNode(`${report.timestamp}: Mood: ${report.mood}, Stress: ${report.stress}, Sleep: ${report.sleep}, Academic Performance: ${report.academic}, Feelings: ${report.feelings}`);
            li.appendChild(reportText);

            const deleteButton = document.createElement('button');
            const buttonText = document.createTextNode('Delete');
            deleteButton.appendChild(buttonText);
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                deleteReport(report);
                loadSavedReports();
            });
            li.appendChild(deleteButton);

            savedReports.appendChild(li);
        }
    }
       

    function deleteReport(report) {
        const reports = JSON.parse(localStorage.getItem('self-reports') || '[]');
        const updatedReports = reports.filter(item => item.timestamp !== report.timestamp);
        localStorage.setItem('self-reports', JSON.stringify(updatedReports));
    }

    function clearFormInputs() {
        document.querySelector('#mood').value = 'neutral';
        document.querySelector('#stress').value = 'neutral';
        document.querySelector('#sleep').value = 'neutral';
        document.querySelector('#academic').value = 'neutral';
        document.querySelector('#feelings').value = '';
    }
});

function getCurrentUsername() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user.username;
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