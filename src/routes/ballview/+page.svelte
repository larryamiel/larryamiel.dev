<script lang="ts">
	import AppFrame from '$lib/components/ballview/AppFrame.svelte';
	import Lightbox from '$lib/components/ballview/Lightbox.svelte';
	import Squiggle from '$lib/components/Squiggle.svelte';
	import IconGithub from '$lib/assets/icon_github.svg';

	import {
		REPO_URL,
		RELEASES_URL,
		CANONICAL,
		tour,
		featureGroups,
		faq,
		stack
	} from '$lib/constants/ballview.js';

	const TITLE = 'Ballview — Free MLB Play-by-Play & Pitch Tracking App for Windows';
	const DESCRIPTION =
		'Ballview is a free, open-source Windows desktop app for following Major League Baseball pitch by pitch — live scores, strike-zone pitch tracking, Statcast batted-ball data, box scores, player leaderboards and MLB highlight clips, with every game saveable offline.';
	const OG_IMAGE = `${CANONICAL.replace('/ballview', '')}/ballview/shots/live-view.png`;

	let active = $state(0);
	let lightbox = $state(-1);
	let openFaq = $state<number | null>(0);

	const current = $derived(tour[active]);

	const softwareSchema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Ballview',
		alternateName: 'Ballview — Play By Play',
		applicationCategory: 'SportsApplication',
		applicationSubCategory: 'Baseball',
		operatingSystem: 'Windows 10, Windows 11',
		url: CANONICAL,
		downloadUrl: RELEASES_URL,
		softwareVersion: '0.1.0',
		description: DESCRIPTION,
		screenshot: OG_IMAGE,
		author: { '@type': 'Person', name: 'Larry Amiel', url: 'https://larryamiel.dev' },
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		featureList: [
			'Live MLB scoreboard and play-by-play',
			'Pitch-by-pitch strike zone tracking',
			'Statcast batted ball data',
			'Full box scores',
			'Player stat leaderboards and comparison charts',
			'MLB highlight clips and Baseball Savant pitch video',
			'Offline saved games'
		]
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
			{ '@type': 'ListItem', position: 2, name: 'Ballview', item: CANONICAL }
		]
	};
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="title" content={TITLE} />
	<meta name="description" content={DESCRIPTION} />
	<meta
		name="keywords"
		content="MLB play by play app, baseball pitch tracking software, MLB desktop app Windows, free baseball stats app, Statcast app, MLB box score app, baseball highlights app, pitch by pitch MLB tracker, MLB Stats API app, open source baseball app"
	/>
	<link rel="canonical" href={CANONICAL} />
	<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={CANONICAL} />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:site_name" content="larryamiel.dev" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={CANONICAL} />
	<meta property="twitter:title" content={TITLE} />
	<meta property="twitter:description" content={DESCRIPTION} />
	<meta property="twitter:image" content={OG_IMAGE} />

	{@html `<script type="application/ld+json">${JSON.stringify(softwareSchema)}</` + `script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</` + `script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</` + `script>`}
</svelte:head>

<Lightbox shots={tour} bind:index={lightbox} />

<div class="bv">
	<!-- Same sun-faded ground as the home page. -->
	<div class="ambient" aria-hidden="true">
		<span class="sun">
			<span class="sun-face"></span>
			<span class="sun-slats"></span>
		</span>
		<div class="orb-stage">
			<div class="orb">
				{#each [0, 1, 2, 3, 4, 5, 6, 7] as ring}
					<span style:transform="rotateY({ring * 22.5}deg)"></span>
				{/each}
			</div>
		</div>

		<span class="haze"></span>
		<span class="horizon"></span>
	</div>

	<!-- ── Hero ─────────────────────────────────────────────────────────── -->
	<header class="wrap px-6 pt-10 pb-4 lg:pt-16">
		<a href="/" class="back space-mono">← larryamiel.dev</a>

		<div class="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
			<div>
				<p class="pill space-mono">
					<span class="live-dot"></span> Free · Open source · Windows desktop
				</p>

				<h1 class="display mt-5">
					Ballview.<br />
					Major League Baseball,<br />
					<span class="text-primary-color">pitch by pitch.</span>
				</h1>

				<div class="my-6 max-w-[240px]">
					<Squiggle length={240} />
				</div>

				<p class="lede">
					A desktop app for people who watch baseball closely. Ballview follows every MLB game as it
					happens — the pitch on the strike zone, its velocity and break, where the ball was hit and
					who fielded it — then keeps the whole game on your own disk so you can replay it later.
				</p>

				<div class="mt-8 flex flex-wrap gap-3">
					<a class="btn btn-primary" href={RELEASES_URL} target="_blank" rel="noopener">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"
							><path
								fill="currentColor"
								d="M12 3v10.6l3.3-3.3 1.4 1.4L12 16.4l-4.7-4.7 1.4-1.4 3.3 3.3V3h2ZM5 19h14v2H5v-2Z"
							/></svg
						>
						Download for Windows
					</a>
					<a class="btn btn-ghost" href={REPO_URL} target="_blank" rel="noopener">
						<img src={IconGithub} alt="" width="18" height="18" aria-hidden="true" />
						View on GitHub
					</a>
				</div>

				<p class="space-mono mt-4 text-xs text-white/35">
					Windows 10 / 11 · NSIS installer · no account, no subscription
				</p>
			</div>

			<AppFrame
				src={tour[0].shot}
				alt={tour[0].alt}
				loading="eager"
				label="Ballview — Play By Play · Live"
			/>
		</div>
	</header>

	<!-- ── Stat strip ───────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-14" aria-label="At a glance">
		<div class="stats">
			{#each [['15s', 'live refresh, live games only'], ['30', 'clubs, any one of them yours'], ['0', 'databases — plain JSON on disk'], ['1', 'file per exported game']] as [n, label]}
				<div class="stat">
					<span class="space-mono stat-n">{n}</span>
					<span class="stat-l">{label}</span>
				</div>
			{/each}
		</div>
	</section>

	<div class="band" aria-hidden="true"><span class="band-strip"></span></div>

	<!-- ── Interactive tour ─────────────────────────────────────────────── -->
	<section class="wrap px-6 py-10" id="tour" aria-labelledby="tour-heading">
		<p class="eyebrow space-mono">The tour</p>
		<h2 id="tour-heading" class="section-h">
			Twelve screens, <span class="text-secondary-color">one app</span>
		</h2>
		<p class="section-sub">
			Pick a screen. Everything here is real data from a real September slate — no mockups.
		</p>

		<div class="tabs" role="tablist" aria-label="Ballview screens">
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
					<p class="eyebrow space-mono text-tertiary-color">{current.kicker}</p>
					<h3 class="tour-h">{current.title}</h3>
					<p class="tour-body">{current.body}</p>
					<ul class="tour-list">
						{#each current.bullets as b}
							<li>{b}</li>
						{/each}
					</ul>
				</div>

				<div class="tour-shot">
					<AppFrame
						src={current.shot}
						alt={current.alt}
						label="Ballview — {current.tab}"
						onclick={() => (lightbox = active)}
					/>
				</div>
			{/key}
		</div>
	</section>

	<!-- ── Feature list ─────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="features" aria-labelledby="features-heading">
		<p class="eyebrow space-mono">Features</p>
		<h2 id="features-heading" class="section-h">
			Everything Ballview <span class="text-primary-color">does</span>
		</h2>
		<p class="section-sub">
			Live baseball, your team's whole season, league-wide player stats, and the video to go with
			it.
		</p>

		<div class="mt-10 grid gap-10 lg:grid-cols-2">
			{#each featureGroups as g}
				<div>
					<h3 class="group-h space-mono">{g.group}</h3>
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
		<p class="eyebrow space-mono">Screenshots</p>
		<h2 id="shots-heading" class="section-h">
			Every screen, <span class="text-tertiary-color">full size</span>
		</h2>
		<p class="section-sub">Click any shot to open it. Arrow keys move through the set.</p>

		<div class="gallery">
			{#each tour as t, i}
				<button class="thumb" onclick={() => (lightbox = i)}>
					<img src={t.shot} alt={t.alt} loading="lazy" decoding="async" />
					<span class="thumb-label space-mono">{t.tab}</span>
				</button>
			{/each}
		</div>
	</section>

	<!-- ── Under the hood ───────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="build" aria-labelledby="build-heading">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
			<div>
				<p class="eyebrow space-mono">Under the hood</p>
				<h2 id="build-heading" class="section-h">How it's built</h2>
				<p class="section-sub">
					Two rules hold the design together. <span class="text-white/80"
						>The frontend makes no network requests</span
					> — everything goes through a Rust command, which sidesteps CORS and keeps every MLB URL in
					one module. And the frontend never touches the filesystem: it asks you to pick a path, then
					hands that path to Rust, so the app's file permissions stay narrow and read-only.
				</p>
				<p class="section-sub mt-4">
					The MLB Stats API is reverse-engineered, undocumented and unversioned. Ballview is built
					for that: every model field is optional, so an upstream rename breaks one corner of the UI
					instead of the whole parse, and the test suite runs against genuine captured responses so
					a field change is caught before you see it.
				</p>
			</div>

			<ul class="stack">
				{#each stack as [name, desc]}
					<li>
						<strong class="space-mono">{name}</strong>
						<span>{desc}</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- ── Download ─────────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="download" aria-labelledby="dl-heading">
		<div class="dl-card">
			<div>
				<p class="eyebrow space-mono text-secondary-color">Download</p>
				<h2 id="dl-heading" class="section-h !mt-2">Get Ballview</h2>
				<p class="section-sub max-w-xl">
					Grab the latest Windows installer from GitHub Releases, or clone the repository and build
					it yourself. Either way it's free, and there's nothing to sign up for.
				</p>

				<div class="mt-7 flex flex-wrap gap-3">
					<a class="btn btn-primary" href={RELEASES_URL} target="_blank" rel="noopener">
						Download the installer
					</a>
					<a class="btn btn-ghost" href={REPO_URL} target="_blank" rel="noopener">
						<img src={IconGithub} alt="" width="18" height="18" aria-hidden="true" />
						Source on GitHub
					</a>
				</div>
			</div>

			<div class="dl-meta">
				<h3 class="space-mono">Requirements</h3>
				<ul>
					<li>Windows 10 or 11</li>
					<li>WebView2 runtime <span>(preinstalled on Windows 11)</span></li>
					<li>An internet connection for live games</li>
				</ul>

				<h3 class="space-mono mt-6">Build it yourself</h3>
				<pre class="space-mono"><code
						>git clone {REPO_URL}
cd ballview
npm install
npm run tauri build</code
					></pre>
			</div>
		</div>
	</section>

	<!-- ── FAQ ──────────────────────────────────────────────────────────── -->
	<section class="wrap px-6 py-16" id="faq" aria-labelledby="faq-heading">
		<p class="eyebrow space-mono">FAQ</p>
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
				Ballview is unofficial and unaffiliated with Major League Baseball. It reads publicly
				accessible MLB endpoints for personal use. Clip availability and geographic restrictions are
				MLB's, not Ballview's.
			</p>
			<p class="space-mono">
				Built by <a href="/">Larry Amiel</a> ·
				<a href={REPO_URL} target="_blank" rel="noopener">github.com/larryamiel/ballview</a>
			</p>
		</div>
	</footer>
</div>

<style>
	.bv {
		position: relative;
		color: rgba(255, 255, 255, 0.72);
		background:
			radial-gradient(900px 500px at 50% 0%, rgba(255, 75, 75, 0.1), transparent 65%), #252423;
		overflow-x: clip;
	}

	/* ---- retro sun and wireframe orb, borrowed from the home page but wearing
	   Ballview's own red / yellow / cyan instead of the sunset palette ---- */

	.ambient {
		position: absolute;
		inset: 0 0 auto;
		height: 120vh;
		z-index: 0;
		pointer-events: none;
		overflow: clip;
	}

	.sun {
		position: absolute;
		top: -22vh;
		left: 50%;
		translate: -50% 0;
		width: min(74vw, 560px);
		aspect-ratio: 1;
		border-radius: 999px;
		opacity: 0.2;
	}

	.sun-face {
		position: absolute;
		inset: 0;
		border-radius: 999px;
		background: linear-gradient(180deg, #ffe89a 0%, #ffdb58 34%, #ff6a4b 70%, #b3252f 100%);
	}

	.sun-slats {
		position: absolute;
		inset: 0;
		border-radius: 999px;
		background: repeating-linear-gradient(
			180deg,
			rgba(37, 36, 35, 0) 0 12px,
			rgba(37, 36, 35, 0.95) 12px 20px
		);
		mask-image: linear-gradient(180deg, transparent 40%, #000 60%);
		-webkit-mask-image: linear-gradient(180deg, transparent 40%, #000 60%);
	}

	/* Decorative only — the home page's globe without the interaction. */
	.orb-stage {
		position: absolute;
		top: -10vh;
		left: 50%;
		translate: -50% 0;
		width: min(96vw, 780px);
		aspect-ratio: 1;
		perspective: 1200px;
	}

	.orb {
		position: absolute;
		inset: 0;
		transform-style: preserve-3d;
		animation: orbit 48s linear infinite;
	}

	.orb span {
		position: absolute;
		inset: 0;
		border-radius: 999px;
		border: 1px solid rgba(255, 219, 88, 0.13);
	}

	.orb span:nth-child(odd) {
		border-color: rgba(75, 255, 255, 0.1);
	}

	@keyframes orbit {
		to {
			transform: rotateY(360deg);
		}
	}

	.haze {
		position: absolute;
		right: -10%;
		top: 30vh;
		width: 520px;
		height: 520px;
		border-radius: 999px;
		background: rgba(75, 255, 255, 0.12);
		filter: blur(130px);
	}

	.horizon {
		position: absolute;
		left: 0;
		right: 0;
		top: 62vh;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 219, 88, 0.3) 20%,
			rgba(255, 219, 88, 0.3) 80%,
			transparent
		);
	}

	/* Everything after the background layer stacks above it. */
	.bv > :global(:not(.ambient)) {
		position: relative;
		z-index: 1;
	}

	/* ---- retro display type ---- */

	/* layout.css sets Raleway on every bare `span`, so headline spans need the
	   display face restated rather than inherited. */
	.display span,
	.section-h span {
		font-family: 'Anton', 'Raleway', sans-serif;
	}

	.display {
		font-family: 'Anton', 'Raleway', sans-serif;
		font-size: clamp(2.4rem, 5.4vw, 4.2rem);
		line-height: 1.02;
		letter-spacing: 0.01em;
		text-transform: uppercase;
		color: #fff;
	}

	/* The global .container is a hard 1200px that only collapses under 768px,
	   so it overflows at tablet widths. This one is fluid all the way down. */
	.wrap {
		width: 100%;
		max-width: 1200px;
		margin-inline: auto;
	}

	.back {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.4);
		transition: color 0.15s ease;
	}
	.back:hover {
		color: #ff4b4b;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.6);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 999px;
		padding: 6px 13px;
	}

	.live-dot {
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: #ff4b4b;
		box-shadow: 0 0 0 0 rgba(255, 75, 75, 0.7);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		70% {
			box-shadow: 0 0 0 8px rgba(255, 75, 75, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(255, 75, 75, 0);
		}
	}

	.lede {
		font-size: 1.0625rem;
		line-height: 1.75;
		max-width: 34rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		border-radius: 8px;
		padding: 12px 20px;
		font-weight: 700;
		font-size: 0.95rem;
		transition:
			transform 0.15s ease,
			background 0.15s ease,
			border-color 0.15s ease;
	}
	.btn:hover {
		transform: translateY(-2px);
	}

	.btn-primary {
		background: #ff4b4b;
		color: #1a1414;
	}
	.btn-primary:hover {
		background: #ff6363;
	}

	.btn-ghost {
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	.btn-ghost:hover {
		border-color: #ffdb58;
	}

	/* Stats */
	.stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1px;
		background: rgba(255, 255, 255, 0.09);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 12px;
		overflow: hidden;
	}
	.stat {
		background: #252423;
		padding: 1.6rem 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.stat-n {
		font-size: 2rem;
		font-weight: 700;
		color: #ffdb58;
		line-height: 1;
	}
	.stat-l {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.45);
		line-height: 1.45;
	}

	/* Woven-stripe divider, same motif as the home page. */
	.band-strip {
		display: block;
		height: 14px;
		background: repeating-linear-gradient(
			90deg,
			#ff4b4b 0 22px,
			#ffdb58 22px 44px,
			#ffdb58 44px 66px,
			#4bffff 66px 88px,
			#b3252f 88px 110px
		);
		opacity: 0.55;
		mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
	}

	/* Section headings */
	.eyebrow {
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #ffdb58;
	}
	.section-h {
		margin-top: 0.5rem;
		font-family: 'Anton', 'Raleway', sans-serif;
		font-size: clamp(1.7rem, 3.2vw, 2.4rem);
		color: #fff;
		line-height: 1.1;
		letter-spacing: 0.01em;
		text-transform: uppercase;
	}
	.section-sub {
		margin-top: 0.9rem;
		max-width: 46rem;
		line-height: 1.75;
	}

	/* Tabs */
	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 2rem;
	}
	.tab {
		font-size: 0.82rem;
		font-weight: 600;
		padding: 8px 15px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.13);
		color: rgba(255, 255, 255, 0.6);
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.tab:hover {
		color: #fff;
		border-color: rgba(255, 255, 255, 0.35);
	}
	.tab.is-active {
		background: #ff4b4b;
		border-color: #ff4b4b;
		color: #1a1414;
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
		font-weight: 700;
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
		color: rgba(255, 255, 255, 0.6);
	}
	.tour-list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55em;
		width: 7px;
		height: 7px;
		border-radius: 999px;
		border: 1.5px solid #ff4b4b;
	}

	/* Features */
	.group-h {
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #4bffff;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	.feature-grid {
		margin-top: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.feature {
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 10px;
		padding: 0.95rem 1.1rem;
		background: rgba(255, 255, 255, 0.015);
		transition:
			border-color 0.18s ease,
			background 0.18s ease,
			transform 0.18s ease;
	}
	.feature:hover {
		border-color: rgba(255, 219, 88, 0.45);
		background: rgba(255, 219, 88, 0.05);
		transform: translateX(4px);
	}
	.feature strong {
		display: block;
		color: #fff;
		font-size: 0.95rem;
		margin-bottom: 0.3rem;
	}
	.feature span {
		font-size: 0.85rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.5);
	}

	/* Gallery */
	.gallery {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 14px;
	}
	.thumb {
		position: relative;
		display: block;
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
		cursor: zoom-in;
		padding: 0;
		background: #0b0d12;
		transition:
			border-color 0.18s ease,
			transform 0.18s ease;
	}
	.thumb:hover {
		border-color: #ff4b4b;
		transform: translateY(-3px);
	}
	.thumb img {
		display: block;
		width: 100%;
		height: auto;
	}
	.thumb-label {
		position: absolute;
		left: 8px;
		bottom: 8px;
		font-size: 10px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #fff;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 5px;
		padding: 3px 8px;
	}

	/* Stack */
	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}
	.stack li {
		border-left: 2px solid rgba(255, 75, 75, 0.5);
		padding: 0.5rem 0 0.5rem 1rem;
	}
	.stack strong {
		display: block;
		color: #fff;
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
	}
	.stack span {
		font-size: 0.85rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.5);
	}

	/* Download */
	.dl-card {
		display: grid;
		gap: 3rem;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		padding: 2.5rem;
		background:
			radial-gradient(120% 140% at 0% 0%, rgba(255, 75, 75, 0.09), transparent 60%),
			rgba(255, 255, 255, 0.015);
	}
	.dl-meta h3 {
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.35);
		margin-bottom: 0.8rem;
	}
	.dl-meta ul {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		font-size: 0.88rem;
	}
	.dl-meta ul span {
		color: rgba(255, 255, 255, 0.35);
	}
	.dl-meta pre {
		background: #16181f;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		padding: 0.9rem 1rem;
		font-size: 0.78rem;
		line-height: 1.7;
		color: #4bffff;
		overflow-x: auto;
	}

	/* FAQ */
	.faq {
		margin-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}
	.faq-item {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
		color: rgba(255, 255, 255, 0.85);
		cursor: pointer;
		transition: color 0.15s ease;
	}
	.faq-item button:hover {
		color: #ffdb58;
	}
	.chev {
		flex: none;
		font-size: 1.3rem;
		color: #ff4b4b;
		transition: transform 0.2s ease;
	}
	.faq-item.is-open .chev {
		transform: rotate(45deg);
	}
	.faq-item p {
		padding: 0 0 1.3rem;
		max-width: 52rem;
		line-height: 1.75;
		font-size: 0.93rem;
		animation: fade 0.25s ease both;
	}

	/* Footer */
	.foot {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.35);
		line-height: 1.7;
	}
	.foot a {
		color: rgba(255, 255, 255, 0.6);
	}
	.foot a:hover {
		color: #ff4b4b;
	}

	@media (max-width: 1024px) {
		.tour-panel,
		.dl-card {
			grid-template-columns: minmax(0, 1fr);
		}
		.stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.gallery {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.dl-card {
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
		.section-h {
			font-size: 1.6rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.orb,
		.live-dot {
			animation: none;
		}
	}
</style>
