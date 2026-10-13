from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Serve /static
app.mount("/static", StaticFiles(directory="static"), name="static")

# Store status per PC
recording_state = {}  # { pc_name: { "recording": bool, "timestamp": str } }

@app.post("/update")
async def update_status(payload: dict):
    pc = payload.get("pc")
    if not pc:
        return {"status": "error", "detail": "pc field required"}

    recording_state[pc] = {
        "recording": payload.get("recording", False),
        "timestamp": payload.get("timestamp"),
    }
    return {"status": "ok"}

@app.get("/status")
async def get_status():
    return recording_state

