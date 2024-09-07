const aviationApiKey = "bd33b4fad6cda564c39814354d804c06";
const flightApiKey = "66dcddb5b9b8c754a45418beValidity"; 

function trackFlight() {
    const flightNumber = document.getElementById("flight-number").value;
    
    if (!flightNumber) {
        alert("Please enter a valid flight number.");
        return;
    }

    fetch(`https://aviationion.com/api/v1/flights/${flightNumber}?apikey=${aviationApiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Flight not found.");
            }
            return response.json();
        })
        .then(data => {
            const flightInfo = data.flight;
            document.getElementById("flight-info").innerHTML = `
                <h3>Flight Info</h3>
                <p>Flight: ${flightInfo.iata}</p>
                <p>Airline: ${flightInfo.airline_name}</p>
                <p>Status: ${flightInfo.status}</p>
                <p>Departure: ${flightInfo.departure.airport}</p>
                <p>Arrival: ${flightInfo.arrival.airport}</p>
            `;
        })
        .catch(err => {
            document.getElementById("flight-info").innerHTML = `<p>Error: ${err.message}</p>`;
        });
}

function findCheapFlights() {
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departure-date").value;

    if (!origin || !destination || !departureDate) {
        alert("Please fill in all the fields.");
        return;
    }

    fetch(`https://api.flightapi.io/roundtrip/${origin}/${destination}/${departureDate}/1/0/0/Economy/USD?apikey=${flightApiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No cheap flights found.");
            }
            return response.json();
        })
        .then(data => {
            let results = '<h3>Available Flights</h3><ul>';
            data.forEach(flight => {
                results += `<li>${flight.airline} - $${flight.price.total} USD</li>`;
            });
            results += '</ul>';
            document.getElementById("cheap-flights-results").innerHTML = results;
        })
        .catch(err => {
            document.getElementById("cheap-flights-results").innerHTML = `<p>Error: ${err.message}</p>`;
        });
}

function trackTicket() {
    const ticketNumber = document.getElementById("ticket-number").value;

    if (!ticketNumber) {
        alert("Please enter a valid ticket number.");
        return;
    }

    fetch(`https://aviationion.com/api/v1/tickets/${ticketNumber}?apikey=${aviationApiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ticket not found.");
            }
            return response.json();
        })
        .then(data => {
            const ticketInfo = data.ticket;
            document.getElementById("ticket-info").innerHTML = `
                <h3>Ticket Info</h3>
                <p>Ticket Number: ${ticketInfo.number}</p>
                <p>Flight: ${ticketInfo.flight_number}</p>
                <p>Seat: ${ticketInfo.seat_number}</p>
                <p>Passenger: ${ticketInfo.passenger_name}</p>
            `;
        })
        .catch(err => {
            document.getElementById("ticket-info").innerHTML = `<p>Error: ${err.message}</p>`;
        });
}
function getAircraftInfo() {
    const aircraftReg = document.getElementById("aircraft-reg").value;

    if (!aircraftReg) {
        alert("Please enter a valid aircraft registration.");
        return;
    }

    fetch(`https://aviationion.com/api/v1/aircraft/${aircraftReg}?apikey=${aviationApiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Aircraft not found.");
            }
            return response.json();
        })
        .then(data => {
            const aircraftInfo = data.aircraft;
            document.getElementById("aircraft-details").innerHTML = `
                <h3>Aircraft Info</h3>
                <p>Aircraft Model: ${aircraftInfo.model}</p>
                <p>Manufacturer: ${aircraftInfo.manufacturer}</p>
                <p>Registration: ${aircraftInfo.registration}</p>
                <p>Airline: ${aircraftInfo.airline_name}</p>
            `;
        })
        .catch(err => {
            document.getElementById("aircraft-details").innerHTML = `<p>Error: ${err.message}</p>`;
        });
}
