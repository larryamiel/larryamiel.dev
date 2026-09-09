<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Reveals children once they scroll into view. Falls back to "visible"
	 * immediately when IntersectionObserver is unavailable or motion is reduced,
	 * so content is never trapped behind an effect that cannot run.
	 */
	let {
		children,
		delay = 0,
		y = 24,
		class: className = ''
	}: { children: Snippet; delay?: number; y?: number; class?: string } = $props();

	let el: HTMLDivElement | null = $state(null);
	let shown = $state(false);

	onMount(() => {
		if (
			!el ||
			typeof IntersectionObserver === 'undefined' ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			shown = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						shown = true;
						observer.disconnect();
					}
				}
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={el}
	class="reveal {className}"
	class:shown
	style:--reveal-delay="{delay}ms"
	style:--reveal-y="{y}px"
>
	{@render children()}
</div>

<style>
	.reveal {
		opacity: 0;
		transform: translate3d(0, var(--reveal-y, 24px), 0);
		transition:
			opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms),
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms);
	}

	.reveal.shown {
		opacity: 1;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
