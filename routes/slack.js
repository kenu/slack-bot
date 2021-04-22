const express = require('express');
const router = express.Router();
const actions = require('../services/actions');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Slack Bot' });
});

router.post('/', async function (req, res, next) {
  const stats = actions['cluster']();
  await actions.sendToSlack(getData(stats));
  send(res, 'ok');
});

router.post('/okdevot', async (req, res, next) => {
  const key = (req.body) ? req.body.text : '';
  const actionKey = actions.translate(key);
  const action = actions[actionKey];
  let result = (typeof action === 'function') ? await action() : '🤖Hmm... but don’t panic!';
  send(res, result);
});

function getData(body) {
  return {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": body
        }
      },
    ]
  };
}

function send(res, data) {
  res.set('Content-Type', 'application/json');
  res.json(data);
}

module.exports = router;
