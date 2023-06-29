const express = require('express');
require("dotenv").config();
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3000;

app.use(express.json());

async function generateCompletion(prompt) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      n: 1
    });

    const { choices } = response.data;
    if (choices && choices.length > 0) {
      const completion = choices[0].text.trim();
      return completion;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle incoming requests to the /convert route
app.post('/convert', async (req, res) => {
  try {
    const { code, fromLanguage, toLanguage } = req.body;

    let prompt;
    if (fromLanguage && toLanguage) {
      prompt = `Convert the following ${fromLanguage} code to ${toLanguage} code:\n${code}`;
    } else {
      prompt = `Convert the following code:\n${code}`;
    }

    const response = await generateCompletion(prompt);
    console.log(response)
    res.json({response});

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Handle incoming requests to the /debug route
app.post('/debug', async (req, res) => {
  try {
    const { code } = req.body;

    const prompt = `Debug the following code: ${code}. Please check if there are any errors and correct them. Also, if it's correct, provide steps explaining what the code is doing and how we can improve it.`;

    const response = await generateCompletion(prompt);

    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Handle incoming requests to the /quality route
app.post('/quality', async (req, res) => {
  try {
    const { code } = req.body;

    const prompt = `Check the quality of the following code: ${code}. Please provide detailed information and also provide some tips to improve, in bullet points.`;

    const response = await generateCompletion(prompt);

    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
