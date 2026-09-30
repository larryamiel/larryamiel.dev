export const PLAY_URL = 'https://skwabble.larryamiel.dev';
export const CANONICAL = 'https://larryamiel.dev/skwabble';

/**
 * The interactive screen tour. Each entry drives one tab and is also a
 * lightbox slide. `phone` marks the portrait shot, which gets a device frame
 * instead of a browser window.
 */
export const tour = [
	{
		id: 'home',
		tab: 'Home',
		kicker: 'Pick a name, pick a colour',
		title: 'Quick Play, or a room of your own',
		body: 'There is no account. Type a nickname, choose a colour and you are in. Quick Play drops you into the fullest public lobby that still has a seat; a private room hands you a five-letter code and an invite link to send to friends. The rules sit right beside the buttons, so a first-timer can read them while they wait.',
		bullets: [
			'Guest play: a random token in the browser is your identity',
			'Quick Play matches you into the fullest open public lobby',
			'Private rooms join by code or by invite link',
			'How-to-play, scoring and house rules on the same screen'
		],
		shot: '/skwabble/shots/home.webp',
		alt: 'Skwabble home screen with a nickname field, colour picker, Quick Play and Create Private Room buttons beside the how-to-play rules'
	},
	{
		id: 'lobby',
		tab: 'Lobby',
		kicker: 'Your table, your rules',
		title: 'Set the pace before the first flip',
		body: 'The host decides how the round runs: automatic flips on a timer or manual turns, the flip interval, whether a busy board slows the pace down, and which house rules are on. Up to six seats fill in live, and the feed on the right doubles as the room chat.',
		bullets: [
			'Auto or manual flipping, interval from the slider',
			'Adaptive pace: +0.3s per face-up tile beyond six, capped at +6s',
			'Four optional house rules — Block -ING/-ER, blanks, lock tiles, ice tile',
			'Room feed and chat, focused with the / key'
		],
		shot: '/skwabble/shots/lobby.webp',
		alt: 'Skwabble private room lobby with room code JVURY, four players seated and host settings for flip mode, pace and house rules'
	},
	{
		id: 'countdown',
		tab: 'Countdown',
		kicker: 'Everything starts face down',
		title: 'The whole bag, face down, and a countdown',
		body: 'The round opens with every tile in the bag laid out face down. A three-second countdown, then the first flip. The header keeps the room code, the flip mode, and how many tiles are still face down or already on the table, so you always know how much game is left.',
		bullets: [
			'Scrabble letter distribution, scaled up 25% per player beyond three',
			'Tile modifiers are dealt at random each game',
			'Live counts of face-down and face-up tiles in the header',
			'Your word input is focused and ready before the first flip'
		],
		shot: '/skwabble/shots/countdown.webp',
		alt: 'Skwabble board at the start of a round with every tile face down and a large 2 counting down to the first flip'
	},
	{
		id: 'preview',
		tab: 'Steal preview',
		kicker: 'It shows you the maths as you type',
		title: 'Know what a word is worth before you claim it',
		body: 'Typing lights up each letter with where it would come from, Wordle-style: amber from the word you are about to steal, green from a face-up tile, grey if it is not available at all. Underneath, the game names the word you are stealing, whose it is, and what it will score.',
		bullets: [
			'Amber = from the stolen word, green = from the board, grey = unavailable',
			'Names the target — “Stealing FILM from Mia · +6”',
			'Click any word on the table to target it explicitly',
			'Enter to claim, Esc to clear'
		],
		shot: '/skwabble/shots/steal-preview.webp',
		alt: 'Skwabble steal preview spelling FAMILY with FILM letters in amber and the face-up A and Y in green, captioned Stealing FILM from Mia +6'
	},
	{
		id: 'steal',
		tab: 'The steal',
		kicker: 'FILM + A + Y',
		title: 'Take it, and the whole table sees it',
		body: 'A successful steal lands with a banner, a sound cue for you and a different one for the player who lost the word. The word moves to your rack with every modifier it was carrying — bonuses and demerits both — and every opponent sees the scores change at the same moment.',
		bullets: [
			'Words keep their tile modifiers when they change hands',
			'Separate sounds for claiming, stealing and being stolen from',
			'Opponents ranked live with word counts and points',
			'Lock tiles show their remaining steals on the word'
		],
		shot: '/skwabble/shots/steal.webp',
		alt: 'Skwabble STEAL banner over the board as FAMILY is claimed, with opponents Nova, Mia and Kai and their words listed on the right'
	},
	{
		id: 'results',
		tab: 'Results',
		kicker: 'Last call, then the tally',
		title: 'Every word, every point',
		body: 'When the last tile flips there is a 20-second last call, with a five-second countdown at the end. Any claim in that window pushes the clock back up to at least ten seconds. Then the round is scored and every player’s words are laid out with what each one earned.',
		bullets: [
			'20s last call; a claim extends it to at least 10s',
			'Final standings with each word and its score',
			'Back to the lobby for a rematch with the same table',
			'Public rooms return to the lobby on their own'
		],
		shot: '/skwabble/shots/results.webp',
		alt: 'Skwabble game over screen announcing Kai wins with 35 points and each player’s claimed words and scores'
	},
	{
		id: 'mobile',
		tab: 'On a phone',
		kicker: 'Same game, one column',
		title: 'Plays on a phone, too',
		body: 'On a narrow screen the table stacks into one column: header and pause controls, the board, the available letters, your word, then your rack above your opponents. The word input works with the on-screen keyboard, so a phone player can steal from a desktop player in the same room.',
		bullets: [
			'Single-column layout on narrow screens',
			'Available letters collected in one strip under the board',
			'Your own rack pinned above the opponents',
			'Same room, same rules as desktop players'
		],
		shot: '/skwabble/shots/mobile.webp',
		alt: 'Skwabble on a phone showing the board, available letters, the word input and the player rack in a single column',
		phone: true
	}
];

/** The rules, grouped. Doubles as the SEO body of the page. */
export const ruleGroups = [
	{
		group: 'The table',
		items: [
			[
				'Face-down start',
				'Every tile begins face down and they flip one at a time, on a timer or in turns.'
			],
			[
				'Claim a word',
				'Three letters or more, from the face-up tiles, checked against a 173,000-word dictionary.'
			],
			[
				'Steal or grow',
				'Use every letter of any word on the table — yours included — plus at least one face-up tile.'
			],
			[
				'No cheap steals',
				'Plurals and past tense do not count: SNAKE → SNAKES and HIKE → HIKED are refused.'
			],
			[
				'Newest copy goes',
				'If two players hold the same word the most recently formed one is stolen, unless you click to target.'
			],
			[
				'First come, first served',
				'Claims are handled one at a time in arrival order, each checked against the updated table.'
			]
		]
	},
	{
		group: 'Scoring',
		items: [
			[
				'Length',
				'Letters minus two: a three-letter word is 1 point, and every extra letter adds another.'
			],
			['Hard letters', 'Q and Z +3, J X K +2, F H V W Y +1 — printed in the corner of the tile.'],
			['Bonus tiles', 'Green +1 and +2 tiles add to the word they end up in.'],
			[
				'Demerit tiles',
				'Purple −1 and −2 tiles subtract, and travel with the word when it is stolen.'
			],
			['Red letters', 'A ×2 tile doubles the whole word, after everything else is added up.'],
			['Random every game', 'Modifiers are dealt fresh each round, so no two boards play the same.']
		]
	},
	{
		group: 'House rules',
		items: [
			[
				'Block -ING / -ER',
				'RUN → RUNNING and BAKE → BAKER stop counting as steals, the same as plurals.'
			],
			['Blank tiles', 'Two wildcards that become any letter; real tiles are always used first.'],
			[
				'Lock tiles',
				'A word holding one counts down with each steal by another player, then locks for good.'
			],
			[
				'Ice tile',
				'One per game. Whoever takes it off the board cannot claim for the next two flips.'
			]
		]
	},
	{
		group: 'Keeping it fair',
		items: [
			[
				'Vote pause',
				'A majority of connected players can pause — no flips, no claims, timers frozen.'
			],
			[
				'Manual mode',
				'The flip rotates between players; pick a tile with the mouse or arrow keys and Space.'
			],
			['Adaptive pace', 'A crowded board slows the auto-flip down so there is time to read it.'],
			[
				'Reconnects resume',
				'Refresh or drop out and you come back to the same seat, words and score.'
			]
		]
	}
];

export const faq = [
	{
		q: 'Is Skwabble free?',
		a: 'Yes. It runs in the browser at skwabble.larryamiel.dev with no account, no download and no ads.'
	},
	{
		q: 'How many people can play?',
		a: 'Two to six per room. Quick Play puts you in a public lobby with whoever else is looking for a game; a private room is just you and whoever you send the invite link to.'
	},
	{
		q: 'Does it work on a phone?',
		a: 'Yes. The layout stacks into a single column on a narrow screen and the word input works with the on-screen keyboard. A physical keyboard is still the fastest way to steal.'
	},
	{
		q: 'What counts as a word?',
		a: 'Anything of three letters or more in ENABLE, the public-domain Scrabble-style word list — about 173,000 words. Plurals and past-tense forms of a word already on the table are not allowed as steals.'
	},
	{
		q: 'What happens if two players claim at the same time?',
		a: 'Each room runs on a single Cloudflare Durable Object, which handles one message at a time. Whichever claim arrives first is applied; the second is then checked against the table as it now stands, and succeeds or fails on that.'
	},
	{
		q: 'What if my connection drops?',
		a: 'Your browser keeps a random session token, and the server derives your player id from it. Reconnect or refresh and you are put back in your seat with your words and score intact.'
	},
	{
		q: 'Is Skwabble affiliated with Scrabble?',
		a: 'No. Skwabble is an independent personal project. It uses a Scrabble-style letter distribution and a public-domain word list, and is not affiliated with Scrabble, Hasbro or Mattel.'
	}
];

export const stack = [
	[
		'Cloudflare Durable Objects',
		'One per room. Single-threaded by design, which is what makes first come, first served actually true.'
	],
	[
		'Cloudflare Workers',
		'The game server, plus a singleton Matchmaker object that hands out public rooms.'
	],
	['React 19 + Vite', 'The client, served as a static site from Vercel.'],
	[
		'partyserver / partysocket',
		'WebSocket rooms on the server and a reconnecting socket in the browser.'
	],
	[
		'Shared TypeScript rules',
		'Bag, scoring, inflection checks and claim resolution — pure functions, used on both sides.'
	],
	['Vitest', 'Rules and room state machine tested without a network or a browser.']
];
