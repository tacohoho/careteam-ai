from openai import OpenAI
from typing import List, Dict
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY")
)

class AIService:    
    @staticmethod
    async def chat_with_copilot(
        messages: List[Dict[str, str]], 
    ) -> str:
        system_message = {
            "role": "system",
            "content": "You are Bridget a healthcare and social services benefits co-pilot. Make up mock data for the patient if needed."
        }
        
        all_messages = [system_message] + messages
        
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=all_messages,
                temperature=0.7,
                max_tokens=800
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"Error calling OpenAI API: {str(e)}")
            return "I'm sorry, I'm having trouble connecting to the AI service right now."