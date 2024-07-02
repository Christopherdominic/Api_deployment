const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Visitor';
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    const latitude = 40.7128; // Latitude for New York
    const longitude = -74.0060; // Longitude for New York
    const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
    
    // Assuming we want the current temperature (first entry)
    const temperature = weatherResponse.data.hourly.temperature_2m[0];

    res.json({
      client_ip: clientIp,
      location: 'New York',
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in New York`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

