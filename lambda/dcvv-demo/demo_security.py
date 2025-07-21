import uuid
from datetime import datetime, timedelta
from typing import Dict, Optional

class DemoSessionManager:
    def __init__(self):
        self.sessions: Dict[str, dict] = {}
        self.session_duration = timedelta(minutes=15)

    def create_session(self) -> dict:
        self.cleanup_expired_sessions()
        session_id = str(uuid.uuid4())
        now = datetime.utcnow()
        session = {
            "id": session_id,
            "created_at": now,
            "expires_at": now + self.session_duration,
            "cards": self.get_demo_cards(),
            "activity_log": [],
            "demo_mode": True,
            "watermark": "DEMO ONLY"
        }
        self.sessions[session_id] = session
        return session

    def get_demo_cards(self) -> list:
        return [
            {
                "number": "4111111111111111",
                "name": "Demo User",
                "expiry": "12/25",
                "type": "Visa Test"
            },
            {
                "number": "5555555555554444",
                "name": "Jane Demo",
                "expiry": "06/27",
                "type": "Mastercard Test"
            }
        ]

    def cleanup_expired_sessions(self):
        now = datetime.utcnow()
        expired = [sid for sid, s in self.sessions.items() if s["expires_at"] < now]
        for sid in expired:
            del self.sessions[sid] 