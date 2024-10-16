import {
    inputEnabled,
    setDiv,
    token,
    message,
    enableInput,
    setToken,
    greeting,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showTires } from "./tires.js";

let loginDiv = null;
let email = null;
let password = null;

export const handleLogin = () => {
    loginDiv = document.getElementById("logon-div");
    email = document.getElementById("email");
    password = document.getElementById("password");
    const logonButton = document.getElementById("logon-button");
    const logonCancel = document.getElementById("logon-cancel");

    loginDiv.addEventListener("click", async (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === logonButton) {
                enableInput(false);

                try {
                    const response = await fetch("/api/v1/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: email.value,
                            password: password.value,
                        }),
                    });

                    const data = await response.json();
                    if (response.status === 200) {
                        setToken(data.token);

                        email.value = "";
                        password.value = "";

                        showTires();

                        // call the greeting after the showTires() so that it remains displayed all the time. 
                        greeting.textContent = `${getRandomGreeting()}, ${data.user.name}!`;
                        message.textContent = null;


                    } else {
                        message.textContent = data.msg;
                    }
                } catch (err) {
                    console.error(err);
                    message.textContent = "A communications error occurred.";
                }

                enableInput(true);
            } else if (e.target === logonCancel) {
                email.value = "";
                password.value = "";
                showLoginRegister();

            }
        }
    });
};

// Array of greetings
const greetings = [
    "Hello",
    "Welcome",
    "Greetings",
    "Hi",
    "Good to see you",
    "Hey there",
    "Nice to have you here",
    "Glad you're here",
    "What's up",
    "Howdy",
    "Ahoy",
    "Salutations",
    "Bonjour",
    "Hola",
    "Good day"
];

// Function to get a random greeting
function getRandomGreeting() {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}

export const showLogin = () => {
    email.value = null;
    password.value = null;
    setDiv(loginDiv);
};