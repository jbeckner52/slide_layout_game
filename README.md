# slide_layout_game
a game for students to practice creating slide presentations according to graphic design principles

SLIDE DESIGN CHALLENGE — SETUP

FILES
-----
Code.gs
Index.html
README.txt

SETUP
-----
1. Create a new Google Sheet.
2. Copy its ID from the URL:
   https://docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit
3. Open Extensions > Apps Script.
4. Replace Code.gs with the supplied Code.gs.
5. Change:
      const SPREADSHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
   to your real Sheet ID.
6. Add an HTML file named Index and paste Index.html into it.
7. In Apps Script, run setupLeaderboard() once.
   Google will ask you to authorize the script.
8. Deploy > New deployment.
9. Select Web app.
10. Execute as: Me
11. Who has access: Anyone
12. Deploy and copy the /exec URL.
13. In Google Sites, choose Insert > Embed > URL.
14. Paste the Apps Script /exec URL.
15. Publish the Google Site.

IMPORTANT
---------
The leaderboard is shared because every game instance writes to the same
Google Sheet. Do NOT use localStorage for scores in this version.

TEACHER RESET
-------------
To clear the leaderboard for a new class/semester:
1. Open Apps Script.
2. Run clearLeaderboard().
3. Confirm the authorization if requested.

SCORING
-------
Correct placement: +100
Incorrect placement: -50
Speed bonus: up to +500 per round
Complete all 25 rounds: +1,000

LEADERBOARD
-----------
The Sheet stores:
Timestamp | Student | Score | Time (seconds) | Rounds

The game displays the top 25 scores, with higher score first and faster
time breaking ties.

IMAGE NOTE
----------
The sample rounds use Unsplash image URLs. You can replace those URLs in
Index.html with school-approved images or your own hosted images.


GAME PROGRESSION
----------------
The 25 rounds are intentionally organized into five stages:

Rounds 1–5: FOUNDATIONS
Students learn basic hierarchy, simple placement, and clear slide structure.

Rounds 6–10: ORGANIZATION
Students practice grouping, proximity, alignment, columns, and information flow.

Rounds 11–15: VISUAL COMMUNICATION
Students practice balancing text and visuals and deciding how images, quotes,
statistics, and supporting information should work together.

Rounds 16–20: DESIGN DECISIONS
Students apply the four class rules together:
1. Keep it simple.
2. Make important things stand out.
3. Use visuals.
4. Keep everything organized.

Rounds 21–25: CHALLENGE MODE
Students face denser layouts and less-obvious design decisions. The goal is
not merely to identify a type of element, but to think about hierarchy,
audience, emphasis, proximity, and whether each element supports the message.

A stage label is shown at the top of the game so students can see their
progress through the challenge.
