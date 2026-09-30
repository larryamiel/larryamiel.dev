<script lang="ts">
	import BrowserFrame from '$lib/components/skwabble/BrowserFrame.svelte';
	import Lightbox from '$lib/components/ballview/Lightbox.svelte';

	import { PLAY_URL, CANONICAL, tour, ruleGroups, faq, stack } from '$lib/constants/skwabble.js';

	const TITLE = 'Skwabble — Real-Time Multiplayer Word Snatching Game';
	const DESCRIPTION =
		'Skwabble is a free real-time multiplayer word game for 2–6 players in the browser. Tiles flip one at a time, everyone races to spell words from the face-up letters, and any word on the table can be stolen by rebuilding it with one more tile.';
	const OG_IMAGE = `${CANONICAL.replace('/skwabble', '')}/skwabble/og-card.jpg`;

	/** Hard-letter bonuses, printed in the tile corner the same way the game does. */
	const BONUS: Record<string, number> = {
		Q: 3,
		Z: 3,
		J: 2,
		X: 2,
		K: 2,
		F: 1,
		H: 1,
		V: 1,
		W: 1,
		Y: 1
	};

	const heroShot = tour.find((t) => t.id === 'preview')!;
	const phoneShot = tour.find((t) => t.phone)!;

	let active = $state(0);
	let lightbox = $state(-1);
	let openFaq = $state<number | null>(0);

	const current = $derived(tour[active]);

	const gameSchema = {
		'@context': 'https://schema.org',
		'@type': 'VideoGame',
		name: 'Skwabble',
		url: PLAY_URL,
		description: DESCRIPTION,
		image: OG_IMAGE,
		genre: ['Word game', 'Party game'],
		gamePlatform: 'Web browser',
		applicationCategory: 'GameApplication',
		operatingSystem: 'Any',
		playMode: 'MultiPlayer',
		numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 6 },
		author: { '@type': 'Person', name: 'Larry Amiel', url: 'https://larryamiel.dev' },
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	};

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'larryamiel.dev', item: 'https://larryamiel.dev' },
			{ '@type': 'ListItem', position: 2, name: 'Skwabble', item: CANONICAL }
		]
	};
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="title" content={TITLE} />
	<meta name="description" content={DESCRIPTION} />
	<meta
		name="keywords"
		content="multiplayer word game, online word game with friends, word snatching game, anagram steal game, real-time word game, free browser word game, Scrabble tiles game online, word game private room"
	/>
	<link rel="canonical" href={CANONICAL} />
	<link
		href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Outfit:wght@400;500;600&family=Rubik:wght@800&display=swap"
		rel="stylesheet"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content={CANONICAL} />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="larryamiel.dev" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={CANONICAL} />
	<meta property="twitter:title" content={TITLE} />
	<meta property="twitter:description" content={DESCRIPTION} />
	<meta property="twitter:image" content={OG_IMAGE} />

	{@html `<script type="application/ld+json">${JSON.stringify(gameSchema)}</` + `script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</` + `script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</` + `script>`}
</svelte:head>

{#snippet tiles(word: string, tone = '')}
	{#each [...word] as letter}
		<span class="tile {tone}"
			>{letter}{#if BONUS[letter]}<span class="tile-b">{BONUS[letter]}</span>{/if}</span
		>
	{/each}
{/snippet}

<Lightbox shots={tour} bind:index={lightbox} />

<div class="sk">
	<div class="ambient" aria-hidden="true">
		<span class="lines"></span>
		<span class="glow glow-a"></span>
		<span class="glow glow-b"></span>
		<span class="glow glow-c"></span>

		<!-- A few loose tiles drifting behind the hero, as on the poster. -->
		<span class="tile down drift" style="--s:54px; left:6%; top:62vh; --r:-14deg">S</span>
		<span class="tile drift" style="--s:46px; left:44%; top:88vh; --r:9deg"
			>Q<span class="tile-b">3</span></span
		>
		<span class="tile x2 drift" style="--s:50px; right:5%; top:9vh; --r:12deg"
			>E<span class="tile-m">×2</span></span
		>
		<span class="tile down drift" style="--s:42px; right:12%; top:92vh; --r:-8deg">S</span>
	</div>

	<!-- ── Hero ─────────────────────────────────────────────────────────── -->
	<header class="wrap px-6 pt-10 pb-4 lg:pt-16">
		<a href="/" class="back">← larryamiel.dev</a>

		<div class="hero mt-10">
			<div>
				<p class="pill"><span class="live-dot"></span> Free · Multiplayer · In the browser</p>

				<div class="logo mt-6" role="img" aria-label="Skwabble">
					{@render tiles('SKWABBLE')}
				</div>

				<h1 class="display mt-7">
					<span>Flip the tiles.</span>
					<span>Race to spell.</span>
					<span class="hot">Steal everything.</span>
				</h1>

				<p class="lede mt-6">
					A real-time word game for two to six players. Tiles flip over one at a time and everyone
					races to spell words from the letters on the table — and any word anyone owns can be
					snatched by rebuilding it with one more letter.
				</p>

				<div class="mt-8 flex flex-wrap gap-3">
					<a class="btn btn-primary" href={PLAY_URL} target="_blank" rel="noopener">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"
							><path fill="currentColor" d="M8 5.5v13l10.5-6.5L8 5.5Z" /></svg
						>
						Play now
					</a>
					<a class="btn btn-ghost" href="#tour">See how it plays</a>
				</div>

				<p class="fine mt-4">No sign-up · 2–6 players · desktop or phone</p>
			</div>

			<div class="hero-shot">
				<BrowserFrame src={heroShot.shot} alt={heroShot.alt} loading="eager" />
				<div class="phone hero-phone">
					<img src={phoneShot.shot} alt="" width="585" height="1266" decoding="async" />
				</div>
				<span class="sticker" aria-hidden="true">Steal!</span>
			</div>
		</div>
	</header>

	<!-- ── Stat strip ───────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-14" aria-label="At a glance">
		<div class="stats">
			{#each [['2–6', 'players per room'], ['173k', 'words in the dictionary'], ['1', 'Durable Object per room, so claims land in order'], ['0', 'accounts — just a nickname']] as [n, label]}
				<div class="stat">
					<span class="stat-n">{n}</span>
					<span class="stat-l">{label}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- ── The steal ────────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-10" aria-labelledby="steal-heading">
		<div class="steal-card">
			<div>
				<p class="eyebrow">The one rule that matters</p>
				<h2 id="steal-heading" class="section-h">Every word is up for grabs</h2>
				<p class="section-sub">
					Take all the letters of a word someone already owns, add at least one face-up tile, and
					rearrange them into something new. The word is yours now — along with every bonus and
					every demerit it was carrying. Plurals and past tense don't count, so SNAKE → SNAKES won't
					save you.
				</p>
			</div>

			<div class="equation" aria-label="FILM plus A and Y makes FAMILY">
				<div class="eq-row">
					<div class="eq-group">
						<span class="eq-label">Mia's word</span>
						<div class="eq-tiles">{@render tiles('FILM', 'amber')}</div>
					</div>
					<span class="op" aria-hidden="true">+</span>
					<div class="eq-group">
						<span class="eq-label">Face-up</span>
						<div class="eq-tiles">{@render tiles('AY', 'green')}</div>
					</div>
				</div>
				<span class="op down-arrow" aria-hidden="true">↓</span>
				<div class="eq-group">
					<span class="eq-label">Yours, +6</span>
					<div class="eq-tiles">{@render tiles('FAMILY')}</div>
				</div>
			</div>
		</div>
	</section>

	<div class="band" aria-hidden="true"><span class="band-strip"></span></div>

	<!-- ── Interactive tour ─────────────────────────────────────────────── -->
	<section class="wrap px-6 py-10" id="tour" aria-labelledby="tour-heading">
		<p class="eyebrow">The tour</p>
		<h2 id="tour-heading" class="section-h">
			One round, <span class="cyan">start to finish</span>
		</h2>
		<p class="section-sub">
			From picking a nickname to the final tally. Every screen is the real game in a real room.
		</p>

		<div class="tabs" role="tablist" aria-label="Skwabble screens">
			{#each tour as t, i}
				<button
					role="tab"
					id="tab-{t.id}"
					aria-selected={active === i}
					aria-controls="panel-{t.id}"
					class="tab"
					class:is-active={active === i}
					onclick={() => (active = i)}
				>
					{t.tab}
				</button>
			{/each}
		</div>

		<div
			class="tour-panel"
			role="tabpanel"
			id="panel-{current.id}"
			aria-labelledby="tab-{current.id}"
		>
			{#key current.id}
				<div class="tour-copy">
					<p class="eyebrow pink">{current.kicker}</p>
					<h3 class="tour-h">{current.title}</h3>
					<p class="tour-body">{current.body}</p>
					<ul class="tour-list">
						{#each current.bullets as b}
							<li>{b}</li>
						{/each}
					</ul>
				</div>

				<div class="tour-shot">
					{#if current.phone}
						<button
							type="button"
							class="phone tour-phone"
							onclick={() => (lightbox = active)}
							aria-label="Open larger: {current.alt}"
						>
							<img src={current.shot} alt={current.alt} width="585" height="1266" />
						</button>
					{:else}
						<BrowserFrame
							src={current.shot}
							alt={current.alt}
							onclick={() => (lightbox = active)}
						/>
					{/if}
				</div>
			{/key}
		</div>
	</section>

	<!-- ── Video ────────────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="watch" aria-labelledby="watch-heading">
		<p class="eyebrow">Watch</p>
		<h2 id="watch-heading" class="section-h">
			A round, <span class="pink">in motion</span>
		</h2>
		<p class="section-sub">
			Tiles flipping, words landing, and a steal changing hands mid-game — the pace is the point.
		</p>

		<div class="video-frame">
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				src="/skwabble/gameplay.webm"
				poster="/skwabble/gameplay-poster.webp"
				width="1440"
				height="900"
				controls
				muted
				loop
				playsinline
				preload="none"
			></video>
		</div>
	</section>

	<!-- ── Rules ────────────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="rules" aria-labelledby="rules-heading">
		<p class="eyebrow">How it plays</p>
		<h2 id="rules-heading" class="section-h">
			The rules, <span class="amber">all of them</span>
		</h2>
		<p class="section-sub">
			Simple enough to learn in one round. The scoring and the house rules are where the arguments
			start.
		</p>

		<div class="mt-10 grid gap-10 lg:grid-cols-2">
			{#each ruleGroups as g}
				<div>
					<h3 class="group-h">{g.group}</h3>
					<ul class="feature-grid">
						{#each g.items as [name, desc]}
							<li class="feature">
								<strong>{name}</strong>
								<span>{desc}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- ── Gallery ──────────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="screenshots" aria-labelledby="shots-heading">
		<p class="eyebrow">Screenshots</p>
		<h2 id="shots-heading" class="section-h">
			Every screen, <span class="cyan">full size</span>
		</h2>
		<p class="section-sub">Click any shot to open it. Arrow keys move through the set.</p>

		<div class="gallery">
			{#each tour as t, i}
				<button class="thumb" class:tall={t.phone} onclick={() => (lightbox = i)}>
					<img src={t.shot} alt={t.alt} loading="lazy" decoding="async" />
					<span class="thumb-label">{t.tab}</span>
				</button>
			{/each}
		</div>
	</section>

	<!-- ── Under the hood ───────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="build" aria-labelledby="build-heading">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
			<div>
				<p class="eyebrow">Under the hood</p>
				<h2 id="build-heading" class="section-h">How it's built</h2>
				<p class="section-sub">
					The hard part of a game like this is two people typing the same steal in the same
					half-second. <span class="em">Each room is a single Cloudflare Durable Object</span>, and
					a Durable Object handles one message at a time — so claims are applied strictly in arrival
					order, and the later one is judged against the table the earlier one left behind. No
					locks, no reconciliation, no "who was really first" logic.
				</p>
				<p class="section-sub mt-4">
					The rules themselves — building the bag, scoring, the plural and past-tense check, working
					out which word a claim steals — are pure TypeScript shared by both sides. The server uses
					them to decide; the client uses the same functions to draw the live preview while you
					type, so what the preview promises is what the server will do. Players are guests: a
					random token in the browser is hashed into a stable player id, which is how a refresh puts
					you back in your seat.
				</p>
			</div>

			<ul class="stack">
				{#each stack as [name, desc]}
					<li>
						<strong>{name}</strong>
						<span>{desc}</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- ── Play ─────────────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="play" aria-labelledby="play-heading">
		<div class="play-card">
			<div>
				<p class="eyebrow cyan">Play</p>
				<h2 id="play-heading" class="section-h !mt-2">Get a table together</h2>
				<p class="section-sub max-w-xl">
					Hit Quick Play to join whoever is around, or open a private room and send the link to the
					group chat. It runs in any modern browser and there is nothing to install.
				</p>

				<div class="mt-7 flex flex-wrap gap-3">
					<a class="btn btn-primary" href={PLAY_URL} target="_blank" rel="noopener">
						Play Skwabble
					</a>
				</div>
			</div>

			<div class="play-meta">
				<h3>Playing with friends</h3>
				<ol>
					<li>Choose <strong>Create private room</strong> on the home screen</li>
					<li>Send the <strong>invite link</strong>, or read out the five-letter code</li>
					<li>Set the pace and house rules, then start once two or more are in</li>
				</ol>

				<h3 class="mt-6">Good to know</h3>
				<ul>
					<li>Desktop or phone, any modern browser</li>
					<li>A keyboard is the fastest way to steal</li>
					<li>Sound effects on by default <span>(one click to mute)</span></li>
				</ul>
			</div>
		</div>
	</section>

	<!-- ── FAQ ──────────────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="faq" aria-labelledby="faq-heading">
		<p class="eyebrow">FAQ</p>
		<h2 id="faq-heading" class="section-h">Questions</h2>

		<div class="faq">
			{#each faq as item, i}
				<div class="faq-item" class:is-open={openFaq === i}>
					<h3>
						<button
							aria-expanded={openFaq === i}
							onclick={() => (openFaq = openFaq === i ? null : i)}
						>
							<span>{item.q}</span>
							<span class="chev" aria-hidden="true">+</span>
						</button>
					</h3>
					{#if openFaq === i}
						<p>{item.a}</p>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- ── Footer ───────────────────────────────────────────────────────── -->
	<footer class="wrap px-6 pt-8 pb-16">
		<div class="foot">
			<p>
				Skwabble is an independent personal project and is not affiliated with Scrabble, Hasbro or
				Mattel. Words are checked against ENABLE, a public-domain word list.
			</p>
			<p>
				Built by <a href="/">Larry Amiel</a> ·
				<a href={PLAY_URL} target="_blank" rel="noopener">skwabble.larryamiel.dev</a>
			</p>
		</div>
	</footer>
</div>

<style>
	.sk {
		--bg: #0a0b17;
		--pink: #ff4d8d;
		--cyan: #2ec5ff;
		--violet: #a24dff;
		--amber: #f5a524;
		--green: #22c55e;
		--red: #e11d2e;
		--tile: #f4e4c1;
		--tile-edge: #cdb483;
		--ink: #1b1530;
		--line: rgba(140, 150, 255, 0.16);

		position: relative;
		color: rgba(238, 240, 255, 0.7);
		background: var(--bg);
		font-family: 'Outfit', sans-serif;
		overflow-x: clip;
	}

	/* layout.css sets Raleway on every bare p / span / heading. Skwabble speaks
	   Outfit for body copy and Chakra Petch for display, like the game itself.
	   :where keeps this at one class of specificity — enough to beat layout.css,
	   never enough to beat a real rule like .tile or .display. */
	:global(.sk :where(p, span, h1, h2, h3, h4, h5)) {
		font-family: inherit;
	}

	/* ---- background: the game's violet / cyan / pink glow over a faint grid ---- */

	.ambient {
		position: absolute;
		inset: 0 0 auto;
		height: 130vh;
		z-index: 0;
		pointer-events: none;
		overflow: clip;
	}

	/* Not .grid — that is a Tailwind utility the page layout uses. */
	.lines {
		position: absolute;
		inset: 0;
		opacity: 0.35;
		background-image:
			linear-gradient(rgba(140, 150, 255, 0.12) 1px, transparent 1px),
			linear-gradient(90deg, rgba(140, 150, 255, 0.12) 1px, transparent 1px);
		background-size: 56px 56px;
		mask-image: radial-gradient(ellipse at 40% 30%, #000, transparent 75%);
		-webkit-mask-image: radial-gradient(ellipse at 40% 30%, #000, transparent 75%);
	}

	.glow {
		position: absolute;
		border-radius: 999px;
		filter: blur(120px);
	}
	.glow-a {
		width: 620px;
		height: 520px;
		left: -8%;
		top: -12%;
		background: rgba(120, 60, 255, 0.4);
	}
	.glow-b {
		width: 560px;
		height: 480px;
		right: -10%;
		top: 40vh;
		background: rgba(46, 197, 255, 0.2);
	}
	.glow-c {
		width: 420px;
		height: 360px;
		right: 22%;
		top: -8%;
		background: rgba(255, 77, 141, 0.18);
	}

	/* Everything after the background layer stacks above it. */
	.sk > :global(:not(.ambient)) {
		position: relative;
		z-index: 1;
	}

	.wrap {
		width: 100%;
		max-width: 1200px;
		margin-inline: auto;
	}

	/* ---- tiles ---- */

	.tile {
		--s: 44px;
		position: relative;
		display: inline-grid;
		place-items: center;
		flex: none;
		width: var(--s);
		height: var(--s);
		border-radius: calc(var(--s) * 0.16);
		background: linear-gradient(180deg, #fbf0d6, var(--tile));
		color: var(--ink);
		font-family: 'Rubik', sans-serif;
		font-weight: 800;
		font-size: calc(var(--s) * 0.58);
		line-height: 1;
		box-shadow:
			0 calc(var(--s) * 0.08) 0 var(--tile-edge),
			0 14px 30px rgba(0, 0, 0, 0.4);
	}

	.tile-b {
		position: absolute;
		right: 9%;
		bottom: 5%;
		font-family: 'Chakra Petch', sans-serif;
		font-size: 0.32em;
		font-weight: 700;
		opacity: 0.75;
	}

	.tile-m {
		position: absolute;
		top: -14%;
		right: -14%;
		padding: 0.08em 0.3em;
		border-radius: 0.3em;
		background: var(--red);
		color: #fff;
		font-family: 'Chakra Petch', sans-serif;
		font-size: 0.3em;
		font-weight: 700;
	}

	.tile.down {
		background: linear-gradient(145deg, #313775, #262a5c);
		color: rgba(160, 170, 255, 0.4);
		border: 2px solid rgba(140, 150, 255, 0.3);
		box-shadow:
			0 calc(var(--s) * 0.07) 0 #151838,
			0 14px 30px rgba(0, 0, 0, 0.4);
		font-family: 'Chakra Petch', sans-serif;
		font-size: calc(var(--s) * 0.42);
	}

	.tile.x2 {
		color: var(--red);
		box-shadow:
			0 calc(var(--s) * 0.08) 0 #b3202b,
			0 0 28px rgba(225, 29, 46, 0.45);
	}

	.tile.amber {
		background: #a8700c;
		color: #fff4dc;
		border: 2px solid var(--amber);
		box-shadow:
			0 calc(var(--s) * 0.08) 0 #6f4a06,
			0 0 24px rgba(245, 165, 36, 0.35);
	}

	.tile.green {
		background: #15803d;
		color: #eafff0;
		border: 2px solid var(--green);
		box-shadow:
			0 calc(var(--s) * 0.08) 0 #0c4f25,
			0 0 24px rgba(34, 197, 94, 0.4);
	}

	.drift {
		position: absolute;
		opacity: 0.55;
		rotate: var(--r);
		animation: bob 7s ease-in-out infinite alternate;
	}
	.drift:nth-of-type(odd) {
		animation-duration: 9s;
	}

	@keyframes bob {
		to {
			translate: 0 -14px;
		}
	}

	/* ---- hero ---- */

	.back {
		font-size: 12px;
		color: rgba(238, 240, 255, 0.4);
		transition: color 0.15s ease;
	}
	.back:hover {
		color: var(--pink);
	}

	.hero {
		display: grid;
		align-items: center;
		gap: 3.5rem;
		grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.1fr);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(238, 240, 255, 0.65);
		border: 1px solid rgba(140, 150, 255, 0.3);
		background: rgba(22, 25, 52, 0.6);
		border-radius: 999px;
		padding: 6px 13px;
	}

	.live-dot {
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: var(--green);
		box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		70% {
			box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
		}
	}

	.logo {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.logo .tile {
		--s: clamp(34px, 5vw, 52px);
	}
	.logo .tile:nth-child(odd) {
		rotate: -4deg;
		translate: 0 3px;
	}
	.logo .tile:nth-child(even) {
		rotate: 3deg;
	}

	.display {
		display: flex;
		flex-direction: column;
		font-family: 'Chakra Petch', sans-serif;
		font-weight: 700;
		font-size: clamp(2.2rem, 4.8vw, 3.8rem);
		line-height: 1.02;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: #eef0ff;
	}
	.display span {
		font-family: inherit;
	}

	.hot {
		background: linear-gradient(90deg, var(--pink), var(--violet));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.lede {
		font-size: 1.0625rem;
		line-height: 1.75;
		max-width: 34rem;
	}

	.fine {
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		color: rgba(238, 240, 255, 0.38);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		border-radius: 10px;
		padding: 12px 20px;
		font-family: 'Chakra Petch', sans-serif;
		font-weight: 700;
		font-size: 0.95rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
	}
	.btn:hover {
		transform: translateY(-2px);
	}

	.btn-primary {
		background: linear-gradient(90deg, var(--pink), var(--violet));
		color: #fff;
		box-shadow: 0 14px 30px -14px rgba(255, 77, 141, 0.9);
	}
	.btn-primary:hover {
		box-shadow: 0 18px 36px -12px rgba(255, 77, 141, 1);
	}

	.btn-ghost {
		color: #eef0ff;
		border: 1px solid rgba(140, 150, 255, 0.35);
		background: rgba(22, 25, 52, 0.5);
	}
	.btn-ghost:hover {
		border-color: var(--cyan);
	}

	.hero-shot {
		position: relative;
		padding-bottom: 2.5rem;
	}

	.phone {
		display: block;
		padding: 7px;
		border-radius: 30px;
		background: #05060f;
		border: 2px solid #2b2f55;
		box-shadow:
			0 40px 80px -20px rgba(0, 0, 0, 0.8),
			0 0 50px -10px rgba(46, 197, 255, 0.35);
	}
	.phone img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 23px;
	}

	.hero-phone {
		position: absolute;
		right: -4%;
		bottom: -6%;
		width: 24%;
		rotate: 4deg;
	}

	.sticker {
		position: absolute;
		top: -2.2rem;
		right: 18%;
		font-family: 'Chakra Petch', sans-serif;
		font-weight: 700;
		font-size: clamp(1.8rem, 3.4vw, 2.8rem);
		text-transform: uppercase;
		color: var(--amber);
		text-shadow: 0 0 36px rgba(245, 165, 36, 0.8);
		rotate: -8deg;
	}

	/* ---- stats ---- */

	.stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
		border-radius: 14px;
		overflow: hidden;
	}
	.stat {
		background: #0e1024;
		padding: 1.6rem 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}
	.stat-n {
		font-family: 'Chakra Petch', sans-serif;
		font-size: 2.1rem;
		font-weight: 700;
		color: var(--cyan);
		line-height: 1;
	}
	.stat-l {
		font-size: 0.82rem;
		color: rgba(238, 240, 255, 0.48);
		line-height: 1.45;
	}

	/* ---- the steal ---- */

	.steal-card {
		display: grid;
		gap: 2.5rem;
		align-items: center;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
		padding: 2.5rem;
		border-radius: 18px;
		border: 1px solid var(--line);
		background:
			radial-gradient(120% 140% at 100% 0%, rgba(162, 77, 255, 0.14), transparent 60%),
			rgba(22, 25, 52, 0.45);
	}

	/* Stacked on purpose: the two parts on top, the stolen word underneath. */
	.equation {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
	}
	.eq-row {
		display: flex;
		align-items: flex-end;
		gap: 0.7rem;
	}
	.down-arrow {
		padding-bottom: 0;
		line-height: 1;
	}
	.eq-group {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.eq-label {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(238, 240, 255, 0.45);
	}
	.eq-tiles {
		display: flex;
		gap: 5px;
	}
	.eq-tiles .tile {
		--s: clamp(30px, 3.6vw, 42px);
	}
	.op {
		padding-bottom: 0.45rem;
		font-family: 'Chakra Petch', sans-serif;
		font-size: 1.8rem;
		font-weight: 700;
		color: #8b90b8;
	}

	/* ---- divider: a run of face-down tiles instead of the home page's stripe ---- */

	.band-strip {
		display: block;
		height: 14px;
		background: repeating-linear-gradient(
			90deg,
			var(--pink) 0 22px,
			var(--violet) 22px 44px,
			var(--cyan) 44px 66px,
			var(--amber) 66px 88px,
			var(--green) 88px 110px
		);
		opacity: 0.5;
		mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
	}

	/* ---- section headings ---- */

	.eyebrow {
		font-family: 'Chakra Petch', sans-serif;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--pink);
	}
	.section-h {
		margin-top: 0.5rem;
		font-family: 'Chakra Petch', sans-serif;
		font-weight: 700;
		font-size: clamp(1.7rem, 3.2vw, 2.5rem);
		color: #eef0ff;
		line-height: 1.1;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
	.section-h span {
		font-family: inherit;
	}
	.section-sub {
		margin-top: 0.9rem;
		max-width: 46rem;
		line-height: 1.75;
	}

	.pink {
		color: var(--pink);
	}
	.cyan {
		color: var(--cyan);
	}
	.amber {
		color: var(--amber);
	}
	.em {
		color: rgba(238, 240, 255, 0.92);
	}

	/* ---- tour ---- */

	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 2rem;
	}
	.tab {
		font-size: 0.84rem;
		font-weight: 600;
		padding: 8px 15px;
		border-radius: 999px;
		border: 1px solid rgba(140, 150, 255, 0.25);
		color: rgba(238, 240, 255, 0.62);
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.tab:hover {
		color: #fff;
		border-color: rgba(140, 150, 255, 0.55);
	}
	.tab.is-active {
		background: var(--cyan);
		border-color: var(--cyan);
		color: #06121c;
	}

	.tour-panel {
		margin-top: 2.5rem;
		display: grid;
		gap: 2.5rem;
		align-items: start;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
	}

	.tour-copy,
	.tour-shot {
		animation: fade 0.35s ease both;
	}
	@keyframes fade {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}

	.tour-h {
		margin-top: 0.6rem;
		font-size: 1.6rem;
		font-weight: 600;
		color: #fff;
		line-height: 1.25;
	}
	.tour-body {
		margin-top: 0.9rem;
		line-height: 1.75;
	}
	.tour-list {
		margin-top: 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.tour-list li {
		position: relative;
		padding-left: 1.4rem;
		font-size: 0.9rem;
		line-height: 1.6;
		color: rgba(238, 240, 255, 0.6);
	}
	.tour-list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.45em;
		width: 9px;
		height: 9px;
		border-radius: 2px;
		background: var(--tile);
		box-shadow: 0 2px 0 var(--tile-edge);
	}

	.tour-phone {
		width: min(300px, 70%);
		margin-inline: auto;
		cursor: zoom-in;
	}
	.tour-phone:focus-visible {
		outline: 2px solid var(--cyan);
		outline-offset: 3px;
	}

	/* ---- video ---- */

	.video-frame {
		margin-top: 2rem;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid rgba(140, 150, 255, 0.28);
		background: #0e1024;
		box-shadow:
			0 40px 90px -30px rgba(0, 0, 0, 0.85),
			0 0 70px -20px rgba(120, 80, 255, 0.35);
	}
	.video-frame video {
		display: block;
		width: 100%;
		height: auto;
	}

	/* ---- rules ---- */

	.group-h {
		font-family: 'Chakra Petch', sans-serif;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--cyan);
		padding-bottom: 0.8rem;
		border-bottom: 1px solid var(--line);
	}
	.feature-grid {
		margin-top: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.feature {
		border: 1px solid rgba(140, 150, 255, 0.12);
		border-radius: 10px;
		padding: 0.95rem 1.1rem;
		background: rgba(22, 25, 52, 0.35);
		transition:
			border-color 0.18s ease,
			background 0.18s ease,
			transform 0.18s ease;
	}
	.feature:hover {
		border-color: rgba(255, 77, 141, 0.5);
		background: rgba(255, 77, 141, 0.06);
		transform: translateX(4px);
	}
	.feature strong {
		display: block;
		color: #fff;
		font-size: 0.95rem;
		font-weight: 600;
		margin-bottom: 0.3rem;
	}
	.feature span {
		font-size: 0.86rem;
		line-height: 1.6;
		color: rgba(238, 240, 255, 0.52);
	}

	/* ---- gallery: the portrait phone shot takes two rows so the grid stays full ---- */

	.gallery {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 14px;
	}
	.thumb {
		position: relative;
		display: block;
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid rgba(140, 150, 255, 0.18);
		cursor: zoom-in;
		padding: 0;
		background: #0e1024;
		transition:
			border-color 0.18s ease,
			transform 0.18s ease;
	}
	.thumb:hover {
		border-color: var(--pink);
		transform: translateY(-3px);
	}
	.thumb img {
		display: block;
		width: 100%;
		height: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		object-position: top;
	}
	.thumb.tall {
		order: -1;
		grid-row: span 2;
	}
	.thumb.tall img {
		aspect-ratio: auto;
	}
	.thumb-label {
		position: absolute;
		left: 8px;
		bottom: 8px;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #fff;
		background: rgba(10, 11, 23, 0.78);
		border-radius: 5px;
		padding: 3px 8px;
	}

	/* ---- stack ---- */

	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}
	.stack li {
		border-left: 2px solid rgba(255, 77, 141, 0.55);
		padding: 0.5rem 0 0.5rem 1rem;
	}
	.stack strong {
		display: block;
		font-family: 'Chakra Petch', sans-serif;
		font-weight: 700;
		color: #fff;
		font-size: 0.95rem;
		margin-bottom: 0.25rem;
	}
	.stack span {
		font-size: 0.86rem;
		line-height: 1.6;
		color: rgba(238, 240, 255, 0.52);
	}

	/* ---- play card ---- */

	.play-card {
		display: grid;
		gap: 3rem;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		border: 1px solid var(--line);
		border-radius: 18px;
		padding: 2.5rem;
		background:
			radial-gradient(120% 140% at 0% 0%, rgba(255, 77, 141, 0.12), transparent 60%),
			radial-gradient(120% 140% at 100% 100%, rgba(46, 197, 255, 0.1), transparent 60%),
			rgba(22, 25, 52, 0.4);
	}
	.play-meta h3 {
		font-family: 'Chakra Petch', sans-serif;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(238, 240, 255, 0.4);
		margin-bottom: 0.8rem;
	}
	.play-meta ol,
	.play-meta ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.9rem;
	}
	.play-meta ol {
		list-style: decimal;
		padding-left: 1.2rem;
	}
	.play-meta ol li::marker {
		color: var(--cyan);
		font-weight: 700;
	}
	.play-meta strong {
		color: #fff;
		font-weight: 600;
	}
	.play-meta ul span {
		color: rgba(238, 240, 255, 0.38);
	}

	/* ---- FAQ ---- */

	.faq {
		margin-top: 2rem;
		border-top: 1px solid var(--line);
	}
	.faq-item {
		border-bottom: 1px solid var(--line);
	}
	.faq-item button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		text-align: left;
		padding: 1.15rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: rgba(238, 240, 255, 0.88);
		cursor: pointer;
		transition: color 0.15s ease;
	}
	.faq-item button:hover {
		color: var(--cyan);
	}
	.chev {
		flex: none;
		font-size: 1.3rem;
		color: var(--pink);
		transition: transform 0.2s ease;
	}
	.faq-item.is-open .chev {
		transform: rotate(45deg);
	}
	.faq-item p {
		padding: 0 0 1.3rem;
		max-width: 52rem;
		line-height: 1.75;
		font-size: 0.94rem;
		animation: fade 0.25s ease both;
	}

	/* ---- footer ---- */

	.foot {
		border-top: 1px solid var(--line);
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: 0.82rem;
		color: rgba(238, 240, 255, 0.38);
		line-height: 1.7;
	}
	.foot p {
		font-size: inherit;
	}
	.foot a {
		color: rgba(238, 240, 255, 0.65);
	}
	.foot a:hover {
		color: var(--pink);
	}

	@media (max-width: 1024px) {
		/* Placed in vh, so on a long single-column page they land on the copy. */
		.drift {
			display: none;
		}
		.hero,
		.tour-panel,
		.steal-card,
		.play-card {
			grid-template-columns: minmax(0, 1fr);
		}
		.hero-shot {
			margin-top: 1rem;
		}
		.stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.gallery {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.steal-card,
		.play-card {
			padding: 1.75rem;
		}
	}

	@media (max-width: 640px) {
		.stats {
			grid-template-columns: minmax(0, 1fr);
		}
		.gallery {
			grid-template-columns: minmax(0, 1fr);
		}
		.thumb.tall {
			grid-row: auto;
		}
		.thumb.tall img {
			aspect-ratio: 16 / 10;
		}
		.hero-phone {
			right: -2%;
			width: 28%;
		}
		.sticker {
			top: -1.8rem;
			right: 8%;
		}
		.section-h {
			font-size: 1.6rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.drift,
		.live-dot {
			animation: none;
		}
	}
</style>
