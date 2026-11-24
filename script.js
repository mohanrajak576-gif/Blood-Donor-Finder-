
// Sample donor information for demonstration
let donors = [
    {
        name: "Rahul",
        blood: "B+",
        city: "Howrah"
    },
    {
        name: "Priya",
        blood: "O+",
        city: "Kolkata"
    },
    {
        name: "Amit",
        blood: "A+",
        city: "Howrah"
    },
    {
        name: "Sneha",
        blood: "AB+",
        city: "Kolkata"
    },
    {
        name: "Arjun",
        blood: "B-",
        city: "Howrah"
    }
];

let requests = [];

// Donor registration
document.getElementById("donorForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("donorName").value;
    let blood = document.getElementById("donorBlood").value;
    let city = document.getElementById("donorCity").value;

    donors.push({
        name: name,
        blood: blood,
        city: city
    });

    document.getElementById("registerMessage")
    .textContent = "Registration successful! (Demo only)";

    this.reset();
});

// Search donors
function findDonors() {

    let blood = document.getElementById("searchBlood").value;
    let city = document.getElementById("searchCity")
    .value.trim().toLowerCase();

    let results = donors.filter(function(donor) {

        return donor.blood === blood &&
        donor.city.toLowerCase().includes(city);

    });

    let output = document.getElementById("donorResults");

    if (blood === "") {
        output.textContent = "Please select a blood group.";
        return;
    }

    if (results.length === 0) {
        output.textContent = "No matching sample donors found.";
        return;
    }

    output.innerHTML = "";

    results.forEach(function(donor) {

        let card = document.createElement("div");
        card.className = "donor-card";

        let details = document.createElement("p");
        details.textContent =
            "Name: " + donor.name +
            " | Blood: " + donor.blood +
            " | Location: " + donor.city;

        card.appendChild(details);
        output.appendChild(card);

    });
}

// Submit blood request
document.getElementById("requestForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let patient = document.getElementById("patientName").value;
    let blood = document.getElementById("requestBlood").value;
    let hospital = document.getElementById("hospital").value;

    let request = {
        patient: patient,
        blood: blood,
        hospital: hospital,
        status: "Pending"
    };

    requests.push(request);

    displayRequests();

    this.reset();
});

// Display requests
function displayRequests() {

    let output = document.getElementById("requestResults");

    output.innerHTML = "";

    requests.forEach(function(request, index) {

        let card = document.createElement("div");
        card.className = "request-card";

        let details = document.createElement("p");
        details.textContent =
            "Patient: " + request.patient +
            " | Blood: " + request.blood +
            " | Location: " + request.hospital +
            " | Status: " + request.status;

        let accept = document.createElement("button");
        accept.textContent = "Accept Request";
        accept.onclick = function() {
            updateRequest(index, "Accepted");
        };

        let decline = document.createElement("button");
        decline.textContent = "Decline Request";
        decline.style.background = "#555";

        decline.onclick = function() {
            updateRequest(index, "Declined");
        };

        card.appendChild(details);
        card.appendChild(accept);
        card.appendChild(decline);

        output.appendChild(card);

    });
}

// Update request status
function updateRequest(index, status) {

    requests[index].status = status;

    displayRequests();

}
