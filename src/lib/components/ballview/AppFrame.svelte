<script lang="ts">
	// The real Windows title bar is cropped out of every screenshot so the shots
	// stay clean; this draws a tidier one back on, so a screenshot still reads as
	// a desktop app rather than a floating rectangle.
	let {
		src,
		alt,
		label = 'Ballview — Play By Play',
		loading = 'lazy',
		onclick = undefined,
		class: klass = ''
	}: {
		src: string;
		alt: string;
		label?: string;
		loading?: 'eager' | 'lazy';
		onclick?: (() => void) | undefined;
		class?: string;
	} = $props();
</script>

<figure class="app-frame {klass}">
	<div class="chrome">
		<span class="dot" style="background:#ff4b4b"></span>
		<span class="dot" style="background:#ffdb58"></span>
		<span class="dot" style="background:#4bffff"></span>
		<span class="space-mono label">{label}</span>
	</div>

	{#if onclick}
		<button type="button" class="shot-button" {onclick} aria-label="Open larger: {alt}">
			<img {src} {alt} {loading} decoding="async" width="1440" height="750" />
			<span class="zoom space-mono" aria-hidden="true">Expand</span>
		</button>
	{:else}
		<img {src} {alt} {loading} decoding="async" width="1440" height="750" />
	{/if}
</figure>

<style>
	.app-frame {
		margin: 0;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: #0b0d12;
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.06) inset,
			0 30px 60px -20px rgba(0, 0, 0, 0.8);
	}

	.chrome {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 9px 12px;
		background: #16181f;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
	}

	.dot {
		width: 9px;
		height: 9px;
		border-radius: 999px;
		opacity: 0.75;
		flex: none;
	}

	.label {
		margin-left: 10px;
		font-size: 11px;
		letter-spacing: 0.04em;
		color: rgba(255, 255, 255, 0.4);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
	}

	.shot-button {
		display: block;
		width: 100%;
		position: relative;
		cursor: zoom-in;
		padding: 0;
		border: 0;
		background: none;
	}

	.zoom {
		position: absolute;
		right: 10px;
		bottom: 10px;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #fff;
		background: rgba(0, 0, 0, 0.65);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 6px;
		padding: 4px 9px;
		opacity: 0;
		transition: opacity 0.18s ease;
	}

	.shot-button:hover .zoom,
	.shot-button:focus-visible .zoom {
		opacity: 1;
	}

	.shot-button:focus-visible {
		outline: 2px solid #4bffff;
		outline-offset: 2px;
	}
</style>
