const API_BASE = "http://localhost:3008/api";

let vehicleId = null;
let ownerId = null;

window.onload = function () {

    const params = new URLSearchParams(window.location.search);
    vehicleId = params.get("id");

    if (!vehicleId) {
        document.getElementById("vehicleDetail").innerHTML = "No hay ID";
        return;
    }

    loadVehicle(vehicleId);
    loadQuestions();
};

function getUserIdFromToken() {
    const token = sessionStorage.getItem("authToken");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id || payload.userId;
}

async function loadVehicle(id) {

    const token = sessionStorage.getItem("authToken");

    const headers = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}/vehicle/${id}`, {
        headers
    });

    const data = await response.json();
    const v = data.data || data;

    ownerId = v.owner?._id || v.owner;

    document.getElementById("vehicleDetail").innerHTML = `
    <img src="http://localhost:3008/upload/${v.image}" />

    <h2>${v.brand} ${v.model}</h2>
    <p><b>Año:</b> ${v.year}</p>
    <p><b>Precio:</b> $${v.price}</p>
    <p>${v.description || "Sin descripción"}</p>
`;
}

async function loadQuestions() {
    try {
        const response = await fetch(`${API_BASE}/question/${vehicleId}`);
        const questions = await response.json();

        const container = document.getElementById("questionList");

        const userId = getUserIdFromToken();

        let html = "";

        questions.forEach(q => {

            html += `
                <div class="question-card">
                    <p><b>${q.user?.name || "Usuario"}:</b> ${q.question}</p>
            `;

            if (q.answer) {
                html += `
                    <div class="answer"><b>Respuesta:</b> ${q.answer.answer}</div>
                `;
            }

            if (!q.answer && userId && ownerId === userId) {
                html += `
                    <textarea id="answer-${q._id}" placeholder="Responder..."></textarea>
                    <button onclick="createAnswer('${q._id}')">Responder</button>
                `;
            }

            html += `</div>`;
        });

        container.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

async function createQuestion() {

    const token = sessionStorage.getItem("authToken");

    if (!token) {
        alert("Debes iniciar sesión para preguntar");
        return;
    }

    const question = document.getElementById("questionInput").value;

    const response = await fetch(`${API_BASE}/question/${vehicleId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ question })
    });

    const data = await response.json();

    alert(data.message);

    document.getElementById("questionInput").value = "";

    loadQuestions();
}

async function createAnswer(questionId) {

    const token = sessionStorage.getItem("authToken");

    if (!token) {
        alert("Debes iniciar sesión");
        return;
    }

    const answer = document.getElementById(`answer-${questionId}`).value;

    const response = await fetch(`${API_BASE}/answer/${questionId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ answer })
    });

    const data = await response.json();

    alert(data.message);

    loadQuestions();
}