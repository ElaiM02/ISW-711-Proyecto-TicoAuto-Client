const API_BASE = "http://localhost:3008/api";

window.onload = function () {
    getVehicles();
};

// Obtener vehículos
async function getVehicles() {

    const token = sessionStorage.getItem("authToken");

    const response = await fetch(`${API_BASE}/vehicle`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const result = await response.json();
    const vehicles = result.data;

    let html = "";

    vehicles.forEach(v => {

        html += `
        <tr>
            <td>${v.brand}</td>
            <td>${v.model}</td>
            <td>${v.year}</td>
            <td>${v.price}</td>
            <td>
                <button onclick="viewVehicle('${v._id}')">
                    Ver Detalle
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("vehicleList").innerHTML = html;
}


function viewVehicle(id) {
    window.location.href = `VehicleDetail.html?id=${id}`;
}