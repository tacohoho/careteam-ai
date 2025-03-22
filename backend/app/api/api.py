from fastapi import APIRouter

# Create main API router
api_router = APIRouter()

# Import and include other routers here
# from app.api.endpoints import patients
# from app.api.endpoints import benefits
# from app.api.endpoints import ai

# Add routers
# api_router.include_router(patients.router, prefix="/patients", tags=["patients"])
# api_router.include_router(benefits.router, prefix="/benefits", tags=["benefits"])
# api_router.include_router(ai.router, prefix="/ai", tags=["ai"])

# Placeholder route
@api_router.get("/status")
async def get_status():
    return {"status": "API is operational"} 