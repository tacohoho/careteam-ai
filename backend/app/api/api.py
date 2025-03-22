from fastapi import APIRouter

# Create main API router
api_router = APIRouter()

# Import routers
from app.api.endpoints.members import router as members_router

# Add routers
api_router.include_router(members_router, prefix="/members", tags=["members"])

# Placeholder route for API status
@api_router.get("/status")
async def get_status():
    return {"status": "API is operational"} 