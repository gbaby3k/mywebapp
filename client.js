const serverUrl = 'https://72.74.184.228:3000/auth/register';

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    // Send a POST request to your server
    fetch(serverUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server (e.g., show a success message)
            console.log(data);
        })
        .catch(error => console.error("Error:", error));

    // Clear the form fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
});
