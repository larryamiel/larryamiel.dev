<script lang="ts">
	let { shots = [], index = $bindable(-1) } = $props();

	const open = $derived(index >= 0 && index < shots.length);
	const current = $derived(open ? shots[index] : null);

	function close() {
		index = -1;
	}

	function step(by: number) {
		if (!open) return;
		index = (index + by + shots.length) % shots.length;
	}

	function onkeydown(event: KeyboardEvent) {
		if (!open) return;
		if (event.key === 'Escape') close();
		if (event.key === 'ArrowRight') step(1);
		if (event.key === 'ArrowLeft') step(-1);
	}
</script>

<svelte:window on:keydown={onkeydown} />

{#if open && current}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="backdrop"
		role="dialog"
		aria-modal="true"
		aria-label={current.alt}
		tabindex="-1"
		onclick={close}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="stage" onclick={(e) => e.stopPropagation()}>
			<img src={current.shot} alt={current.alt} />
			<p class="caption space-mono">
				<span class="text-secondary-color">{index + 1}/{shots.length}</span>
				{current.title}
			</p>
		</div>

		<button
			class="nav prev"
			onclick={(e) => {
				e.stopPropagation();
				step(-1);
			}}
			aria-label="Previous screenshot">‹</button
		>
		<button
			class="nav next"
			onclick={(e) => {
				e.stopPropagation();
				step(1);
			}}
			aria-label="Next screenshot">›</button
		>
		<button class="close" onclick={close} aria-label="Close">✕</button>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 60;
		background: rgba(10, 10, 12, 0.94);
		backdrop-filter: blur(6px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem 1rem;
	}

	.stage {
		max-width: 1200px;
		width: 100%;
	}

	.stage img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.9);
	}

	.caption {
		margin-top: 0.9rem;
		text-align: center;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.65);
	}

	.nav,
	.close {
		position: absolute;
		color: #fff;
		background: rgba(255, 255, 255, 0.07);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 999px;
		cursor: pointer;
		line-height: 1;
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.nav:hover,
	.close:hover {
		background: rgba(255, 75, 75, 0.22);
		border-color: #ff4b4b;
	}

	.nav {
		top: 50%;
		transform: translateY(-50%);
		width: 44px;
		height: 44px;
		font-size: 28px;
		padding-bottom: 4px;
	}

	.prev {
		left: 1rem;
	}
	.next {
		right: 1rem;
	}

	.close {
		top: 1rem;
		right: 1rem;
		width: 38px;
		height: 38px;
		font-size: 15px;
	}

	@media (max-width: 768px) {
		.nav {
			top: auto;
			bottom: 1rem;
			transform: none;
		}
	}
</style>
