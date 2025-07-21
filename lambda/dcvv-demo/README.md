# DCVV Demo Lambda Container

This project demonstrates Dynamic CVV (DCVV) technology using AWS Lambda containers and FastAPI. **DEMO MODE ONLY** — all data is safe and for demonstration purposes.

## Features
- Real time-based dynamic CVV generation and validation
- Fraud detection and risk scoring
- 15-minute session management (in-memory only)
- Real-time analytics and CVV rotation
- Safe test card data only

## Usage
1. Build the Docker image:
   ```sh
   docker build -t dcvv-demo .
   ```
2. Run locally (for testing):
   ```sh
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```
3. Deploy to AWS Lambda using the provided Dockerfile and deployment config.

## Endpoints
- `/demo/start-session` — Start a new demo session
- `/demo/cvv/generate` — Generate a dynamic CVV
- `/demo/cvv/validate` — Validate a CVV and get risk score
- `/demo/analytics` — Get real-time analytics
- `/demo/session/{session_id}` — Get session status
- `/health` — Health check

## Security
- **Demo mode only**: No real card data, no persistence, no real transactions.
- All responses include `demo_mode: true` and clear demo indicators. 