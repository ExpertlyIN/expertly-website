from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from mangum import Mangum
import logging
from dcvv_engine import DCVVEngine
from demo_security import DemoSessionManager
from datetime import datetime

app = FastAPI(title="DCVV Demo API", version="1.0.0")
handler = Mangum(app)
logging.basicConfig(level=logging.INFO)

dcvv_engine = DCVVEngine()
session_manager = DemoSessionManager()

class CVVGenerateRequest(BaseModel):
    session_id: str
    card_number: str
    expiry: str

class CVVValidateRequest(BaseModel):
    session_id: str
    card_number: str
    expiry: str
    cvv: str
    amount: float

@app.post("/demo/start-session")
async def start_demo_session():
    session = session_manager.create_session()
    return {
        "session_id": session["id"],
        "cards": session["cards"],
        "expires_at": session["expires_at"],
        "demo_mode": True,
        "watermark": "DEMO ONLY"
    }

@app.post("/demo/cvv/generate")
async def generate_dynamic_cvv(request: CVVGenerateRequest):
    session = session_manager.sessions.get(request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found (DEMO MODE)")
    card = next((c for c in session["cards"] if c["number"] == request.card_number and c["expiry"] == request.expiry), None)
    if not card:
        raise HTTPException(status_code=400, detail="Card not found in session (DEMO MODE)")
    result = dcvv_engine.generate_dynamic_cvv(request.card_number, request.expiry)
    session["activity_log"].append({
        "event": "cvv_generated",
        "timestamp": datetime.utcnow(),
        "card": request.card_number
    })
    return {**result, "demo_mode": True, "watermark": "DEMO ONLY"}

@app.post("/demo/cvv/validate")
async def validate_cvv(request: CVVValidateRequest):
    session = session_manager.sessions.get(request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found (DEMO MODE)")
    card = next((c for c in session["cards"] if c["number"] == request.card_number and c["expiry"] == request.expiry), None)
    if not card:
        raise HTTPException(status_code=400, detail="Card not found in session (DEMO MODE)")
    result = dcvv_engine.validate_cvv(request.card_number, request.expiry, request.cvv, request.amount)
    session["activity_log"].append({
        "event": "cvv_validated",
        "timestamp": datetime.utcnow(),
        "card": request.card_number,
        "amount": request.amount,
        "result": result
    })
    return {**result, "demo_mode": True, "watermark": "DEMO ONLY"}

@app.get("/demo/analytics")
async def get_demo_analytics(session_id: str):
    session = session_manager.sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found (DEMO MODE)")
    log = session["activity_log"]
    cvv_gen_count = sum(1 for e in log if e["event"] == "cvv_generated")
    cvv_val_count = sum(1 for e in log if e["event"] == "cvv_validated")
    val_success = sum(1 for e in log if e["event"] == "cvv_validated" and e["result"]["valid"])
    val_fail = cvv_val_count - val_success
    avg_risk = (sum(e["result"]["risk_score"] for e in log if e["event"] == "cvv_validated") / cvv_val_count) if cvv_val_count else 0.0
    return {
        "cvv_generation_count": cvv_gen_count,
        "validation_success": val_success,
        "validation_failure": val_fail,
        "average_risk_score": avg_risk,
        "demo_mode": True,
        "watermark": "DEMO ONLY"
    }

@app.get("/demo/session/{session_id}")
async def get_session_status(session_id: str):
    session = session_manager.sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found (DEMO MODE)")
    now = datetime.utcnow()
    expires_in = (session["expires_at"] - now).total_seconds()
    session_manager.cleanup_expired_sessions()
    return {
        "session_id": session_id,
        "expires_in_seconds": max(0, int(expires_in)),
        "activity_log": session["activity_log"],
        "demo_mode": True,
        "watermark": "DEMO ONLY"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "mode": "DEMO", "demo_mode": True, "watermark": "DEMO ONLY"}

@app.middleware("http")
async def add_demo_mode_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Demo-Mode"] = "true"
    return response 