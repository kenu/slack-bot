const sheetdb = require('../lib/sheetdb');

const axios = require('axios');
const express = require('express');
const NumberUtils = require('../common/NumberUtils');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Cluster Stats' });
});

async function sendToJandi(data) {
  const config = {
    headers: {
      'Accept': 'application/vnd.tosslab.jandi-v2+json',
      'Content-Type': 'application/json'
    }
  }
  return await axios.post(process.env.JANDI_WEBHOOK, data, config);
}

router.post('/', async function (req, res, next) {
  const info = { sheetId: process.env.SHEET_ID, id: process.env.SHEET_GID };
  const sheet = await sheetdb.getSheet(info);
  await sheet.loadCells('B2:D4');
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${process.env.SHEET_ID}/edit#gid=${process.env.SHEET_GID}`
  const stats =
    '[[현황 link]](' + sheetUrl + ')'
    + '\n' + sheet.getCell(2, 1).value + ': ' + sheet.getCell(2, 2).value + '/' + sheet.getCell(2, 3).value
    + '\n' + sheet.getCell(3, 1).value + ': ' + sheet.getCell(3, 2).value + '/' + sheet.getCell(3, 3).value;
  console.log(stats);

  const data = {
    'body': stats,
    "connectColor": "#FAC11B",
    "connectInfo": []
  };
  console.log(req.body);
  const result = await sendToJandi(data);
  res.set('Accept', 'application/vnd.tosslab.jandi-v2+json');
  res.set('Content-Type', 'application/json');

  res.json('ok');
});

router.get('/lotto645', (req, res, next) => {
  res.set('Accept', 'application/vnd.tosslab.jandi-v2+json');
  res.set('Content-Type', 'application/json');
  const list = NumberUtils.getRandomList(45, 6);
  res.json(list);
});

module.exports = router;
