const express = require('express');
const axios = require('axios');

const PORT = 4044;
const app = express();
app.use(express.json());

const USERS_SERVICE = 'http://[::1]:4000/events';
const PERMISSIONS_SERVICE = 'http://[::1]:4001/events';
const QUERY_SERVICE = 'http://[::1]:4040/events';

const handleError = (err) => console.error(err.message)
const events = []

app.post("/events", (req, res) => {
  const event = req.body;
  
  events.push(event);

  axios.post(USERS_SERVICE,         event).catch(handleError);
  axios.post(PERMISSIONS_SERVICE,   event).catch(handleError);
  axios.post(QUERY_SERVICE,         event).catch(handleError);

  res.send({ status: 'OK' })  
})

app.get('/events', (req, res) => {
  res.send(events)  
})

app.listen(PORT, () => {
  console.log(`Event Bus running on port ${PORT}`);
})