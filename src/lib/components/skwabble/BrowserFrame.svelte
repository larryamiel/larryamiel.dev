<script lang="ts">
	// Skwabble is a web game, so its screenshots sit in a browser window with
	// the real address in the bar — the counterpart to Ballview's AppFrame.
	let {
		src,
		alt,
		url = 'skwabble.larryamiel.dev',
		loading = 'lazy',
		onclick = undefined
	}: {
		src: string;
		alt: string;
		url?: string;
		loading?: 'eager' | 'lazy';
		onclick?: (() => void) | undefined;
	} = $props();
</script>

<figure class="browser">
	<div class="bar">
		<span class="dot"></span>
		<span class="dot"></span>
		<span class="dot"></span>
		<span class="address">{url}</span>
	</div>

	{#if onclick}
		<button type="button" class="shot-button" {onclick} aria-label="Open larger: {alt}">
			<img {src} {alt} {loading} decoding="async" width="1440" height="900" />
			<span class="zoom" aria-hidden="true">Expand</span>
		</button>
	{:else}
		<img {src} {alt} {loading} decoding="async" width="1440" height="900" />
	{/if}
</figure>

<style>
	.browser {
		margin: 0;
		border-radius: 14px;
		overflow: hidden;
		background: #0e1024;
		border: 1px solid rgba(140, 150, 255, 0.28);
		box-shadow:
			0 40px 90px -30px rgba(0, 0, 0, 0.85),
			0 0 70px -20px rgba(120, 80, 255, 0.35);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 9px 12px;
		background: #15183a;
		border-bottom: 1px solid rgba(140, 150, 255, 0.18);
	}

	.dot {
		width: 9px;
		height: 9px;
		border-radius: 999px;
		flex: none;
		background: #ff5f57;
	}
	.dot:nth-child(2) {
		background: #febc2e;
	}
	.dot:nth-child(3) {
		background: #28c840;
	}

	/* layout.css puts Raleway on bare spans; the address bar wants the UI face. */
	.address {
		margin-left: 12px;
		padding: 3px 12px;
		border-radius: 7px;
		background: rgba(0, 0, 0, 0.28);
		font-family: 'Outfit', sans-serif;
		font-size: 11px;
		color: #8b90b8;
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
		font-family: 'Chakra Petch', sans-serif;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #fff;
		background: rgba(10, 11, 23, 0.75);
		border: 1px solid rgba(140, 150, 255, 0.3);
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
		outline: 2px solid #2ec5ff;
		outline-offset: 2px;
	}
</style>
