import config from '../config.js';
import logger from '../logger.js';

const AI_MODES = {
  general: {
    uz: "Siz yordamchi AI assistantsiz. Foydalanuvchi savollariga qisqa, aniq va foydali javob bering. O'zbek, rus va ingliz tillarida javob bera olasiz.",
    ru: "Вы AI-ассистент. Давайте краткие, точные и полезные ответы на вопросы пользователя. Отвечайте на узбекском, русском и английском языках.",
    en: "You are an AI assistant. Provide brief, accurate and helpful answers to user questions. Respond in Uzbek, Russian, and English."
  },
  study: {
    uz: "Siz o'qish yordamchisisiz. Maktab mavzularini oddiy tilda, bosqichma-bosqich tushuntirib bering. Misollar keltiring.",
    ru: "Вы помощник по учёбе. Объясняйте школьные темы простым языком, шаг за шагом. Приводите примеры.",
    en: "You are a study assistant. Explain school topics in simple language, step by step. Provide examples."
  },
  coding: {
    uz: "Siz dasturlash yordamchisisiz. Kodni tushuntiring, xatolarni hal qiling, yaxshi dasturlash amaliyotini tavsiya qiling.",
    ru: "Вы помощник по программированию. Объясняйте код, решайте ошибки, рекомендуйте лучшие практики программирования.",
    en: "You are a coding assistant. Explain code, solve errors, recommend good programming practices."
  },
  translation: {
    uz: "Siz tarjimon yordamchisisiz. Matnni aniq va tabiiy tarjima qiling. Ma'noni va ohangni saqlang.",
    ru: "Вы помощник-переводчик. Переводите текст точно и естественно. Сохраняйте смысл и тон.",
    en: "You are a translation assistant. Translate text accurately and naturally. Preserve meaning and tone."
  },
  writing: {
    uz: "Siz yozish yordamchisisiz. Matn yozishda, tahrirlashda va yaxshilashda yordam bering. Aniq va ravon yozing.",
    ru: "Вы помощник по письму. Помогайте писать, редактировать и улучшать текст. Пишите чётко и плавно.",
    en: "You are a writing assistant. Help write, edit and improve text. Write clearly and fluently."
  },
  creative: {
    uz: "Siz ijodiy yordamchisiz. G'oya berishda yordam bering, ijodiy fikrlar taklif qiling.",
    ru: "Вы творческий помощник. Помогайте с идеями, предлагайте творческие мысли.",
    en: "You are a creative assistant. Help with ideas, suggest creative thoughts."
  }
};

class AIService {
  constructor() {
    this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  }

  getSystemPrompt(mode, language, responseStyle) {
    const basePrompt = AI_MODES[mode]?.[language] || AI_MODES.general[language] || AI_MODES.general.en;
    
    // Simpler style instruction
    const styleNote = responseStyle === 'detailed' 
      ? ' Batafsil tushuntiring.' 
      : ' Qisqa va aniq javob bering.';
    
    return basePrompt + styleNote;
  }

  async chat(messages, mode = 'general', language = 'uz', responseStyle = 'concise') {
    try {
      const systemPrompt = this.getSystemPrompt(mode, language, responseStyle);
      
      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages
      ];

      const requestBody = {
        model: config.openrouter.model,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 2000,
      };

      logger.debug('Sending AI request', { 
        model: config.openrouter.model, 
        messageCount: apiMessages.length 
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.openrouter.timeout);

      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.openrouter.apiKey}`,
            'HTTP-Referer': 'https://github.com/uz-ai-hub',
            'X-Title': 'UZ AI HUB'
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          logger.error('AI API error', null, { 
            status: response.status, 
            statusText: response.statusText,
            body: errorText.substring(0, 200)
          });

          if (response.status === 429) {
            return {
              success: false,
              error: 'rate_limit',
              message: 'AI service rate limit exceeded. Please try again later.'
            };
          }

          if (response.status >= 500) {
            return {
              success: false,
              error: 'server_error',
              message: 'AI service is experiencing issues. Please try again later.'
            };
          }

          return {
            success: false,
            error: 'api_error',
            message: 'Failed to get response from AI service.'
          };
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          logger.error('Invalid AI response structure', null, { data });
          return {
            success: false,
            error: 'invalid_response',
            message: 'Received invalid response from AI service.'
          };
        }

        const content = data.choices[0].message.content;

        if (!content || content.trim().length === 0) {
          logger.warn('AI returned empty content');
          return {
            success: false,
            error: 'empty_response',
            message: 'AI service returned an empty response.'
          };
        }

        logger.debug('AI response received', { 
          length: content.length,
          model: data.model
        });

        return {
          success: true,
          content: content.trim(),
          model: data.model,
          usage: data.usage
        };

      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          logger.error('AI request timeout');
          return {
            success: false,
            error: 'timeout',
            message: 'AI service request timed out.'
          };
        }

        throw fetchError;
      }

    } catch (error) {
      logger.error('AI service error', error);
      return {
        success: false,
        error: 'network_error',
        message: 'Failed to connect to AI service.'
      };
    }
  }

  validateInput(text, maxLength) {
    if (!text || typeof text !== 'string') {
      return { valid: false, error: 'invalid_input' };
    }

    const trimmed = text.trim();
    if (trimmed.length === 0) {
      return { valid: false, error: 'empty_input' };
    }

    if (trimmed.length > maxLength) {
      return { valid: false, error: 'too_long', length: trimmed.length, maxLength };
    }

    return { valid: true, text: trimmed };
  }
}

export default new AIService();
