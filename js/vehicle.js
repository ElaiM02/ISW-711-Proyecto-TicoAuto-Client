
const API = "http://localhost:3000/api/vehicle";

window.onload = function(){
getVehicles();
};

// Crear vehículo
async function createVehicle(){

const brand = document.getElementById("brand").value;
const model = document.getElementById("model").value;
const year = document.getElementById("year").value;
const price = document.getElementById("price").value;

const response = await fetch(API, {
method: "POST",
headers: {
"Content-Type": "application/json"
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

const response = await fetch(API);
const vehicles = await response.json();

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
