const sheetdb = require('../lib/sheetdb');

const axios = require('axios');
const express = require('express');
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
    '[[현황]](' + sheetUrl + ')'
    + '\n' + sheet.getCell(2, 1).value + ': ' + sheet.getCell(2, 2).value + '/' + sheet.getCell(2, 3).value
    + '\n' + sheet.getCell(3, 1).value + ': ' + sheet.getCell(3, 2).value + '/' + sheet.getCell(3, 3).value;
  console.log(stats);

  const data = {
    // "body": "[[Pizza42]](http://url_to_text) You have a new Pizza order.",
    'body': stats,
    "connectColor": "#FAC11B",
    "connectInfo": []
  };
  //   {
  //     "title": "클러스터 현황",
  //     "description": stats
  //   },
  //   {
  //     "title": "Location",
  //     "description": "클러스트 현황",
  //     "imageUrl": "https://docs.google.com/spreadsheets/d/1uTqbUrHSiJghMijBqrcFG7FxkcdZTUYWhuD4s2jopT8/edit#gid=171439896"
  //   }]
  // };
  console.log(req.body);
  const result = await sendToJandi(data);
  console.log(result);
  res.set('Accept_', 'application/vnd.tosslab.jandi-v2+json');
  res.set('Content-Type', 'application/json');

  res.json('ok');
});


module.exports = router;
