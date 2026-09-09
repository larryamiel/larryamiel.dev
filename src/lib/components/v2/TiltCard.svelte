<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Pointer-driven 3D tilt. The wrapper owns the perspective so children can
	 * use translateZ to sit at their own depth inside the card.
	 *
	 * Tilt is pointer-only by design: it never fires on touch (where there is no
	 * hover to preview it) and it is disabled entirely under prefers-reduced-motion.
	 */
	let {
		children,
		max = 7,
		lift = 6,
		glare = true,
		accent = '#FF4B4B',
		class: className = ''
	}: {
		children: Snippet;
		max?: number;
		lift?: number;
		glare?: boolean;
		accent?: string;
		class?: string;
	} = $props();

	let el: HTMLDivElement | null = $state(null);
	let rx = $state(0);
	let ry = $state(0);
	let gx = $state(50);
	let gy = $state(50);
	let active = $state(false);

	const reduced = () =>
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function onMove(event: PointerEvent) {
		if (event.pointerType !== 'mouse' || !el || reduced()) return;

		const rect = el.getBoundingClientRect();
		const px = (event.clientX - rect.left) / rect.width;
		const py = (event.clientY - rect.top) / rect.height;

		ry = (px - 0.5) * 2 * max;
		rx = -(py - 0.5) * 2 * max;
		gx = px * 100;
		gy = py * 100;
		active = true;
	}

	function reset() {
		rx = 0;
		ry = 0;
		active = false;
	}
</script>

<div
	bind:this={el}
	class="tilt {className}"
	class:active
	onpointermove={onMove}
	onpointerleave={reset}
	style:--rx="{rx}deg"
	style:--ry="{ry}deg"
	style:--lift="{active ? -lift : 0}px"
	style:--gx="{gx}%"
	style:--gy="{gy}%"
	style:--accent={accent}
>
	<div class="tilt-inner">
		{@render children()}
		{#if glare}
			<span class="glare" aria-hidden="true"></span>
		{/if}
	</div>
</div>

<style>
	.tilt {
		perspective: 1000px;
		height: 100%;
	}

	.tilt-inner {
		position: relative;
		height: 100%;
		transform-style: preserve-3d;
		transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translate3d(0, var(--lift, 0px), 0);
		transition:
			transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 0.35s ease;
		will-change: transform;
	}

	.tilt.active .tilt-inner {
		transition:
			transform 0.08s linear,
			box-shadow 0.35s ease;
		box-shadow:
			0 24px 60px -20px rgba(0, 0, 0, 0.75),
			0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent);
	}

	/* Specular highlight that follows the cursor across the surface. */
	.glare {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.35s ease;
		background: radial-gradient(
			420px circle at var(--gx, 50%) var(--gy, 50%),
			color-mix(in srgb, var(--accent) 18%, transparent),
			transparent 60%
		);
	}

	.tilt.active .glare {
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.tilt-inner,
		.tilt.active .tilt-inner {
			transform: none;
			transition: box-shadow 0.2s ease;
		}

		.glare {
			display: none;
		}
	}
</style>
