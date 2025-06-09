const axios = require("axios");
const logger = require("../utils/logger");
const { AppError } = require("../middleware/error.middleware");

class AIService {
  constructor() {
    this.apiKey = process.env.AI_API_KEY;
    this.model = process.env.AI_MODEL || "gpt-4";
    this.baseUrl = "https://api.openai.com/v1/chat/completions";
  }

  async analyzeChat(chatHistory) {
    try {
      logger.info("Starting AI chat analysis");

      const messages = this._prepareMessages(chatHistory);
      const response = await this._makeAIRequest(messages);

      const analysis = this._parseAIResponse(response);
      logger.info("AI analysis completed successfully");

      return analysis;
    } catch (error) {
      logger.error("AI analysis failed:", error);
      throw new AppError("Failed to analyze chat", 500);
    }
  }

  _prepareMessages(chatHistory) {
    const systemPrompt = `You are an AI assistant conducting an initial psychological assessment. 
    Analyze the conversation and identify:
    1. Main concerns and symptoms
    2. Severity level (mild, moderate, severe)
    3. Recommended therapist specializations
    4. Any immediate risks or concerns
    
    Format your response as a JSON object with these fields.`;

    return [
      { role: "system", content: systemPrompt },
      ...chatHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];
  }

  async _makeAIRequest(messages) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error(
        "AI API request failed:",
        error.response?.data || error.message
      );
      throw new AppError("Failed to get AI analysis", 500);
    }
  }

  _parseAIResponse(response) {
    try {
      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      logger.error("Failed to parse AI response:", error);
      throw new AppError("Invalid AI response format", 500);
    }
  }

  async generateTherapistRecommendations(analysis) {
    try {
      logger.info("Generating therapist recommendations");

      const messages = [
        {
          role: "system",
          content: `Based on the following assessment, recommend the most suitable therapist specializations and qualifications.
          Consider the client's needs, severity level, and cultural background.
          Format your response as a JSON array of recommended specializations.`,
        },
        {
          role: "user",
          content: JSON.stringify(analysis),
        },
      ];

      const response = await this._makeAIRequest(messages);
      const recommendations = this._parseAIResponse(response);

      logger.info("Therapist recommendations generated successfully");
      return recommendations;
    } catch (error) {
      logger.error("Failed to generate therapist recommendations:", error);
      throw new AppError("Failed to generate recommendations", 500);
    }
  }
}

module.exports = new AIService();
