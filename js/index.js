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

function viewVehicle(id) {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
        alert('Debes iniciar sesión para ver el detalle del vehículo');
        window.location.href = 'login.html';
        return;
    }

    window.location.href = `vehicle.html?id=${id}`;
}

async function searchVehicles(){

const brand = document.getElementById("brandFilter").value;
const model = document.getElementById("modelFilter").value;
const minYear = document.getElementById("minYearFilter").value;
const maxYear = document.getElementById("maxYearFilter").value;
const minPrice = document.getElementById("minPriceFilter").value;
const maxPrice = document.getElementById("maxPriceFilter").value;
const status = document.getElementById("statusFilter").value;

let query = [];

if(brand) query.push(`brand=${brand}`);
if(model) query.push(`model=${model}`);
if(minYear) query.push(`minYear=${minYear}`);
if(maxYear) query.push(`maxYear=${maxYear}`);
if(minPrice) query.push(`minPrice=${minPrice}`);
if(maxPrice) query.push(`maxPrice=${maxPrice}`);
if(status) query.push(`status=${status}`);

let url = `${API_BASE}/vehicle`;

if(query.length > 0){
url += "?" + query.join("&");
}

const response = await fetch(url);
const data = await response.json();

renderVehicles(data.data);

}
function clearFilters() {

    document.getElementById("brandFilter").value = "";
    document.getElementById("modelFilter").value = "";
    document.getElementById("minYearFilter").value = "";
    document.getElementById("maxYearFilter").value = "";
    document.getElementById("minPriceFilter").value = "";
    document.getElementById("maxPriceFilter").value = "";
    document.getElementById("statusFilter").value = "";

    // Volver a cargar todos los vehículos
    loadVehicles();
}