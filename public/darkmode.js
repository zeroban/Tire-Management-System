document.addEventListener("DOMContentLoaded", () => {
    const darkModeButton = document.getElementById("toggleDarkMode");

    if (!darkModeButton) {
        console.error("Toggle button not found!");
        return;
    }

    // Ensure NightOwl is available
    if (!window.NightOwl) {
        console.error("NightOwl is not available.");
        return;
    }

    let isDarkMode = false;

    darkModeButton.addEventListener("click", () => {
        // Toggle dark mode
        if (isDarkMode) {
            window.NightOwl.disable(); // Access NightOwl from the global scope
        } else {
            window.NightOwl.enable();
        }
        isDarkMode = !isDarkMode;
    });
});
