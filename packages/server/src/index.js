import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import knex from 'knex';
import basicAuth from 'express-basic-auth';
import { parse as json2csv } from 'json2csv';
import dotenv from 'dotenv';

import knexfile from '../knexfile';

const db = knex(knexfile[process.env.NODE_ENV || 'development']);

dotenv.config()

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.set('views', 'templates');
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);

app.use('/', express.static('../client/dist/'))

app.get('/survey/introduction', async (req, res) => {
  res.render('introduction.html');
});

app.get('/survey/finish', async (req, res) => {
  res.render('finish.html');
});

app.get('/survey/finish/:completionCode', async (req, res) => {
  res.render('finish.html', { completionCode: req.params.completionCode });
});

app.get('/survey/question/:id', async (req, res) => {
  const questions = [{
    template: 'generic.html',
    context: {
      question: 'Naple trees are small.'
    }
  }, {
    template: 'generic.html',
    context: {
      question: 'Trucks are gold.'
    }
  }, {
    template: 'generic.html',
    context: {
      question: 'Wooden houses have polka dots on the roof.'
    }
  }, {
    template: 'generic.html',
    context: {
      question: 'Men are blue skinned.'
    }
  }, {
    template: 'generic.html',
    context: {
      question: 'There are naple trees that are small.'
    }
  }, {
    template: 'generic.html',
    context: {
      question: 'There are trucks that are gold.'
    }
  }, {
    template: 'generic.html',
    context: {
      question: 'There are brick houses with polka dots on the roof.'
    }
  }, {
    template: 'generic.html',
    context: {
      question: 'There are women that are blue skinned.'
    }
  }, {
    template: 'proportion.html',
    context: {
      question: 'What proportion of the men do you think are blue?'
    }
  }, {
    template: 'proportion.html',
    context: {
      question: 'What proportion of the wooden houses do you think have polka dots?'
    }
  }, {
    template: 'proportion.html',
    context: {
      question: 'What proportion of the truce trees do you think are small?'
    }
  }, {
    template: 'proportion.html',
    context: {
      question: 'What proportion of the cars do you think are gold?'
    }
  }, {
    template: 'feedback.html'
  }, {
    template: 'attention.html'
  }];
  const question = questions[req.params.id-1];
  res.render(question.template, {
    index: req.query.index ? parseInt(req.query.index) : parseInt(req.params.id),
    length: questions.length,
    ...question.context
  });
});

app.get('/survey/submissions/', (req, res) => {
  res.render('submissions.html');
});

app.get('/survey/submissions/download', basicAuth({ users: { 'admin': process.env.ADMIN_PASS }}), async (req, res) => {
  const submissions = await db('submissions');
  const csv = json2csv(submissions);
  const date = new Date();
  const downloadTime = `${date.toISOString().split('T')[0]}-${date.getUTCHours()}h${date.getUTCMinutes()}`;
  res.attachment(`submissions-${downloadTime}.csv`)
  res.send(csv);
});

app.post('/survey/submissions/', async (req, res) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let completionCode;
  if (participationId) {
    completionCode = '';
    for (let i = 8; i > 0; i--) {
      completionCode += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  const { participationId, responses, duration } = req.body;
  const submission = {
    ...responses,
    participationId,
    completionCode,
    duration
  }
  await db('submissions').insert(submission);
  return res.json({ completionCode });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
