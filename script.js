document.addEventListener("DOMContentLoaded", function () {
    const userTable = document.getElementById("userTable").getElementsByTagName('tbody')[0];

    // Fetch user data from the API
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            // Loop through the user data and create table rows with "View" buttons
            data.forEach(user => {
                const row = userTable.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5); // Add a new cell for the "View" button

                cell1.innerHTML = user.id;
                cell2.innerHTML = user.name;
                cell3.innerHTML = user.email;
                cell4.innerHTML = user.phone;
                cell5.innerHTML = user.website;

                // Create a "View" button and attach a click event handler
                const viewButton = document.createElement("button");
                viewButton.textContent = "View";
                viewButton.onclick = function () {
                    openModal(user);
                };
                cell6.appendChild(viewButton);
            });
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
});

// Function to open the modal and fetch user details
function openModal(user) {
    const modal = document.getElementById("viewUserModal");
    const userDetails = document.getElementById("userDetails");

    // Fetch user details using the user's ID
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
        .then(response => response.json())
        .then(data => {
            // Build the user details content
            userDetails.innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Username:</strong> ${data.username}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Website:</strong> ${data.website}</p>
                <p><strong>Company:</strong> ${data.company.name}</p>
                <p><strong>Address:</strong> ${data.address.street}, ${data.address.city}, ${data.address.zipcode}</p>
            `;

            // Display the modal
            modal.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
        });
}

function openCreateUserModal() {
    const modal = document.getElementById("createUserModal");
    modal.style.display = "block";
}



// Function to close the modal
function closeModal() {
    const modal = document.getElementById("viewUserModal");
    modal.style.display = "none";
}

function closeCreateUserModal() {
    const modal = document.getElementById("createUserModal");
    modal.style.display = "none";
}


const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("blur", function () {
    // Get the current phone number value
    let phoneNumber = phoneInput.value.trim();

    // Remove spaces and add +48 prefix if not present
    phoneNumber = phoneNumber.replace(/\s+/g, '');
    if (!phoneNumber.startsWith("+48")) {
        phoneNumber = "+48" + phoneNumber;
    }

    // Update the phone number input with the formatted value
    phoneInput.value = phoneNumber;
});