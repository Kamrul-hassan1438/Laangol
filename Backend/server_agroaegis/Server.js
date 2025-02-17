const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors'); // Add this line

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); 

process.env.GEMINI_API_KEY = 'API_KEY';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

app.use(bodyParser.json());

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const chatSession = model.startChat({
      generationConfig,
      history:  [{
        
      }
      ],
    });

    const result = await chatSession.sendMessage(question);
    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error generating response');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
