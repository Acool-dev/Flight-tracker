const historyList = document.getElementById('history-list');

const map = L.map('map').setView([20, 0], 2);  

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addToHistory(flightNumber) {
    const listItem = document.createElement('li');
    listItem.textContent = flightNumber;
    listItem.onclick = () => {
        document.getElementById('flight-number').value = flightNumber;
        trackFlight();
    };
    historyList.appendChild(listItem);
}

function notifyUser(message) {
    if (Notification.permission === 'granted') {
        new Notification('Flight Tracker', { body: message });
    }
}

async function trackFlight() {
    const flightNumber = document.getElementById('flight-number').value.trim();
    if (!flightNumber) return;

    addToHistory(flightNumber);

    const apiKey = 'bd33b4fad6cda564c39814354d804c06'; 
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayFlightInfo(data);
        notifyUser(`Flight ${flightNumber} status: ${data.data[0].flight_status}`);
    } catch (error) {
        console.error('Error fetching flight data:', error);
        document.getElementById('flight-info').innerText = 'Failed to retrieve flight data. Please try again.';
    }
}

function displayFlightInfo(data) {
    const flight = data.data[0];
    const flightInfoDiv = document.getElementById('flight-info');

    if (flight) {
        flightInfoDiv.innerHTML = `
            <div class="flight-card">
                <h2>Flight ${flight.flight.iata}</h2>
                <p><strong>Status:</strong> ${flight.flight_status}</p>
                <p><strong>Departure:</strong> ${flight.departure.airport} (${flight.departure.iata}) at ${new Date(flight.departure.scheduled).toLocaleString()}</p>
                <p><strong>Arrival:</strong> ${flight.arrival.airport} (${flight.arrival.iata}) at ${new Date(flight.arrival.scheduled).toLocaleString()}</p>
                <p><strong>Aircraft:</strong> ${flight.aircraft.model} (${flight.aircraft.iata})</p>
                <p><strong>Airline:</strong> ${flight.airline.name}</p>
            </div>
        `;

        // Update map to show flight route
        const departureCoords = [flight.departure.latitude, flight.departure.longitude];
        const arrivalCoords = [flight.arrival.latitude, flight.arrival.longitude];

        map.setView(departureCoords, 4);
        L.marker(departureCoords).addTo(map).bindPopup(`Departure: ${flight.departure.airport}`);
        L.marker(arrivalCoords).addTo(map).bindPopup(`Arrival: ${flight.arrival.airport}`);

        const flightPath = [departureCoords, arrivalCoords];
        L.polyline(flightPath, { color: 'blue' }).addTo(map);
    } else {
        flightInfoDiv.innerText = 'Flight not found. Please check the flight number and try again.';
    }
}

if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}
