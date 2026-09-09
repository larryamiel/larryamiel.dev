export const REPO_URL = 'https://github.com/larryamiel/ballview';
export const RELEASES_URL = 'https://github.com/larryamiel/ballview/releases';
export const CANONICAL = 'https://larryamiel.dev/ballview';

/**
 * The interactive feature tour. Each entry drives one tab: the button label on
 * the left, and the screenshot plus copy shown on the right.
 */
export const tour = [
	{
		id: 'live',
		tab: 'Live game',
		kicker: 'Every pitch, as it is thrown',
		title: "Watch the at-bat from behind the plate",
		body: "Ballview polls the live feed every 15 seconds while a game is in progress and stops on its own the moment it goes Final. Each pitch lands on the strike zone with its type, velocity, movement and result, and the rail on the left keeps the whole at-bat in view so you can see how the pitcher set the hitter up.",
		bullets: [
			'Umpire view — the pitch as the catcher sees it, plotted on a real strike zone',
			'Pitch type, release speed, spin rate and horizontal / vertical break',
			'Live count, base state and outs in the scoreboard header',
			'Polling backs off on rate limits and stops when the game ends'
		],
		shot: '/ballview/shots/live-view.png',
		alt: 'Ballview live MLB pitch tracking view showing a 87.6 mph slider plotted on the strike zone with the full at-bat pitch sequence'
	},
	{
		id: 'field',
		tab: 'Batted ball',
		kicker: 'Where the ball actually went',
		title: 'A batted ball, drawn to the fielder who handled it',
		body: "When a ball is put in play the view flips from the strike zone to the field. Defenders sit at their real alignment, the ball traces out to the fielder credited with the play, and the Statcast line — exit velocity, launch angle, projected distance — sits beside it.",
		bullets: [
			'Exit velocity, launch angle and distance for every ball in play',
			'Fielder alignment and the putout sequence (SS → 1B) drawn on the diamond',
			'Plain-English play description under the diagram',
			'One click to replay the pitch that produced it'
		],
		shot: '/ballview/shots/field-view.png',
		alt: 'Ballview field diagram showing a groundout fielded by the shortstop with exit velocity, launch angle and distance'
	},
	{
		id: 'pbp',
		tab: 'Play-by-play',
		kicker: 'The whole game, inning by inning',
		title: 'Expand any at-bat down to the pitch',
		body: "The play-by-play feed reads like a game log until you open a plate appearance — then it becomes a pitch table with velocity, result and running count, plus the strike-zone plot for that at-bat. A linescore pinned to the top keeps runs, hits and errors in view.",
		bullets: [
			'Full inning-by-inning linescore with R / H / E',
			'Every plate appearance, newest first, with pitch counts',
			'Per-pitch table: type, MPH, result, count',
			'Watch button jumps straight to the MLB clip of that play'
		],
		shot: '/ballview/shots/play-by-play.png',
		alt: 'Ballview MLB play-by-play log with an expanded at-bat showing each pitch type, velocity, result and count'
	},
	{
		id: 'box',
		tab: 'Box score',
		kicker: 'Both sides, every line',
		title: 'A complete box score you can keep',
		body: "Batting and pitching lines for both clubs, including substitutions, with season AVG and OPS carried alongside the game line. Save the game and the whole thing — feed, box score and highlight metadata — is written to a single JSON file that reopens with no network at all.",
		bullets: [
			'Full batting and pitching lines for both teams',
			'Season rate stats shown next to the game line',
			'Save a game as an offline snapshot',
			'Export any game as one portable .json file'
		],
		shot: '/ballview/shots/box-score.png',
		alt: 'Ballview MLB box score showing full batting lines for both teams with AB, R, H, HR, RBI, AVG and OPS'
	},
	{
		id: 'replay',
		tab: 'Replay',
		kicker: 'Rewind any plate appearance',
		title: 'Replay any pitch of any at-bat',
		body: "Scroll back through all 69 at-bats of a finished game, pick one, pick a pitch, and choose how you want to see it — the umpire's angle, the raw Statcast numbers, or the Baseball Savant video of that exact pitch playing inline.",
		bullets: [
			'Every at-bat of the game, newest first',
			'Three views per pitch: Umpire, Pitch data, Clip',
			'Savant video for individual pitches, in-app',
			'Works on saved games without a connection'
		],
		shot: '/ballview/shots/replay.jpg',
		alt: 'Ballview replay view playing the Baseball Savant video clip of a selected pitch beside the at-bat pitch list'
	},
	{
		id: 'games',
		tab: "Today's games",
		kicker: 'The whole slate at a glance',
		title: "Every game today, live scores included",
		body: "The board opens on today's schedule with records, first-pitch times and ballparks, and marks the games already underway with their inning, score and out count. Your favorite team's game is starred and pinned to the front.",
		bullets: [
			'All 15 games with live inning and out state',
			'Team records pulled from the standings',
			'Venue and local first-pitch time per game',
			'Step forward and back through the schedule by date'
		],
		shot: '/ballview/shots/games.png',
		alt: "Ballview today's MLB games board showing live scores, innings, team records and ballparks for the full slate"
	},
	{
		id: 'myteam',
		tab: 'My team',
		kicker: 'Follow one club properly',
		title: 'Your team’s season as a calendar',
		body: "Favorite a club and Ballview keeps an on-disk log of its games, backfilled from the start of the season. The default view is a month calendar with each result in place; switch to a list, filter to played or upcoming, or step back through earlier months and seasons.",
		bullets: [
			'Month calendar or list, filtered by played / upcoming',
			'Season log backfilled and stored on disk as plain JSON',
			'Spring training, regular season and postseason kept in one season file',
			'Club news feed and a team highlight reel in the same place'
		],
		shot: '/ballview/shots/my-team-schedule.png',
		alt: 'Ballview My Team calendar showing a full month of Los Angeles Dodgers results with scores and upcoming first-pitch times'
	},
	{
		id: 'players',
		tab: 'Player stats',
		kicker: 'Sortable, filterable leaderboards',
		title: 'League leaderboards for hitters and pitchers',
		body: "Sort every qualified batter or pitcher by any column — HR, OPS, ERA, strikeouts — and scope the window to the full season, the last week or month, the last ten games, or any custom date range you type in.",
		bullets: [
			'Batting and pitching leaderboards, sortable on every column',
			'Season, last week, last month, last 10 games or a custom range',
			'Qualified-only toggle and a minimum-games filter',
			'Search any player or team by name'
		],
		shot: '/ballview/shots/players-leaderboard.png',
		alt: 'Ballview MLB player stats leaderboard sorted by home runs with G, AB, R, H, RBI, AVG, OBP, SLG and OPS columns'
	},
	{
		id: 'charts',
		tab: 'Charts',
		kicker: 'Compare players visually',
		title: 'Plot a stat over time, or one stat against another',
		body: "Add up to four players to a chart and either track a stat across the season or scatter one stat against another — home runs against OPS, velocity against whiff rate. Hover any point for the exact figure.",
		bullets: [
			'Over-time lines or stat-vs-stat scatter plots',
			'Hitting and pitching stat axes, chosen independently',
			'Multiple players on one chart, colour-coded',
			'Month buttons or a custom date range'
		],
		shot: '/ballview/shots/charts.png',
		alt: 'Ballview player comparison chart plotting home runs against OPS for four MLB hitters'
	},
	{
		id: 'spotlight',
		tab: 'Spotlight',
		kicker: 'Who actually had the best day',
		title: 'Player of the day, week and month',
		body: "Ballview ranks the last completed slate on wins added over the window, raw production and season WAR, and shows the top hitters and pitchers with their box lines. Open anyone for their game-by-game log and every highlight clip they appear in.",
		bullets: [
			'Separate leaderboards for position players and pitchers',
			'Day, week and month windows',
			'A transparent score with its weighting spelled out',
			'Per-player game log plus their highlight clips'
		],
		shot: '/ballview/shots/spotlight.png',
		alt: 'Ballview Player of the Day spotlight ranking MLB hitters and pitchers from the last completed slate with box score lines'
	},
	{
		id: 'highlights',
		tab: 'Highlights',
		kicker: 'Clips, in the app',
		title: 'Watch and keep the highlights',
		body: "Every game carries MLB's own highlight reel — the condensed game, each home run, each defensive play — playing inline. Save any clip and it is downloaded next to the game snapshot so it stays watchable offline.",
		bullets: [
			'Full highlight reel per game, including the condensed game',
			'Plays inline — no browser, no external player',
			'Save a clip to keep it with the saved game',
			'Attach a highlight to any game in your log'
		],
		shot: '/ballview/shots/game-highlights.jpg',
		alt: 'Ballview game highlights tab showing MLB highlight clips with thumbnails, durations and save buttons'
	},
	{
		id: 'potd',
		tab: 'Play of the day',
		kicker: 'The best thing that happened yesterday',
		title: 'A daily reel of the league’s best plays',
		body: "A curated board of the previous slate's best moments — walk-offs, diving catches, inside-the-park homers — tagged by play type and filterable down to your own club.",
		bullets: [
			'Tagged by play type: walk-off, diving catch, home run',
			'Filter to all of MLB or just your team',
			'Featured play plus a grid of the rest',
			'Every clip plays in the app'
		],
		shot: '/ballview/shots/play-of-the-day.jpg',
		alt: 'Ballview Play of the Day board featuring a diving catch with a grid of tagged MLB highlight clips beneath it'
	}
];

/** The exhaustive feature grid — the SEO body of the page. */
export const featureGroups = [
	{
		group: 'Live baseball',
		items: [
			['Live scoreboard', "Today's full MLB slate with inning, count, base state and out totals, refreshed while games are in progress."],
			['Pitch-by-pitch tracking', 'Type, release velocity, spin rate and break for every pitch, plotted on the strike zone.'],
			['Animated ball path', 'The pitch drawn along its tracked trajectory rather than dropped as a single dot.'],
			['Batted ball diagram', 'Exit velocity, launch angle and distance, with the ball flown out to the fielder credited on the play.'],
			['Play-by-play feed', 'Every plate appearance, expandable to a per-pitch table with the running count.'],
			['Automatic polling', 'A 15-second refresh that only runs for live games and backs off on rate limits.']
		]
	},
	{
		group: 'Your team',
		items: [
			['Favorite a team', 'Pick any of the 30 clubs; logos, records and division standing come along with it.'],
			['Season game log', 'Backfilled from the start of the year and kept on disk as plain JSON.'],
			['Calendar view', 'A month grid of results and upcoming first-pitch times, or a filterable list.'],
			['Team news', "The club's own feed from mlb.com, in the app."],
			['Team highlight reel', 'Recent clips for your club, collected in one tab.'],
			['One season file', 'Spring training, regular season and postseason share a season, so they share a file — each entry tagged with its game type.']
		]
	},
	{
		group: 'Players and stats',
		items: [
			['Batting leaderboard', 'Every qualified hitter, sortable on G, AB, R, H, 2B, 3B, HR, RBI, BB, SO, SB, AVG, OBP, SLG and OPS.'],
			['Pitching leaderboard', 'The same treatment for pitchers — innings, ERA, WHIP, strikeouts, walks and wins.'],
			['Date-range windows', 'Full season, last week, last month, last ten games, or any range you type.'],
			['Player comparison charts', 'Up to four players on one chart, over time or stat against stat.'],
			['Player of the day / week / month', 'Ranked on wins added, raw production and season WAR, with the weighting shown.'],
			['Player detail cards', 'A game-by-game log and every highlight clip the player appears in.']
		]
	},
	{
		group: 'Video and archive',
		items: [
			['Inline highlights', "MLB's own reel per game, including the condensed game, playing in the app."],
			['Savant pitch video', 'The Baseball Savant clip for an individual pitch, in a Clip tab.'],
			['Play of the day', "A curated board of the previous slate's best plays, tagged by type."],
			['Save a game', 'Feed, box score and highlight metadata written as one self-contained snapshot.'],
			['Offline replay', 'A saved game reopens and replays with no network connection at all.'],
			['Export and import', 'Any game moves between machines as a single portable .json file.']
		]
	}
];

export const faq = [
	{
		q: 'Is Ballview free?',
		a: 'Yes. Ballview is a free, open-source desktop application. The source is on GitHub and there is no account, subscription or paywall.'
	},
	{
		q: 'What platforms does Ballview run on?',
		a: 'Windows 10 and Windows 11. It ships as a standard NSIS installer and uses the WebView2 runtime, which is already present on Windows 11.'
	},
	{
		q: 'Where does the baseball data come from?',
		a: "Ballview reads the publicly accessible MLB Stats API for schedules, live feeds, box scores and highlights, with optional Statcast enrichment from Baseball Savant. That API is undocumented and unversioned, so every field is parsed defensively — an upstream change degrades one corner of the interface rather than breaking the app."
	},
	{
		q: 'Does Ballview need a database?',
		a: 'No. There is no database and no server. Your settings, your team history and your saved games are plain JSON files under %APPDATA%\\ballview, which means you can read them, back them up or delete them yourself.'
	},
	{
		q: 'Can I watch live MLB games in Ballview?',
		a: "Ballview is a play-by-play and highlights app, not a streaming service. It follows games pitch by pitch in real time and plays MLB's published highlight and Savant clips, but it does not carry live game broadcasts."
	},
	{
		q: 'Does it work offline?',
		a: 'Saved games do. A snapshot bundles the feed, the box score and the highlight metadata together, so a game you have saved reopens, replays and exports with no connection.'
	},
	{
		q: 'Is Ballview affiliated with Major League Baseball?',
		a: 'No. Ballview is an unofficial, unaffiliated personal project. Clip availability and geographic restrictions are set by MLB.'
	}
];

export const stack = [
	['Tauri 2', 'Rust backend behind the system WebView — a small binary, not a bundled browser.'],
	['React 19 + TypeScript', 'The whole interface, with TS models mirroring the Rust structs.'],
	['Rust', 'Every HTTP call and every file write. The frontend does neither.'],
	['No database', 'Plain JSON on disk. Readable, portable, deletable.'],
	['Zustand + React Query', 'Client state and request caching.'],
	['Fixture-backed tests', 'Genuine captured MLB responses, so parsing is verified offline and in CI.']
];
