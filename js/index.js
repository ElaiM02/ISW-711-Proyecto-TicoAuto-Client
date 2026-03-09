const token = sessionStorage.getItem("authToken");
        const email = sessionStorage.getItem("userEmail");

        if (!token) {
            window.location.href = "login.html";
        }

        document.getElementById("status").textContent = "Sesión iniciada correctamente";
        document.getElementById("email").textContent = "Usuario: " + email;

        function logout() {

            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("userEmail");

            window.location.href = "login.html";
        }