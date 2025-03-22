import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const aiService = {
  async chatWithAI(messages: Message[]) {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/chat`, {
        messages
      });
      return response.data.response;
    } catch (error) {
      console.error('Error calling AI chat:', error);
      throw error;
    }
  }
}; 