async function updateStatus() {
    try {
        const response = await fetch("https://receiver-server-render.onrender.com/status");
        const data = await response.json();

        const container = document.getElementById("pcContainer");
        container.innerHTML = "";

        const pcNames = Object.keys(data);
        if (pcNames.length === 0) {
            container.textContent = "No PCs have reported yet.";
            return;
        }

        pcNames.forEach(pc => {
            const info = data[pc];

            const card = document.createElement("div");
            card.className = "pcCard";

            const nameEl = document.createElement("div");
            nameEl.className = "pcName";
            nameEl.textContent = pc;

            const statusEl = document.createElement("div");
            statusEl.className = "pcStatus";

            const tsEl = document.createElement("div");
            tsEl.className = "pcTimestamp";
            tsEl.textContent = "Timestamp: " + (info.timestamp || "--");

            if (info.recording) {
                card.style.backgroundColor = "green";
                statusEl.textContent = "Recording";
            } else {
                card.style.backgroundColor = "red";
                statusEl.textContent = "Not Recording";
            }

            card.appendChild(nameEl);
            card.appendChild(statusEl);
            card.appendChild(tsEl);

            container.appendChild(card);
        });

    } catch (err) {
        console.log("Dashboard fetch error:", err);
        const container = document.getElementById("pcContainer");
        container.textContent = "Error loading status.";
    }
}

setInterval(updateStatus, 1000);
updateStatus();

