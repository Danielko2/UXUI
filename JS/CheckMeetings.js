
document.addEventListener("DOMContentLoaded", () => {
    loadCalendar();

    const closeEventDetails = document.getElementById("closeEventDetails");
    closeEventDetails.addEventListener("click", function () {
        document.getElementById("eventDetailsModal").style.display = "none";
    });
});

function loadCalendar() {
    const meetings = JSON.parse(localStorage.getItem("meetings")) || [];
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    const events = meetings.map(meeting => {
        // Find the corresponding assigned student
        const assignedStudent = assignments.find(
            assignment => assignment.studentUsername === meeting.username
        );

        // Get the supervisor's name, or use a default value if not found
        const supervisorName = assignedStudent
            ? assignedStudent.supervisorUsername
            : "Unknown Supervisor";

        return {
            title: `Subject: ${meeting.subject} Student: ${meeting.username} Supervisor: ${supervisorName}`,
            start: meeting.date + "T" + meeting.time,
            allDay: false
        };
    });

    $('#calendar').fullCalendar({
        events: events,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'agendaWeek',
        timeFormat: 'H:mm',
        eventLimit: true,
        slotEventOverlap: false, // Disable event overlapping
        agendaEventMinHeight: 20, // Set the minimum height of events
        eventRender: function (event, element) {
            element.css('padding', '2px');
            element.css('font-size', '10px');
            element.css('line-height', '1.2');
            element.css('height', 'auto');
        },
        eventClick: function (event, jsEvent, view) {
            showEventDetails(event);
        }
    });
}

function showEventDetails(event) {
    const eventDetailsModal = document.getElementById("eventDetailsModal");
    const eventDetailsText = document.getElementById("eventDetailsText");

    eventDetailsText.innerHTML = `<strong>Title:</strong> ${event.title}<br><strong>Start:</strong> ${event.start.format("YYYY-MM-DD HH:mm")}`;

    eventDetailsModal.style.display = "block";
}



document.addEventListener("DOMContentLoaded", () => {
    loadCalendar();
});
document.getElementById("nav-toggle").addEventListener("click", function () {
    document.querySelector("header").classList.toggle("open");
});
document.getElementById("nav-toggle").addEventListener("click", function () {
    document.querySelector("body").classList.toggle("nav-open");
});
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
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
