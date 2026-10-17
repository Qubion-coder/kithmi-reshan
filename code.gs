/**
 * Kithmi & Reshan — RSVP and Wishes collector
 * Sheet: https://docs.google.com/spreadsheets/d/1O5DCwY-n0cFJlGNm-WwP7sHOWD9TPP5ymqD5FXIp2r0/edit
 *
 * Creates two tabs automatically (with headers) the first time they are needed:
 *   - "RSVP"   : Submitted At | Guest Name | Attending | Source
 *   - "Wishes" : Submitted At | Name | Message | Source
 */

var SPREADSHEET_ID = '1O5DCwY-n0cFJlGNm-WwP7sHOWD9TPP5ymqD5FXIp2r0';
var TIMEZONE = 'Asia/Colombo';

var SHEETS = {
  rsvp: {
    name: 'RSVP',
    headers: ['Submitted At', 'Guest Name', 'Attending', 'Source'],
    widths: [170, 260, 140, 140],
    color: '#eb81a9', // dusty pink
  },
  wish: {
    name: 'Wishes',
    headers: ['Submitted At', 'Name', 'Message', 'Source'],
    widths: [170, 220, 520, 140],
    color: '#97aa6a', // green
  },
};

function doGet() {
  return ContentService.createTextOutput('Kithmi & Reshan wedding script is running. Send a POST request to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    var body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var payload = JSON.parse(body);
    var formType = String(payload.formType || '').toLowerCase();
    var config = SHEETS[formType];

    if (!config) {
      throw new Error('Invalid formType. Expected "rsvp" or "wish".');
    }

    var sheet = getOrCreateSheet_(config);
    var submittedAt = Utilities.formatDate(
      payload.submittedAt ? new Date(payload.submittedAt) : new Date(),
      TIMEZONE,
      'yyyy-MM-dd HH:mm:ss'
    );
    var source = clean_(payload.source || 'wedding-site');

    if (formType === 'rsvp') {
      var attending = String(payload.attending || '').toLowerCase() === 'yes' ? 'Yes' : 'No';
      sheet.appendRow([submittedAt, clean_(payload.name), attending, source]);
    } else {
      sheet.appendRow([submittedAt, clean_(payload.name), clean_(payload.message), source]);
    }

    return json_({ success: true });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Run once from the editor to create both tabs up front (optional). */
function setupSheets() {
  getOrCreateSheet_(SHEETS.rsvp);
  getOrCreateSheet_(SHEETS.wish);
}

function getOrCreateSheet_(config) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(config.name) || ss.insertSheet(config.name);

  if (sheet.getLastRow() === 0) {
    var header = sheet.getRange(1, 1, 1, config.headers.length);
    header.setValues([config.headers])
      .setFontWeight('bold')
      .setFontColor('#ffffff')
      .setBackground(config.color)
      .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    for (var i = 0; i < config.widths.length; i++) {
      sheet.setColumnWidth(i + 1, config.widths[i]);
    }
    sheet.getRange('A:A').setNumberFormat('@'); // keep timestamps as text
    sheet.getRange(1, 1, sheet.getMaxRows(), config.headers.length).setWrap(true).setVerticalAlignment('top');
  }

  return sheet;
}

/** Prevent spreadsheet formula injection and trim long input. */
function clean_(value) {
  var text = String(value == null ? '' : value).trim().slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
