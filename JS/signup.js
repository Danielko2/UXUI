document.getElementById('signup-button').addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value; // Get the user type

    if (username && password) {
        // Retrieve the existing users array from local storage, or create a new empty array
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if a user with the same username and user type already exists
        const userExists = users.some(user => user.username === username && user.userType === userType);

        if (userExists) {
            // If the user already exists, display an alert and prevent the new user from being created
            alert('A user with this username and user type already exists. Please choose a different username or user type.');
        } else {
            // Add the new user to the array, including the user type
            users.push({ username, password, userType });

            // Save the updated users array to local storage
            localStorage.setItem('users', JSON.stringify(users));

            // Redirect to the login page after successful sign-up
            window.location.href = "/Pages/login.html";
        }
    } else {
        alert('Please fill in all the fields');
    }
});
document.getElementById('login-button').addEventListener('click', () => {
    window.location.href = "/Pages/login.html";
});



if (!localStorage.getItem("dataInitialized")) {
    // Users
    const users = [
        { username: "Alice", password: "password", userType: "Supervisor" },      
        { username: "Charlie", password: "password", userType: "Senior Tutor" },
        { username: "Daniel", password: "password", userType: "Student" },
        { username: "Emma", password: "password", userType: "Student" },
        { username: "Frank", password: "password", userType: "Student" },
        { username: "Grace", password: "password", userType: "Student" },
    ];
    localStorage.setItem("users", JSON.stringify(users));

    // Self reports
    const selfReports = [
        { username: "Daniel", mood: "bad", stress: "very-bad", sleep: "good", academic: "neutral", feelings: "Had a rough day with exams", timestamp: "01.05.2023, 10:00:00" },
        { username: "Daniel", mood: "good", stress: "good", sleep: "good", academic: "good", feelings: "Feeling better after talking to friends", timestamp: "02.05.2023, 10:00:00" },
        { username: "Emma", mood: "average", stress: "average", sleep: "average", academic: "average", feelings: "A regular day", timestamp: "01.05.2023, 11:00:00" },
        { username: "Emma", mood: "good", stress: "good", sleep: "good", academic: "good", feelings: "Had a productive day", timestamp: "02.05.2023, 11:00:00" },
        { username: "Frank", mood: "very bad", stress: "very bad", sleep: "very bad", academic: "very bad", feelings: "Struggling with personal issues", timestamp: "01.05.2023, 12:00:00" },
        { username: "Grace", mood: "good", stress: "good", sleep: "good", academic: "good", feelings: "Enjoyed the day with family", timestamp: "01.05.2023, 13:00:00" },
    ];
    localStorage.setItem("self-reports", JSON.stringify(selfReports));


    // Supervisor feedback
    const supervisorFeedback = [
        { timestamp: "01.05.2023, 10:00:00", response: "Hang in there, Daniel! Exams can be tough, but remember to take breaks and stay positive." },
        { timestamp: "02.05.2023, 10:00:00", response: "Glad to hear you're feeling better, Daniel. Keep leaning on your support network when you need to." },
        { timestamp: "01.05.2023, 11:00:00", response: "Emma, it's good to have regular days. Remember to maintain a healthy balance between work and relaxation." },
        { timestamp: "02.05.2023, 11:00:00", response: "Great job, Emma! Keep up the productivity and don't forget to reward yourself for the hard work." },
        { timestamp: "01.05.2023, 12:00:00", response: "Frank, I'm sorry to hear about your personal struggles. Remember that it's okay to ask for help when needed." },
        { timestamp: "01.05.2023, 13:00:00", response: "It's fantastic to see you enjoying your day with family, Grace! Family time is essential for maintaining mental well-being." },
    ];
    localStorage.setItem("supervisor-feedback", JSON.stringify(supervisorFeedback));


   



    // Set the dataInitialized flag in local storage
    localStorage.setItem("dataInitialized", true);
}

