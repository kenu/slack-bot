// https://www.npmjs.com/package/google-spreadsheet
// https://okdevtv.com/mib/google/sheets
const { GoogleSpreadsheet } = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL
const sheetdb = {
  getSheet: async function (info) {
    const doc = new GoogleSpreadsheet(info.sheetId);
    const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n');
    console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    await doc.loadInfo(); // loads document properties and worksheets

    // const sheet = doc.sheetsByIndex[info.index];
    const sheet = doc.sheetsById[info.id]; // or use doc.sheetsById[id]
    return sheet;
  }
}

module.exports = sheetdb;
