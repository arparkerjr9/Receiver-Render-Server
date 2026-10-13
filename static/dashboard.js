async function updateStatus() {
    try {
        const response = await fetch("https://receiver-server-render.onrender.com/status");
        const data = await response.json();

        const box = document.getElementById("statusBox");
        const timestamp = document.getElementById("timestamp");
        const pcname = document.getElementById("pcname");

        if (data.recording) {
            box.style.backgroundColor = "green";
            box.textContent = "Recording";
        } else {
            box.style.backgroundColor = "red";
            box.textContent = "Not Recording";
        }

        timestamp.textContent = "Timestamp: " + (data.timestamp || "--");
        pcname.textContent = "PC: " + (data.pc || "--");

    } catch (err) {
        console.log("Dashboard fetch error:", err);
        const box = document.getElementById("statusBox");
        box.style.backgroundColor = "gray";
        box.textContent = "Error";
    }
}

// Update every second
setInterval(updateStatus, 1000);
updateStatus();
