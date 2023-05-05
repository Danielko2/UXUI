
const supervisorsList = document.getElementById("supervisorsList");
const studentsList = document.getElementById("studentsList");

function getUsersByType(userType) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.filter((user) => user.userType.toLowerCase() === userType.toLowerCase());
}

function renderSupervisors() {
    const supervisors = getUsersByType("supervisor");
    supervisorsList.innerHTML = "";
    for (const supervisor of supervisors) {
        const li = document.createElement("li");
        li.textContent = supervisor.username;
        supervisorsList.appendChild(li);
    }
   
}

function renderStudents() {
    const students = getUsersByType("student");
    studentsList.innerHTML = "";
    for (const student of students) {
        const li = document.createElement("li");
        li.textContent = student.username;

        const currentSupervisor = getCurrentSupervisor(student);
        if (currentSupervisor) {
            const supervisorSpan = document.createElement("span");
            supervisorSpan.classList.add("supervisor-info");
            supervisorSpan.textContent = currentSupervisor;
            li.appendChild(supervisorSpan);
        }

        const assignButton = document.createElement("button");
        assignButton.textContent = currentSupervisor ? "Change Supervisor" : "Assign";
        assignButton.classList.add("assign-button");

        assignButton.addEventListener("click", () => {
            showModal(student);
        });

        li.appendChild(assignButton);
        studentsList.appendChild(li);
    }
}



function showModal(student) {
    const modal = document.getElementById("modal");
    const modalSupervisorsList = document.getElementById("modalSupervisorsList");
    modalSupervisorsList.innerHTML = "";
    const supervisors = getUsersByType("supervisor");

    for (const supervisor of supervisors) {
        const li = document.createElement("li");
        li.textContent = supervisor.username;
        li.addEventListener("click", () => {
            assignStudentToSupervisor(student, supervisor);
            modal.style.display = "none";
        });
        modalSupervisorsList.appendChild(li);
    }

    modal.style.display = "block";
    const modalCloseButton = document.getElementById("modalCloseButton");
    modalCloseButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
}
function assignStudentToSupervisor(student, supervisor) {
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    // Find the index of the existing assignment for the student
    const assignmentIndex = assignments.findIndex(assignment => assignment.studentUsername === student.username);

    if (assignmentIndex !== -1) {
        // If an existing assignment is found, update the supervisor
        assignments[assignmentIndex].supervisorUsername = supervisor.username;
    } else {
        // If no existing assignment is found, add a new assignment
        assignments.push({ studentUsername: student.username, supervisorUsername: supervisor.username });
    }

    localStorage.setItem("assignments", JSON.stringify(assignments));
    renderStudents();
}

function isStudentAssigned(student) {
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    return assignments.some(assignment => assignment.studentUsername === student.username);
}

// Call the render functions to display the users
renderStudents();
renderSupervisors();



function getCurrentSupervisor(student) {
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const assignment = assignments.find(assignment => assignment.studentUsername === student.username);
    return assignment ? assignment.supervisorUsername : null;
} 
