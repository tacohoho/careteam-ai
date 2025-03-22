from fastapi import APIRouter, HTTPException
from typing import List, Dict
from pydantic import BaseModel
from app.services.ai_service import AIService

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]

router = APIRouter()
ai_service = AIService()

@router.post("/ai/chat")
async def chat(request: ChatRequest):

    try:
        response = await ai_service.chat_with_copilot(request.messages)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 