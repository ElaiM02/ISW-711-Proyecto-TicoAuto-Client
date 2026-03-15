const API_BASE= "http://localhost:3008/api";

let vehicles = [];

window.onload = function() {
    getVehicles();
};

async function getVehicles() {
    try {
        const response = await fetch(`${API_BASE}/vehicle`);
        const data = await response.json();
        
        vehicles = data.data;

        renderVehicles(vehicles);

    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los vehículos');
    }
}

function renderVehicles(list) {
    const container = document.getElementById('vehicleContainer');
    let html = '';

    list.forEach(vehicle => {
        html += `
            <div class="vehicle-card">
                <h3>${vehicle.brand} ${vehicle.model}</h3>

                <p><b>Año:</b> ${vehicle.year}</p>
                <p><b>Precio:</b> $${vehicle.price}</p>

                <button onclick="viewVehicle('${vehicle.id}')">Ver Detalle</button>
            </div>
        `;
    });

    container.innerHTML = html;
}

function searchVehicles() {
    const text = document.getElementById('searchInput').value.toLowerCase();

    const filtered = vehicles.filter(v => 
        v.brand.toLowerCase().includes(text) || 
        v.model.toLowerCase().includes(text)
    );

    renderVehicles(filtered);
}
