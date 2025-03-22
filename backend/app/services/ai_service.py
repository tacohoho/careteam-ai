import os
from openai import OpenAI
from typing import List, Dict, Any

# Initialize OpenAI client
# In production, use environment variables for the API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "your-api-key-here"))

class AIService:
    """Service for AI-related functionality using OpenAI API"""
    
    @staticmethod
    async def chat_with_copilot(
        messages: List[Dict[str, str]], 
        patient_context: Dict[str, Any] = None
    ) -> str:
        """
        Chat with the AI copilot
        
        Args:
            messages: List of message objects with role and content
            patient_context: Optional patient data for context
            
        Returns:
            The AI response text
        """
        # Add system message with context if patient data is provided
        system_message = {
            "role": "system",
            "content": "You are a helpful AI assistant for healthcare care team members."
        }
        
        if patient_context:
            system_message["content"] += f" You are assisting with patient {patient_context.get('first_name')} {patient_context.get('last_name')}."
            if patient_context.get('risk_score'):
                system_message["content"] += f" This patient has a risk score of {patient_context.get('risk_score')}."
        
        # Combine system message with user messages
        all_messages = [system_message] + messages
        
        try:
            # Call OpenAI API
            response = client.chat.completions.create(
                model="gpt-4",  # Use appropriate model
                messages=all_messages,
                temperature=0.7,
                max_tokens=800
            )
            
            # Return the response text
            return response.choices[0].message.content
            
        except Exception as e:
            # Log error and return failure message
            print(f"Error calling OpenAI API: {str(e)}")
            return "I'm sorry, I'm having trouble connecting to the AI service right now."
    
    @staticmethod
    async def match_benefits(
        patient_data: Dict[str, Any],
        benefit_criteria: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """
        Match patient to benefits based on eligibility criteria
        
        Args:
            patient_data: Dictionary of patient information
            benefit_criteria: List of benefits with eligibility criteria
            
        Returns:
            List of matched benefits with match scores
        """
        # This is a placeholder for the actual matching logic
        # In a real implementation, this would use more sophisticated matching algorithms
        
        matches = []
        
        for benefit in benefit_criteria:
            # Calculate simple match score (0-100)
            # In reality, this would be more complex and use AI for fuzzy matching
            match_score = 0
            required_criteria_count = 0
            matched_criteria_count = 0
            
            for criterion, value in benefit.get("eligibility_criteria", {}).items():
                required_criteria_count += 1
                
                # Check if patient data has matching criterion
                if criterion in patient_data and patient_data[criterion] == value:
                    matched_criteria_count += 1
            
            # Calculate percentage match
            if required_criteria_count > 0:
                match_score = (matched_criteria_count / required_criteria_count) * 100
            
            # Add to matches if score above threshold
            if match_score > 0:
                matches.append({
                    "benefit": benefit,
                    "match_score": match_score,
                    "matched_criteria": matched_criteria_count,
                    "total_criteria": required_criteria_count
                })
        
        # Sort by match score (highest first)
        matches.sort(key=lambda x: x["match_score"], reverse=True)
        
        return matches 