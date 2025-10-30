const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const baseMoments = [
  '"Our birth is but a sleep and a forgetting"',
  '"Then in a wailful choir the small gnats mourn Among the river sallows, borne aloft Or sinking as the light wind lives or dies"',
  '"Through caverns measureless to man Down to a sunless sea"'
];

app.post('/generate-image', async (req, res) => {
  try {
    const { additionalPhrases } = req.body;
    
    let
    prompt = 'Abstract oil painting depicting the sublime: ';
    prompt += 'tiny human figures dwarfed by infinite cosmic caverns, ';
    prompt += 'swirling atmospheric clouds suggesting sleep and forgetting, ';
    prompt += 'small flying insects caught in golden twilight winds, ';
    prompt += 'vast underground seas reflecting otherworldly light, ';
    prompt += 'dreamlike landscape merging birth and death, consciousness and void. ';
    prompt += 'Style: Romantic sublime painting like Turner or Friedrich. ';
    prompt += 'Create only visual art with colors, shapes, and forms.';
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard"
    });
    
    res.json({ 
      imageUrl: response.data[0].url,
      phraseCount: baseMoments.length + (additionalPhrases ? additionalPhrases.filter(p => p.trim() !== '').length : 0)
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});