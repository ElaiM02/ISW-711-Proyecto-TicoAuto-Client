
const API_BASE = "http://localhost:3008/api";

window.onload = function(){
getVehicles();
};

// Crear vehículo
async function createVehicle(){

const brand = document.getElementById("brand").value;
const model = document.getElementById("model").value;
const year = document.getElementById("year").value;
const price = document.getElementById("price").value;

const token = sessionStorage.getItem("authToken");

const response = await fetch(`${API_BASE}/vehicle`, {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${token}`
},
body: JSON.stringify({
brand,
model,
year,
price
})
});

if(response.ok){

alert("Vehículo guardado correctamente");

document.getElementById("brand").value="";
document.getElementById("model").value="";
document.getElementById("year").value="";
document.getElementById("price").value="";

getVehicles();

}else{

alert("No se pudo crear el vehículo");

}

}


// Obtener vehículos
async function getVehicles(){

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
</tr>
`;

});

document.getElementById("vehicleList").innerHTML = html;

}
