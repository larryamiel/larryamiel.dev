<script lang="ts">
	import { onMount } from 'svelte';
	import { places } from '$lib/constants/places.js';

	/**
	 * A wireframe globe you can actually grab: drag to spin it, fling it and it
	 * carries, click a marker (or pick a place from the readout panel) and it
	 * rotates that point to face you. All CSS 3D — no WebGL dependency.
	 *
	 * The parent owns which place is selected, so the readout and the globe
	 * never disagree about what you are looking at.
	 */
	let {
		selected = 0,
		onselect = (_index: number) => {}
	}: { selected?: number; onselect?: (index: number) => void } = $props();

	const RADIUS = 250;
	const MERIDIANS = 12;
	const PARALLELS = [-60, -30, 0, 30, 60];
	const DRIFT = 0.045; // deg per frame when nobody is touching it
	const REST_TILT = -10;

	let spin = $state(0);
	let tilt = $state(REST_TILT);
	let dragging = $state(false);
	let reduced = $state(false);

	// Frame-by-frame bookkeeping. Nothing renders from these directly, so they
	// stay out of the reactive graph.
	let hasMoved = false;
	let targetSpin = 0;
	let targetTilt = REST_TILT;
	let easing = false;
	let velocity = 0;
	let pointerId: number | null = null;
	let lastX = 0;
	let lastY = 0;

	const rad = (deg: number) => (deg * Math.PI) / 180;

	/** Wrap an angle delta into (-180, 180] so easing always takes the short way. */
	function shortest(delta: number) {
		return ((((delta + 180) % 360) + 360) % 360) - 180;
	}

	/**
	 * Where each marker ends up after the globe's own rotation.
	 * z > 0 is the near hemisphere; anything else sits behind the wireframe and
	 * must not be clickable.
	 */
	const projected = $derived(
		places.map((place) => {
			const la = rad(place.lat);
			const lo = rad(place.lon);

			// Marker's own transform: rotateY(lon) rotateX(lat) translateZ(R).
			const x0 = Math.cos(la) * Math.sin(lo);
			const y0 = -Math.sin(la);
			const z0 = Math.cos(la) * Math.cos(lo);

			// Globe transform: rotateX(tilt) rotateY(spin) — rightmost applies first.
			const s = rad(spin);
			const x1 = x0 * Math.cos(s) + z0 * Math.sin(s);
			const z1 = -x0 * Math.sin(s) + z0 * Math.cos(s);

			const t = rad(tilt);
			const z2 = y0 * Math.sin(t) + z1 * Math.cos(t);

			return { front: z2 > 0.05, depth: (z2 + 1) / 2, x: x1 };
		})
	);

	/** Turn `index` toward the viewer. */
	function faceTo(index: number) {
		const place = places[index];
		if (!place) return;

		targetSpin = spin + shortest(-place.lon - spin);
		targetTilt = Math.max(-28, Math.min(28, -place.lat));
		easing = true;
		velocity = 0;
	}

	function pick(index: number) {
		if (hasMoved) return;
		onselect(index);
		faceTo(index);
	}

	// Selecting a place anywhere on the page is the same move as clicking its
	// marker here.
	$effect(() => {
		faceTo(selected);
	});

	onMount(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let frame = requestAnimationFrame(function tick() {
			frame = requestAnimationFrame(tick);
			if (dragging) return;

			if (easing) {
				const ds = shortest(targetSpin - spin);
				const dt = targetTilt - tilt;
				spin += ds * 0.09;
				tilt += dt * 0.09;
				if (Math.abs(ds) < 0.2 && Math.abs(dt) < 0.2) easing = false;
				return;
			}

			if (Math.abs(velocity) > 0.03) {
				spin += velocity;
				velocity *= 0.95;
			} else if (!reduced) {
				spin += DRIFT;
			}

			tilt += (REST_TILT - tilt) * 0.02;
		});

		return () => cancelAnimationFrame(frame);
	});

	function down(event: PointerEvent) {
		if (event.pointerType === 'mouse' && event.button !== 0) return;

		dragging = true;
		hasMoved = false;
		easing = false;
		velocity = 0;
		pointerId = event.pointerId;
		lastX = event.clientX;
		lastY = event.clientY;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function move(event: PointerEvent) {
		if (!dragging || event.pointerId !== pointerId) return;

		const dx = event.clientX - lastX;
		const dy = event.clientY - lastY;
		lastX = event.clientX;
		lastY = event.clientY;

		if (Math.abs(dx) + Math.abs(dy) > 2) hasMoved = true;

		spin += dx * 0.35;
		tilt = Math.max(-42, Math.min(42, tilt - dy * 0.25));
		velocity = dx * 0.35;
	}

	function up(event: PointerEvent) {
		if (event.pointerId !== pointerId) return;

		dragging = false;
		pointerId = null;
	}

	function keys(event: KeyboardEvent) {
		const step = event.shiftKey ? 24 : 8;

		if (event.key === 'ArrowLeft') spin -= step;
		else if (event.key === 'ArrowRight') spin += step;
		else if (event.key === 'ArrowUp') tilt = Math.max(-42, tilt - step / 2);
		else if (event.key === 'ArrowDown') tilt = Math.min(42, tilt + step / 2);
		else return;

		event.preventDefault();
		easing = false;
		velocity = 0;
	}
</script>

<div class="orb" class:dragging>
	<!-- The retro sun the globe hangs in front of. -->
	<div class="sun" aria-hidden="true">
		<span class="sun-face"></span>
		<span class="sun-slats"></span>
		<span class="sun-ring ring-1"></span>
		<span class="sun-ring ring-2"></span>
		<span class="sun-ring ring-3"></span>
	</div>

	<div
		class="grab"
		role="slider"
		tabindex="0"
		aria-label="Globe rotation. Drag it or use the arrow keys to spin. Markers select a place."
		aria-valuemin={0}
		aria-valuemax={360}
		aria-valuenow={Math.round(((spin % 360) + 360) % 360)}
		aria-valuetext="Facing {places[selected].country}"
		onpointerdown={down}
		onpointermove={move}
		onpointerup={up}
		onpointercancel={up}
		onkeydown={keys}
	>
		<div
			class="globe"
			style:--r="{RADIUS}px"
			style:transform="rotateX({tilt}deg) rotateY({spin}deg)"
		>
			{#each { length: MERIDIANS } as _, index}
				<span class="meridian" style:transform="rotateY({(index * 180) / MERIDIANS}deg)"></span>
			{/each}

			{#each PARALLELS as lat}
				<span
					class="parallel"
					style:--scale={Math.cos(rad(lat))}
					style:--offset="{-Math.sin(rad(lat)) * RADIUS}px"
				></span>
			{/each}

			{#each places as place, index}
				<button
					class="marker"
					class:front={projected[index].front}
					class:active={selected === index}
					style:transform="rotateY({place.lon}deg) rotateX({place.lat}deg) translateZ({RADIUS}px)"
					style:--depth={projected[index].depth}
					aria-label="{place.city}, {place.country}"
					aria-pressed={selected === index}
					onclick={() => pick(index)}
				>
					<span class="dot"></span>
					<span class="halo"></span>
				</button>
			{/each}
		</div>
	</div>

	<span class="hint space-mono" aria-hidden="true">drag the globe</span>
</div>

<style>
	.orb {
		position: relative;
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		/* The globe keeps its full layout box even when scaled down for small
		   screens — clip it here so it never widens the document. */
		overflow: clip;
	}

	/* ---- sun ---- */

	.sun {
		position: absolute;
		width: min(70vw, 430px);
		aspect-ratio: 1;
		border-radius: 999px;
		transform: translateY(-5%);
	}

	.sun-face {
		position: absolute;
		inset: 0;
		border-radius: 999px;
		background: linear-gradient(180deg, #ffd27a 0%, #f6a03c 34%, #e8642c 68%, #b32f2c 100%);
		box-shadow: 0 0 140px 20px rgba(232, 100, 44, 0.28);
	}

	/* Slats cut out of the lower half — the 70s sunset print. */
	.sun-slats {
		position: absolute;
		inset: 0;
		border-radius: 999px;
		background: repeating-linear-gradient(
			180deg,
			rgba(20, 14, 10, 0) 0 11px,
			rgba(20, 14, 10, 0.94) 11px 18px
		);
		mask-image: linear-gradient(180deg, transparent 44%, #000 64%);
		-webkit-mask-image: linear-gradient(180deg, transparent 44%, #000 64%);
	}

	.sun-ring {
		position: absolute;
		inset: -7%;
		border-radius: 999px;
		border: 1px solid rgba(246, 160, 60, 0.2);
	}

	.ring-2 {
		inset: -17%;
		border-color: rgba(246, 160, 60, 0.12);
	}

	.ring-3 {
		inset: -29%;
		border-color: rgba(246, 160, 60, 0.06);
	}

	/* ---- globe ---- */

	.grab {
		position: relative;
		width: min(96vw, 620px);
		height: min(96vw, 620px);
		display: grid;
		place-items: center;
		perspective: 1200px;
		touch-action: none;
		cursor: grab;
		border-radius: 999px;
		outline-offset: 10px;
	}

	.grab:focus-visible {
		outline: 2px dashed #f6a03c;
	}

	.orb.dragging .grab {
		cursor: grabbing;
	}

	.globe {
		position: relative;
		width: calc(var(--r) * 2);
		height: calc(var(--r) * 2);
		transform-style: preserve-3d;
		will-change: transform;
	}

	.meridian,
	.parallel {
		position: absolute;
		inset: 0;
		border-radius: 999px;
		pointer-events: none;
	}

	.meridian {
		border: 1px solid rgba(255, 210, 122, 0.3);
	}

	.parallel {
		border: 1px solid rgba(246, 227, 198, 0.22);
		transform: rotateX(90deg) translateZ(var(--offset)) scale(var(--scale));
	}

	.marker {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 26px;
		height: 26px;
		margin: -13px 0 0 -13px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		opacity: calc(0.16 + var(--depth) * 0.84);
		pointer-events: none;
	}

	.marker.front {
		pointer-events: auto;
	}

	.dot {
		position: absolute;
		inset: 7px;
		border-radius: 999px;
		background: #f6e3c6;
		box-shadow:
			0 0 0 2px rgba(23, 17, 12, 0.75),
			0 0 12px rgba(246, 227, 198, 0.6);
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.marker.front:hover .dot,
	.marker:focus-visible .dot {
		transform: scale(1.55);
		background: #ffd27a;
	}

	.marker.active .dot {
		background: #ff7a2f;
		box-shadow: 0 0 16px rgba(255, 122, 47, 0.9);
	}

	.halo {
		position: absolute;
		inset: 0;
		border-radius: 999px;
		border: 1px solid transparent;
	}

	.marker.active .halo {
		border-color: rgba(255, 122, 47, 0.7);
		animation: ping 2.2s ease-out infinite;
	}

	@keyframes ping {
		0% {
			transform: scale(0.55);
			opacity: 0.9;
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.hint {
		position: absolute;
		bottom: 4%;
		left: 50%;
		translate: -50% 0;
		font-size: 0.6rem;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: rgba(246, 227, 198, 0.32);
		pointer-events: none;
		transition: opacity 0.3s ease;
	}

	.orb.dragging .hint {
		opacity: 0;
	}

	@media only screen and (max-width: 768px) {
		.globe {
			scale: 0.6;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marker.active .halo {
			animation: none;
		}
	}
</style>
