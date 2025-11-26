document.addEventListener("submit", function(e) {
    e.preventDefault(); // stop every form reload globally
});

console.log("Auth Script Loaded");

// ELEMENTS
const loginForm = document.getElementById("login-form");
const signinForm = document.getElementById("signin-form");
const API = "https://authentication-backend-d69e.onrender.com"; // <-- CHANGE THIS TO YOUR RENDER URL

//-----------------------------------------------------
// SIGNUP FUNCTION
//-----------------------------------------------------
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        try {
            const res = await fetch(`${API}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();
            alert(data.message);

            if (res.ok) {
                window.location.href = "login.html";
            }

        } catch (err) {
            alert("Error connecting to server");
        }
    });
}


//-----------------------------------------------------
// LOGIN FUNCTION
//-----------------------------------------------------
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const res = await fetch(`${API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            alert(data.message);

            if (res.ok) {
                // Save logged-in user
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href = "index.html";
            }

        } catch (err) {
            alert("Error connecting to server");
        }
    });
}


//-----------------------------------------------------
// CHECK LOGIN (OPTIONAL)
//-----------------------------------------------------
function checkLogin() {
    const user = localStorage.getItem("user");
    if (user) {
        console.log("Logged in:", JSON.parse(user));
    }
}
