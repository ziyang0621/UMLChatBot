import { config, mockData } from '../config';

export const apiService = {
  async getChatResponse(input) {
    if (config.useMockData) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockData.chatResponse;
    }

    try {
      const response = await fetch(
        `${config.apiBaseUrl}${
          config.endpoints.chat
        }?input=${encodeURIComponent(input)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching chat response:', error);
      throw error;
    }
  },
};
