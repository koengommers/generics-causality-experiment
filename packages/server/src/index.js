import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import knex from 'knex';

import knexfile from '../knexfile';

const db = knex(knexfile);

const app = express();
const port = 8080;

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/', express.static('../client/dist/'))

app.get('/api/submissions/', async (req, res) => {
  const submissions = await db('submissions');
  res.json(submissions);
})

app.post('/api/submissions/', async (req, res) => {
  const { participationId, response } = req.body;
  await db('submissions').insert({
    participationId,
    response
  })
  return res.sendStatus(200);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
