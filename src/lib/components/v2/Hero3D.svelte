<script lang="ts">
	import { onMount } from 'svelte';
	import profileImage from '$lib/assets/profile.png';
	import { profile, skillIcons } from '$lib/constants/profile.js';

	/**
	 * The 3D scene: a stack of glass panes at different depths that parallax
	 * against the pointer. All CSS transforms — no WebGL, no extra dependency.
	 */
	let scene: HTMLDivElement | null = $state(null);
	let px = $state(0);
	let py = $state(0);
	let reduced = $state(false);

	const orbit = [
		'Laravel',
		'Vue.js',
		'React',
		'Next.js',
		'Node.js',
		'AWS',
		'MySQL',
		'Python'
	] as const;

	onMount(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function track(event: PointerEvent) {
		if (event.pointerType !== 'mouse' || !scene || reduced) return;

		const rect = scene.getBoundingClientRect();
		px = (event.clientX - rect.left) / rect.width - 0.5;
		py = (event.clientY - rect.top) / rect.height - 0.5;
	}

	function release() {
		px = 0;
		py = 0;
	}
</script>

<div
	class="hero"
	bind:this={scene}
	onpointermove={track}
	onpointerleave={release}
	style:--px={px}
	style:--py={py}
>
	<div class="copy">
		<span class="eyebrow space-mono">
			<span class="pulse" aria-hidden="true"></span>
			Available for senior full stack work
		</span>

		<h1 class="jumbo">
			<span class="line">Larry Amiel</span>
			<span class="line accent">builds the half</span>
			<span class="line">that has to hold.</span>
		</h1>

		<p class="lede">{profile.summary}</p>

		<div class="actions">
			<a class="btn primary" href="#work">See the work</a>
			<a class="btn ghost" href="#experience">Read the track record</a>
		</div>

		<dl class="stats">
			{#each profile.stats as stat}
				<div class="stat">
					<dt class="stat-value">{stat.value}</dt>
					<dd class="stat-label">
						{stat.label}
						<span class="stat-sub">{stat.sub}</span>
					</dd>
				</div>
			{/each}
		</dl>
	</div>

	<div class="stage" aria-hidden="true">
		<div class="deck">
			<div class="pane pane-back"></div>
			<div class="pane pane-mid">
				<div class="orbit">
					{#each orbit as name, index}
						<span class="orbit-item" style:--i={index} style:--n={orbit.length}>
							<img src={skillIcons[name]} alt="" />
						</span>
					{/each}
				</div>
			</div>

			<div class="pane pane-front">
				<div class="badge">
					<img class="avatar" src={profileImage} alt="" />
					<div class="badge-text">
						<span class="badge-name">{profile.name}</span>
						<span class="badge-role space-mono">{profile.role}</span>
					</div>
				</div>

				<div class="terminal space-mono">
					<span class="prompt">~ whoami</span>
					<span class="out">full stack · architecture · billing systems</span>
					<span class="prompt">~ stack --top</span>
					<span class="out">laravel vue react next node aws</span>
					<span class="prompt">~ location</span>
					<span class="out">{profile.location}</span>
				</div>
			</div>

			<div class="floor"></div>
		</div>
	</div>
</div>

<style>
	.hero {
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		align-items: center;
		gap: 3rem;
		min-height: 82vh;
		padding: 7rem 0 5rem;
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.35rem 0.8rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 219, 88, 0.28);
		background: rgba(255, 219, 88, 0.06);
		color: #ffdb58;
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.pulse {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: #ffdb58;
		box-shadow: 0 0 0 0 rgba(255, 219, 88, 0.6);
		animation: pulse 2.4s ease-out infinite;
	}

	@keyframes pulse {
		70% {
			box-shadow: 0 0 0 8px rgba(255, 219, 88, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(255, 219, 88, 0);
		}
	}

	.jumbo {
		margin-top: 1.5rem;
		font-size: clamp(2.4rem, 4.6vw, 4rem);
		font-weight: 700;
		line-height: 1.02;
		color: #ffffff;
		letter-spacing: -0.02em;
	}

	.line {
		display: block;
	}

	.accent {
		background: linear-gradient(100deg, #ff4b4b, #ffdb58 60%, #4bffff);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.lede {
		margin-top: 1.6rem;
		max-width: 34rem;
		color: rgba(255, 255, 255, 0.62);
		font-size: 1.02rem;
		line-height: 1.75;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.75rem 1.4rem;
		border-radius: 999px;
		font-weight: 700;
		font-size: 0.9rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			border-color 0.2s ease,
			background 0.2s ease;
	}

	.btn:hover,
	.btn:focus-visible {
		transform: translateY(-2px);
	}

	.primary {
		background: #ff4b4b;
		color: #1a1918;
	}

	.primary:hover {
		box-shadow: 0 14px 30px -12px rgba(255, 75, 75, 0.9);
	}

	.ghost {
		border: 1px solid rgba(255, 255, 255, 0.16);
		color: rgba(255, 255, 255, 0.82);
	}

	.ghost:hover {
		border-color: rgba(255, 255, 255, 0.4);
		background: rgba(255, 255, 255, 0.04);
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 2.25rem;
		margin-top: 3rem;
		padding-top: 1.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.stat-value {
		color: #ffffff;
		font-size: 1.9rem;
		font-weight: 700;
		line-height: 1;
	}

	.stat-label {
		margin: 0.35rem 0 0;
		color: rgba(255, 255, 255, 0.62);
		font-size: 0.8rem;
	}

	.stat-sub {
		display: block;
		color: rgba(255, 255, 255, 0.3);
		font-size: 0.7rem;
		margin-top: 0.15rem;
	}

	/* ---- 3D stage ---- */

	.stage {
		perspective: 1400px;
		perspective-origin: 50% 45%;
	}

	.deck {
		position: relative;
		height: 460px;
		transform-style: preserve-3d;
		transform: rotateX(calc(var(--py, 0) * -10deg)) rotateY(calc(var(--px, 0) * 16deg));
		transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.pane {
		position: absolute;
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.09);
		backdrop-filter: blur(6px);
		transform-style: preserve-3d;
	}

	.pane-back {
		inset: 6% 14% 22% -4%;
		background: linear-gradient(150deg, rgba(255, 75, 75, 0.14), rgba(255, 75, 75, 0));
		transform: translateZ(-120px) rotate(-7deg);
	}

	.pane-mid {
		inset: 2% -6% 30% 16%;
		background: linear-gradient(150deg, rgba(75, 255, 255, 0.1), rgba(75, 255, 255, 0));
		transform: translateZ(-40px) rotate(5deg);
		overflow: hidden;
	}

	.pane-front {
		inset: 26% 2% 4% 4%;
		padding: 1.35rem;
		background: linear-gradient(155deg, rgba(41, 41, 40, 0.94), rgba(29, 28, 27, 0.94));
		transform: translateZ(70px);
		box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.95);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.badge {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		transform: translateZ(30px);
	}

	.avatar {
		width: 46px;
		height: 46px;
		border-radius: 999px;
		object-fit: cover;
		border: 1px solid rgba(255, 255, 255, 0.16);
	}

	.badge-name {
		display: block;
		color: #ffffff;
		font-weight: 700;
		font-size: 0.95rem;
	}

	.badge-role {
		display: block;
		color: #ff4b4b;
		font-size: 0.65rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin-top: 0.15rem;
	}

	.terminal {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 0.9rem;
		border-radius: 12px;
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.06);
		transform: translateZ(18px);
		font-size: 0.68rem;
		line-height: 1.5;
	}

	.prompt {
		color: #ffdb58;
	}

	.out {
		color: rgba(255, 255, 255, 0.55);
		margin-bottom: 0.35rem;
	}

	/* Icons laid out on a ring, each one counter-rotated so it stays upright. */
	.orbit {
		position: absolute;
		inset: 0;
		animation: spin 34s linear infinite;
	}

	.orbit-item {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 38px;
		height: 38px;
		margin: -19px 0 0 -19px;
		border-radius: 11px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(37, 36, 35, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.08);
		transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateX(96px);
	}

	.orbit-item img {
		width: 20px;
		height: 20px;
		transform: rotate(calc(var(--i) * (-360deg / var(--n))));
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.floor {
		position: absolute;
		inset: auto -20% -22% -20%;
		height: 260px;
		transform: rotateX(74deg) translateZ(-60px);
		background:
			linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px) 0 0 / 100% 34px,
			linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px) 0 0 / 34px 100%;
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.85), transparent 72%);
		-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.85), transparent 72%);
		pointer-events: none;
	}

	@media only screen and (max-width: 1024px) {
		.hero {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 5rem 0 3rem;
			min-height: 0;
		}

		.deck {
			height: 380px;
		}
	}

	@media only screen and (max-width: 768px) {
		.stage {
			display: none;
		}

		.stats {
			gap: 1.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.deck {
			transform: none;
		}

		.orbit,
		.pulse {
			animation: none;
		}
	}
</style>
