/**
 * SLIDE DESIGN CHALLENGE — Google Apps Script backend
 *
 * 1. Create a Google Sheet for the leaderboard.
 * 2. Extensions > Apps Script.
 * 3. Replace the default Code.gs with this file.
 * 4. Create an HTML file named Index and paste index.html into it.
 * 5. In Code.gs, paste your Sheet ID below.
 * 6. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 7. Embed the resulting /exec URL in Google Sites.
 */

const SPREADSHEET_ID = '1IWqqdBpHyjmI1se_gronjDaJrab1topVzJjj5-oslqE';
const SHEET_NAME = 'Leaderboard';
const MAX_LEADERBOARD_ROWS = 50;

function doGet() {
  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Slide Design Challenge')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function setupLeaderboard() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  sheet.getRange(1, 1, 1, 5).setValues([[
    'Timestamp',
    'Student',
    'Score',
    'Time (seconds)',
    'Rounds'
  ]]);

  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 5);

  return 'Leaderboard ready.';
}

function submitScore(student, score, totalTime) {
  student = String(student || 'Player')
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 20);

  score = Number(score);
  totalTime = Number(totalTime);

  if (!student) student = 'Player';
  if (!Number.isFinite(score) || score < 0) {
    throw new Error('Invalid score.');
  }
  if (!Number.isFinite(totalTime) || totalTime < 0) {
    throw new Error('Invalid time.');
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    setupLeaderboard();
    sheet = ss.getSheetByName(SHEET_NAME);
  }

  sheet.appendRow([
    new Date(),
    student,
    Math.round(score),
    Math.round(totalTime * 10) / 10,
    25
  ]);

  return getLeaderboard();
}

function getLeaderboard() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet || sheet.getLastRow() < 2) {
    return [];
  }

  const values = sheet
    .getRange(2, 1, sheet.getLastRow() - 1, 5)
    .getValues();

  return values
    .filter(row => row[1] && Number.isFinite(Number(row[2])))
    .map(row => ({
      student: String(row[1]),
      score: Number(row[2]),
      time: Number(row[3])
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.time - b.time;
    })
    .slice(0, MAX_LEADERBOARD_ROWS);
}

/**
 * Optional teacher utility:
 * Run clearLeaderboard() manually if you want to start a new class/semester.
 */
function clearLeaderboard() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (sheet && sheet.getLastRow() > 1) {
    sheet
      .getRange(2, 1, sheet.getLastRow() - 1, 5)
      .clearContent();
  }
}
