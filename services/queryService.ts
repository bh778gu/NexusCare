// services/queryService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/query';

export const fetchAnswer = async (question: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, { question });
    return response.data.answer;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Failed to retrieve answer.';
  }
};