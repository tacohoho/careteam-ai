import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base
from app.models import Patient, Benefit, Member  # Import Member model as well

# Import routers directly
from app.api.endpoints.members import router as members_router
from app.api.endpoints.auth import router as auth_router

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Care Team AI",
    description="AI-powered application for care team benefits navigation",
    version="0.1.0",
)

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3009"],  # React frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API status route
@app.get("/api/status")
async def get_status():
    return {"status": "API is operational"}

# Include routers 
app.include_router(members_router, prefix="/api/members", tags=["members"])
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Care Team AI API",
        "status": "online",
        "version": "0.1.0",
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Run the application
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
