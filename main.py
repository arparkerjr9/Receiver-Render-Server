from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

app = FastAPI()

# Mount static dashboard
app.mount("/static", StaticFiles(directory="static"), name="static")

# Recording state stored in memory
recording_state = {"recording": False}

@app.post("/update")
async def update_state(data: dict):
    recording_state["recording"] = data.get("recording", False)
    return JSONResponse({"status": "ok"})

@app.get("/status")
async def get_status():
    return recording_state
