const aviationApiKey = "bd33b4fad6cda564c39814354d804c06";
const flightApiKey = "66dcddb5b9b8c754a45418beValidity";

function trackFlight() {
    const flightNumber = document.getElementById("flight-number").value;
    
    fetch(`https://aviationion.com/api/v1/flights/${flightNumber}?apikey=${aviationApiKey}`)
        .then(response => response.json())
        .then(data => {
            const flightInfo = data.flight;
            document.getElementById("flight-info").innerHTML = `
                <p>Flight: ${flightInfo.iata}</p>
                <p>Airline: ${flightInfo.airline_name}</p>
                <p>Status: ${flightInfo.status}</p>
                <p>Departure: ${flightInfo.departure.airport}</p>
                <p>Arrival: ${flightInfo.arrival.airport}</p>
            `;
        })
        .catch(err => console.log(err));
}

function findCheapFlights() {
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departure-date").value;

    fetch(`https://api.flightapi.io/roundtrip/${origin}/${destination}/${departureDate}/1/0/0/Economy/USD?apikey=${flightApiKey}`)
        .then(response => response.json())
        .then(data => {
            let results = '<ul>';
            data.forEach(flight => {
                results += `<li>${flight.airline} - $${flight.price.total} USD</li>`;
            });
            results += '</ul>';
            document.getElementById("cheap-flights-results").innerHTML = results;
        })
        .catch(err => console.log(err));
}

function trackTicket() {
    const ticketNumber = document.getElementById("ticket-number").value;

    fetch(`https://aviationion.com/api/v1/tickets/${ticketNumber}?apikey=${aviationApiKey}`)
        .then(response => response.json())
        .then(data => {
            const ticketInfo = data.ticket;
            document.getElementById("ticket-info").innerHTML = `
                <p>Ticket Number: ${ticketInfo.number}</p>
                <p>Flight: ${ticketInfo.flight_number}</p>
                <p>Seat: ${ticketInfo.seat_number}</p>
                <p>Passenger Name: ${ticketInfo.passenger_name}</p>
            `;
        })
        .catch(err => console.log(err));
}

function getAircraftInfo() {
    const aircraftReg = document.getElementById("aircraft-reg").value;

    fetch(`https://aviationion.com/api/v1/aircraft/${aircraftReg}?apikey=${aviationApiKey}`)
        .then(response => response.json())
        .then(data => {
            const aircraftInfo = data.aircraft;
            document.getElementById("aircraft-details").innerHTML = `
                <p>Aircraft Model: ${aircraftInfo.model}</p>
                <p>Manufacturer: ${aircraftInfo.manufacturer}</p>
                <p>Registration: ${aircraftInfo.registration}</p>
                <p>Airline: ${aircraftInfo.airline_name}</p>
            `;
        })
        .catch(err => console.log(err));
}
