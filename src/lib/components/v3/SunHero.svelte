<script lang="ts">
	import { onMount } from 'svelte';
	import moment from 'moment-timezone';

	import SunGlobe from './SunGlobe.svelte';
	import { places, weatherUrl } from '$lib/constants/places.js';
	import { profile } from '$lib/constants/profile.js';

	/**
	 * Centered hero: the wordmark in front, the sun and the draggable globe
	 * behind it, and a readout panel showing the selected place's local date,
	 * time and temperature.
	 */
	let selected = $state(0);
	let now = $state(moment());
	let temps = $state<Record<string, number | null>>({});

	const place = $derived(places[selected]);
	const local = $derived(now.clone().tz(place.tz));
	const time = $derived(local.format('HH:mm:ss'));
	const date = $derived(local.format('ddd DD MMM YYYY'));
	const offset = $derived(local.format('[UTC]Z'));
	const temp = $derived(temps[place.id]);

	/** Fetched once per place and kept — the number moves far slower than the clock. */
	async function loadWeather(id: string) {
		if (id in temps) return;

		const target = places.find((entry) => entry.id === id);
		if (!target) return;

		temps = { ...temps, [id]: null };

		try {
			const response = await fetch(weatherUrl(target));
			if (!response.ok) throw new Error(String(response.status));

			const data = await response.json();
			temps = { ...temps, [id]: data?.current?.temperature_2m ?? null };
		} catch {
			temps = { ...temps, [id]: null };
		}
	}

	$effect(() => {
		loadWeather(place.id);
	});

	onMount(() => {
		const timer = setInterval(() => (now = moment()), 1000);
		return () => clearInterval(timer);
	});
</script>

<section class="hero">
	<div class="stage" aria-hidden="false">
		<SunGlobe {selected} onselect={(index) => (selected = index)} />
	</div>

	<div class="copy">
		<span class="eyebrow space-mono">
			<span class="pulse"></span>
			Available for senior full stack work
		</span>

		<h1 class="wordmark">
			<span class="word">LARRY</span>
			<span class="word hollow">AMIEL</span>
		</h1>

		<p class="tagline space-mono">
			larryamiel<span class="tld">.dev</span> · {profile.role}
		</p>

		<p class="lede">
			I build the parts of a product that have to keep working — the architecture underneath it, the
			billing that has to be right, the reports someone depends on to do their job.
		</p>

		<div class="actions">
			<a class="btn solid" href="#work">See the work</a>
			<a class="btn hollow-btn" href="#contact">Start a conversation</a>
		</div>
	</div>

	<!-- Live readout for whatever point of the globe is facing you. -->
	<div class="readout">
		<div class="dial">
			<!-- Outline of whatever the globe is facing, as the dial's backplate. -->
			<img class="dial-map" src={place.map} alt="" aria-hidden="true" />
			<span class="dial-label space-mono">{place.country}</span>
			<span class="dial-time space-mono">{time}</span>
			<span class="dial-meta space-mono">
				{date} · {offset}
				<span class="temp">
					{#if temp === null || temp === undefined}—{:else}{Math.round(temp)}°C{/if}
				</span>
			</span>
			<span class="dial-city space-mono">
				{place.city}{#if place.home}<span class="home"> · home</span>{/if}
			</span>
		</div>

		<div class="chips" role="group" aria-label="Pick a place">
			{#each places as entry, index}
				<button
					class="chip space-mono"
					class:on={selected === index}
					aria-pressed={selected === index}
					onclick={() => (selected = index)}
				>
					{entry.id.toUpperCase()}
				</button>
			{/each}
		</div>
	</div>

	<div class="scroll space-mono" aria-hidden="true">scroll ↓</div>
</section>

<style>
	.hero {
		position: relative;
		/* Stretch, not centre-to-content: a centred grid/flex item is sized to
		   max-content and long lines then push past the viewport on phones. */
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		min-height: min(100vh, 900px);
		padding: 6rem 0 4rem;
		text-align: center;
		isolation: isolate;
	}

	.stage {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		z-index: 0;
		overflow: clip;
	}

	.copy {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
		width: 100%;
		max-width: 46rem;
		margin-inline: auto;
		/* The globe lives underneath — only the real controls take the pointer. */
		pointer-events: none;
	}

	/* Scrim under the body copy only — the wordmark wants the sun at full strength. */
	.lede {
		position: relative;
		isolation: isolate;
	}

	.lede::before {
		content: '';
		position: absolute;
		inset: -1.4rem -3rem;
		z-index: -1;
		background: radial-gradient(
			closest-side,
			rgba(20, 14, 10, 0.88),
			rgba(20, 14, 10, 0.5) 60%,
			transparent 100%
		);
		filter: blur(12px);
		pointer-events: none;
	}

	.copy :is(a, button) {
		pointer-events: auto;
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.35rem 0.85rem;
		border-radius: 999px;
		border: 1px solid rgba(246, 160, 60, 0.35);
		background: rgba(20, 14, 10, 0.55);
		backdrop-filter: blur(6px);
		color: #ffd27a;
		font-size: 0.64rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.pulse {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: #ff7a2f;
		box-shadow: 0 0 0 0 rgba(255, 122, 47, 0.7);
		animation: pulse 2.4s ease-out infinite;
	}

	@keyframes pulse {
		70% {
			box-shadow: 0 0 0 9px rgba(255, 122, 47, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(255, 122, 47, 0);
		}
	}

	.wordmark {
		display: flex;
		flex-direction: column;
		margin: 1.2rem 0 1.9rem;
		font-family: 'Anton', 'Raleway', sans-serif;
		font-size: clamp(3rem, 11vw, 8.5rem);
		line-height: 0.88;
		letter-spacing: 0.015em;
	}

	/* layout.css sets Raleway on every bare `span`, so the display face has to be
	   restated here rather than inherited from the heading. */
	.word {
		font-family: 'Anton', 'Raleway', sans-serif;
		color: #f6e3c6;
		text-shadow: 0 10px 40px rgba(20, 14, 10, 0.75);
	}

	/* Second line reads as a cut-out, so the sun shows through the type. */
	.word.hollow {
		color: transparent;
		-webkit-text-stroke: 2px #f6e3c6;
		text-shadow: none;
	}

	.tagline {
		max-width: 100%;
		font-size: 0.72rem;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: rgba(246, 227, 198, 0.72);
		text-shadow: 0 2px 14px rgba(20, 14, 10, 0.9);
	}

	.tld {
		color: #ff7a2f;
	}

	.lede {
		margin-top: 1.4rem;
		max-width: 36rem;
		color: rgba(246, 227, 198, 0.66);
		font-size: 0.98rem;
		line-height: 1.75;
		text-shadow: 0 2px 18px rgba(20, 14, 10, 0.95);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.7rem;
		margin-top: 1.9rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.75rem 1.5rem;
		border-radius: 999px;
		font-weight: 700;
		font-size: 0.88rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			background 0.2s ease,
			color 0.2s ease;
	}

	.btn:hover,
	.btn:focus-visible {
		transform: translateY(-2px);
	}

	.solid {
		background: #ff7a2f;
		color: #17110c;
		box-shadow: 0 16px 34px -16px rgba(255, 122, 47, 0.95);
	}

	.hollow-btn {
		border: 1px solid rgba(246, 227, 198, 0.28);
		background: rgba(20, 14, 10, 0.5);
		color: rgba(246, 227, 198, 0.9);
		backdrop-filter: blur(6px);
	}

	.hollow-btn:hover {
		border-color: #ffd27a;
		color: #ffd27a;
	}

	/* ---- readout ---- */

	.readout {
		position: absolute;
		left: 0;
		bottom: 2rem;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		text-align: left;
	}

	.dial {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		isolation: isolate;
	}

	.dial-map {
		position: absolute;
		left: -2.5rem;
		bottom: -1rem;
		width: 260px;
		max-width: 60vw;
		z-index: -1;
		opacity: 0.65;
		/* The source outlines are red; push them into the sun palette. */
		filter: grayscale(1) sepia(1) saturate(5) hue-rotate(-12deg) brightness(1.05);
		pointer-events: none;
		animation: bob 8s ease-in-out infinite;
	}

	@keyframes bob {
		50% {
			transform: translateY(-8px);
		}
	}

	.dial-label {
		font-size: 0.62rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: rgba(246, 227, 198, 0.5);
	}

	.dial-time {
		font-size: clamp(2rem, 4.4vw, 3rem);
		font-weight: 700;
		line-height: 1;
		color: #ff7a2f;
		font-variant-numeric: tabular-nums;
	}

	.dial-meta {
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		color: rgba(246, 227, 198, 0.55);
	}

	.temp {
		color: #ffd27a;
		margin-left: 0.4rem;
	}

	.dial-city {
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		color: rgba(246, 227, 198, 0.4);
	}

	.home {
		color: #f6a03c;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.chip {
		padding: 0.3rem 0.6rem;
		border-radius: 6px;
		border: 1px solid rgba(246, 227, 198, 0.16);
		background: rgba(20, 14, 10, 0.55);
		color: rgba(246, 227, 198, 0.55);
		font-size: 0.62rem;
		letter-spacing: 0.12em;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.chip:hover,
	.chip:focus-visible {
		border-color: rgba(246, 160, 60, 0.6);
		color: #ffd27a;
	}

	.chip.on {
		border-color: #ff7a2f;
		background: rgba(255, 122, 47, 0.16);
		color: #ffd27a;
	}

	.scroll {
		position: absolute;
		right: 0;
		bottom: 2.4rem;
		z-index: 2;
		font-size: 0.6rem;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: rgba(246, 227, 198, 0.32);
		animation: nudge 2.6s ease-in-out infinite;
	}

	@keyframes nudge {
		50% {
			transform: translateY(5px);
		}
	}

	@media only screen and (max-width: 900px) {
		.hero {
			padding: 4.5rem 0 3rem;
			min-height: 0;
		}

		.readout,
		.scroll {
			position: static;
		}

		.readout {
			align-items: center;
			margin-top: 2.5rem;
			text-align: center;
		}

		.tagline {
			font-size: 0.6rem;
			letter-spacing: 0.16em;
		}

		.lede {
			font-size: 0.92rem;
		}

		.dial-map {
			left: 50%;
			bottom: -1.5rem;
			translate: -50% 0;
			width: 200px;
			opacity: 0.4;
		}

		.dial {
			align-items: center;
		}

		.chips {
			justify-content: center;
		}

		.scroll {
			margin-top: 1.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pulse,
		.scroll {
			animation: none;
		}
	}
</style>
