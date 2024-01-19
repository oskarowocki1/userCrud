document.addEventListener("DOMContentLoaded", function () {
    // const userTable = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    const userTable = $("#userTable tbody");

    // Fetch user data from the API
    $.getJSON("https://jsonplaceholder.typicode.com/users", function(data){
        data.forEach(user => {
            // const row = userTable.insertRow();
            const row = $("<tr>");
            row.append($("<td>").text(user.id));
            row.append($("<td>").text(user.name));
            row.append($("<td>").text(user.email));
            row.append($("<td>").text(user.phone));
            row.append($("<td>").text(user.website));
            
            const buttonCell = $("<td>");
            buttonCell.append($("<button>").text("View").click(function () { openModal(user); }))
            buttonCell.append($("<button>").text("Edit").click(function () { openModal(user); }))
            buttonCell.append($("<button>").text("Delete").click(function () { openModal(user); }))
            row.append(buttonCell);

            userTable.append(row);
        })
        .fail(error => {
            console.error("Error fetching user data:", error);
        });
    })
    /*fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            // Loop through the user data and create table rows with "View" buttons
            data.forEach(user => {
                // const row = userTable.insertRow();
                const row = $("<tr>");
                row.append($("<td>").text(user.id));
                row.append($("<td>").text(user.name));
                row.append($("<td>").text(user.email));
                row.append($("<td>").text(user.phone));
                row.append($("<td>").text(user.website));
                
                const buttonCell = $("<td>");
                buttonCell.append($("<button>").text("View").click(function () { openModal(user); }))
                buttonCell.append($("<button>").text("Edit").click(function () { openModal(user); }))
                buttonCell.append($("<button>").text("Delete").click(function () { openModal(user); }))
                row.append(buttonCell);

                userTable.append(row);
            });
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
        */

});

// Function to open the modal and fetch user details
function openModal(user) {
    const userDetails = $("#userDetails");

    // Fetch user details using the user's ID
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
        .then(response => response.json())
        .then(data => {
            // Build the user details content
            userDetails.html(`
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Website:</strong> ${data.website}</p>
            <p><strong>Company:</strong> ${data.company.name}</p>
            <p><strong>Address:</strong> ${data.address.street}, ${data.address.city}, ${data.address.zipcode}</p>
        `);

            // Display the modal
            //modal.style.display = "block";
            $("#viewUserModal").show();
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
        });
}

function openCreateUserModal() {
    $("#createUserModal").show();
}



// Function to close the modal
function closeModal() {
    $("#viewUserModal").hide();
}

function closeCreateUserModal() {
    $("#createUserModal").hide();
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