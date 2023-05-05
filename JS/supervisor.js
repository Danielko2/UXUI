let currentPage = 1;
const itemsPerPage = 5;

document.addEventListener('DOMContentLoaded', () => {
    const meetingsList = document.querySelector('#meetings-list');
    const prevButton = document.querySelector('#previousButton');
    const nextButton = document.querySelector('#nextButton');

    // Load saved meetings on page load
    loadSavedMeetings(currentPage);

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadSavedMeetings(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        currentPage++;
        loadSavedMeetings(currentPage);
    });

    function loadSavedMeetings(page) {
        meetingsList.innerHTML = '';
         meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
        meetings.reverse();
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        for (const meeting of meetings.slice(start, end)) {
            const li = document.createElement('li');
            const meetingText = document.createTextNode(`Student Name: ${meeting.username}, ${meeting.subject} - ${meeting.date} at ${meeting.time} - Status: ${meeting.status || 'Not accepted yet'}`);
            li.appendChild(meetingText);

            if (meeting.status !== 'Accepted' && meeting.status !== 'Accepted by Student' && meeting.status !== 'Rescheduled') {
                const acceptButton = document.createElement('button');
                const acceptText = document.createTextNode('Accept');
                acceptButton.appendChild(acceptText);
                acceptButton.classList.add('accept-button');
                acceptButton.addEventListener('click', () => {
                    updateMeetingStatus(meeting, 'Accepted');
                    loadSavedMeetings(currentPage);
                    location.reload()
                });
                li.appendChild(acceptButton);
            }

            const rescheduleButton = document.createElement('button');
            const rescheduleText = document.createTextNode('Reschedule');
            rescheduleButton.appendChild(rescheduleText);
            rescheduleButton.classList.add('reschedule-button');
            rescheduleButton.addEventListener('click', () => {
                openRescheduleModal(meeting);
            });
            li.appendChild(rescheduleButton);

            meetingsList.appendChild(li);
            if (meetings.length <= end) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }
        }
    }

    function updateMeetingStatus(targetMeeting, newStatus) {
        const meetings = JSON.parse(localStorage.getItem('meetings') || '[]').reverse();
        const updatedMeetings = meetings.map(meeting => {
            if (meeting.subject === targetMeeting.subject && meeting.date === targetMeeting.date && meeting.time === targetMeeting.time) {
                return { ...meeting, status: newStatus };
            }
            return meeting;
        });
        localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
       
    }

    function rescheduleMeeting(targetMeeting, newDate, newTime) {
        const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
        const updatedMeetings = meetings.map(meeting => {
            if (meeting.subject === targetMeeting.subject && meeting.date === targetMeeting.date && meeting.time === targetMeeting.time) {
                return { ...meeting, date: newDate, time: newTime, status: 'Rescheduled' };
            }
            return meeting;
        });
        localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
       
    }

    function openRescheduleModal(meeting) {
        const modal = document.getElementById('reschedule-modal');
        const closeModalButton = document.querySelector('.close');

        modal.style.display = 'block';

        closeModalButton.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

        const rescheduleForm = document.getElementById('reschedule-form');
        rescheduleForm.onsubmit = (e) => {
            e.preventDefault();

            const newDate = document.getElementById('new-date').value;
            const newTime = document.getElementById('new-time').value;

            rescheduleMeeting(meeting, newDate, newTime);
            loadSavedMeetings(currentPage);
            modal.style.display = 'none';
            location.reload()
        };
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
function loadCalendar() {
    const meetings = JSON.parse(localStorage.getItem("meetings")) || [];

    const events = meetings.map(meeting => {
        return {
            title: `Subject:  ${meeting.subject} Student: ${meeting.username} `,
            start: meeting.date + "T" + meeting.time,
            allDay: false,
            meeting: meeting ,// Add the meeting object to the event
             className: 'custom-event'
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
        eventClick: function (calEvent, jsEvent, view) {
            openMeetingDetailsModal(calEvent.meeting);
        }
    });
}
function openMeetingDetailsModal(meeting) {
    const modal = document.getElementById('meeting-details-modal');
    const closeModalButton = modal.querySelector('.close');
    const meetingDetails = modal.querySelector('#meeting-details');

    // Fill the meeting details
    meetingDetails.innerHTML = `
        <p>Student Name: ${meeting.username}</p>
        <p>Subject: ${meeting.subject}</p>
        <p>Date: ${meeting.date}</p>
        <p>Time: ${meeting.time}</p>
        <p>Status: ${meeting.status || 'Not accepted yet'}</p>
    `;

    // Show the modal
    modal.style.display = 'block';

    // Close modal on 'x' click
    closeModalButton.onclick = () => {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

document.addEventListener("DOMContentLoaded", () => {
    loadCalendar();
});
