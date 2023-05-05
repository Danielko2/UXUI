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
    const meetingsList = document.querySelector('#meetings-list');

    // Load saved meetings on page load
    loadSavedMeetings();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data and save it to local storage
        const formData = getFormData();
        saveFormData(formData);

        // Clear form inputs
        clearFormInputs();

        // Load saved meetings
        loadSavedMeetings();
    });

    function getFormData() {
        const subject = document.querySelector('#subject').value;
        const date = document.querySelector('#date').value;
        const time = document.querySelector('#time').value;
        const username = getCurrentUsername();
        return { subject, date, time, username };
    }

    function saveFormData(formData) {
        const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
        meetings.push(formData);
        localStorage.setItem('meetings', JSON.stringify(meetings));
    }

    function loadSavedMeetings() {
        meetingsList.innerHTML = '';
        meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
        meetings.reverse();
        const username = getCurrentUsername();
        const filteredMeetings = meetings.filter(meeting => meeting.username === username);
        for (const meeting of filteredMeetings) {
            const li = document.createElement('li');
            li.classList.add('meeting-item'); // Add this line

            const meetingTextWrapper = document.createElement('span'); // Add this line
            const meetingText = document.createTextNode(`${meeting.subject} - ${meeting.date} at ${meeting.time} - Status: ${meeting.status || 'Not accepted yet'}`);
            meetingTextWrapper.appendChild(meetingText);
            li.appendChild(meetingTextWrapper);

            // Change color based on status
            if (meeting.status === 'Accepted' || meeting.status === 'Accepted by Student') {
                li.style.color = 'green';
            } else if (meeting.status === 'Rescheduled') {
                li.style.color = 'blue';
            }
            if (meeting.status === 'Rescheduled') {
                const acceptRescheduleButton = document.createElement('button');
                const acceptRescheduleText = document.createTextNode('Accept Reschedule');
                acceptRescheduleButton.appendChild(acceptRescheduleText);
                acceptRescheduleButton.classList.add('accept-reschedule-button');
                acceptRescheduleButton.addEventListener('click', () => {
                    updateMeetingStatus(meeting, 'Accepted');
                    loadSavedMeetings();
                });
                li.appendChild(acceptRescheduleButton);
            }

            const deleteButton = document.createElement('button');
            const buttonText = document.createTextNode('Delete');
            deleteButton.appendChild(buttonText);
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                deleteMeeting(meeting);
                loadSavedMeetings();
            });
            li.appendChild(deleteButton);

            meetingsList.appendChild(li);
        }

    }


    function deleteMeeting(meeting) {
        const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
        const updatedMeetings = meetings.filter(item => !(item.subject === meeting.subject && item.date === meeting.date && item.time === meeting.time));
        localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    }

    function clearFormInputs() {
        document.querySelector('#subject').value = '';
        document.querySelector('#date').value = '';
        document.querySelector('#time').value = '';
    }
});
function updateMeetingStatus(targetMeeting, newStatus) {
    const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    const updatedMeetings = meetings.map(meeting => {
        if (meeting.subject === targetMeeting.subject && meeting.date === targetMeeting.date && meeting.time === targetMeeting.time) {
            return { ...meeting, status: newStatus === 'Accepted' ? 'Accepted by Student' : newStatus };
        }
        return meeting;
    });
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
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
function getCurrentUsername() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user.username;
}
