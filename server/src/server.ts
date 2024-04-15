import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import fetch from 'cross-fetch';

import { createServer } from 'http';

import { WebSocketTransport } from '@colyseus/ws-transport';
import { StateHandlerRoom } from './rooms/StateHandlerRoom';
import { Server } from 'colyseus';
import { MonitorOptions, monitor } from '@colyseus/monitor';

dotenv.config({ path: '../.env' });

const app = express();
const router = express.Router();
const port = 3001;

const server = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
  }),
});

server.define('rng_room', StateHandlerRoom).filterBy(['channelId']);

router.get('/api/ping', (req: Request, res: Response) => {
  res.send('hello');
});

router.post('/api/token', async (req: Request, res: Response) => {
  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = (await response.json()) as { access_token: string };

  // Return the access_token to our client as { access_token: "..."}
  res.send({ access_token });
});

router.use('/api/colyseus', monitor(server as Partial<MonitorOptions>));

// Allow express to parse JSON bodies
app.use(express.json());
app.use(router);

server.listen(port).then(() => {
  console.log(`Server listening at http://localhost:${port}`);
});
