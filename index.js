const display = document.getElementById("display");
const container = document.getElementById("calculator-container");

function appendToDisplay(input) {
    if (display.value === "Error") display.value = "";
    display.value += input;
    triggerHaptic();
}

function clearDisplay() {
    display.value = "";
    triggerHaptic();
}

function calculate() {
    try {
        // Safe calculation
        const result = new Function('return ' + display.value)();
        display.value = Number.isInteger(result) ? result : result.toFixed(4).replace(/\.?0+$/, "");
    } catch {
        display.value = "Error";
    }
    triggerHaptic();
}

// Visual "Haptic" Feedback
function triggerHaptic() {
    container.style.transition = "transform 0.05s";
    container.style.transform += " scale(0.98)";
    setTimeout(() => {
        container.style.transition = "transform 0.1s ease-out";
        container.style.transform = container.style.transform.replace(" scale(0.98)", "");
    }, 50);
}

// High-Precision 3D Tilt
document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate rotation based on distance from center
    const rotateX = (centerY - y) / 30; // Tilt up/down
    const rotateY = (x - centerX) / 30; // Tilt left/right

    container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.addEventListener("mouseleave", () => {
    container.style.transform = `rotateX(0deg) rotateY(0deg)`;
});
