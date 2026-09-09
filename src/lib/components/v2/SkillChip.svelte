<script lang="ts">
	import { skillIcons } from '$lib/constants/profile.js';

	/** Renders an icon chip when we have an asset, and a text chip when we don't. */
	let { name, size = 'md' }: { name: string; size?: 'sm' | 'md' } = $props();

	const icon = $derived(skillIcons[name as keyof typeof skillIcons]);
</script>

<span class="chip {size}" class:text-only={!icon}>
	{#if icon}
		<img src={icon} alt="" aria-hidden="true" />
	{/if}
	<span class="label">{name}</span>
</span>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.65rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.035);
		white-space: nowrap;
		transition:
			border-color 0.2s ease,
			background 0.2s ease;
	}

	.chip:hover {
		border-color: rgba(255, 255, 255, 0.22);
		background: rgba(255, 255, 255, 0.07);
	}

	.chip img {
		width: 16px;
		height: 16px;
	}

	.chip .label {
		font-family: 'Space Mono', monospace;
		font-size: 0.7rem;
		letter-spacing: 0.02em;
		color: rgba(255, 255, 255, 0.72);
	}

	.chip.sm {
		padding: 0.2rem 0.5rem;
	}

	.chip.sm img {
		width: 13px;
		height: 13px;
	}

	.chip.sm .label {
		font-size: 0.63rem;
	}

	.chip.text-only .label {
		color: rgba(255, 255, 255, 0.55);
	}
</style>
