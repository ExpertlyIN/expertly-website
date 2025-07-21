import hashlib
import time
from datetime import datetime, timedelta
from cryptography.fernet import Fernet

class DCVVEngine:
    def __init__(self):
        self.secret = b"demo_dcvv_secret_key_123"  # Demo-only static key

    def generate_dynamic_cvv(self, card_number: str, expiry: str) -> dict:
        # Use current 30-second window for CVV rotation
        now = int(time.time())
        window = now // 30
        data = f"{card_number}{expiry}{window}{self.secret}".encode()
        cvv_hash = hashlib.sha256(data).hexdigest()
        cvv = cvv_hash[:3]
        expires_at = (window + 1) * 30
        rotation_id = hashlib.md5(f"{card_number}{window}".encode()).hexdigest()
        return {
            "cvv": cvv,
            "expires_at": expires_at,
            "rotation_id": rotation_id,
            "demo_mode": True,
            "watermark": "DEMO ONLY"
        }

    def validate_cvv(self, card_number: str, expiry: str, cvv: str, amount: float) -> dict:
        # Check current and previous window for tolerance
        now = int(time.time())
        windows = [now // 30, (now // 30) - 1]
        valid = False
        for window in windows:
            data = f"{card_number}{expiry}{window}{self.secret}".encode()
            cvv_hash = hashlib.sha256(data).hexdigest()
            if cvv == cvv_hash[:3]:
                valid = True
                break
        # Simple fraud detection: high amount, repeated failures, etc.
        fraud_indicators = []
        if amount > 300:
            fraud_indicators.append("High amount")
        risk_score = self.calculate_risk_score({"amount": amount, "valid": valid})
        return {
            "valid": valid,
            "risk_score": risk_score,
            "fraud_indicators": fraud_indicators,
            "demo_mode": True,
            "watermark": "DEMO ONLY"
        }

    def calculate_risk_score(self, transaction_data: dict) -> float:
        # Demo risk: higher for high amounts or invalid CVV
        base = 0.2
        if not transaction_data.get("valid", True):
            base += 0.5
        if transaction_data.get("amount", 0) > 300:
            base += 0.2
        return min(base, 1.0) 