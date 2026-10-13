from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# ⭐ REQUIRED: Serve the /static folder
app.mount("/static", StaticFiles(directory="static"), name="static")

recording_state = {
    "recording": False,
    "timestamp": None,
    "pc": None
}

@app.post("/update")
async def update_status(payload: dict):
    recording_state["recording"] = payload.get("recording", False)
    recording_state["timestamp"] = payload.get("timestamp")
    recording_state["pc"] = payload.get("pc")
    return {"status": "ok"}

@app.get("/status")
async def get_status():
    return recording_state

