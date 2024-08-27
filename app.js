async function trackFlight() {
    const flightNumber = document.getElementById('flight-number').value.trim();
    const apiKey = 'bd33b4fad6cda564c39814354d804c06';
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayFlightInfo(data);
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
            </div>
        `;
    } else {
        flightInfoDiv.innerText = 'Flight not found. Please check the flight number and try again.';
    }
}
