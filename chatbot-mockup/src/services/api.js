import { config, mockData } from '../config';

function parseApiResponse(responseText) {
  // Extract PlantUML code
  const plantumlMatch = responseText.match(/```plantuml\s*([\s\S]*?)```/);
  const pumlCode = plantumlMatch ? plantumlMatch[1].trim() : '';

  // Extract summary
  const summaryMatch = responseText.match(/### Summary\s*([\s\S]*)/);
  const summary = summaryMatch ? summaryMatch[1].trim() : '';

  return {
    message: 'Here is the class diagram in PlantUML format:',
    umlDiagram: '/sample-uml.svg', // or dynamically generate if you have a PlantUML server
    pumlCode,
    summary,
  };
}

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
      // Use .text() instead of .json()
      const text = await response.text();
      return parseApiResponse(text);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      throw error;
    }
  },
};
