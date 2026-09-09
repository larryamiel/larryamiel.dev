<script lang="ts">
	import TiltCard from './TiltCard.svelte';
	import SkillChip from './SkillChip.svelte';

	let {
		experience,
		open = false,
		accent = '#FF4B4B',
		ontoggle
	}: {
		experience: {
			id: string;
			company: string;
			title: string;
			from: string;
			to: string;
			kind: string;
			summary: string;
			bullets: string[];
			skills: string[];
		};
		open?: boolean;
		accent?: string;
		ontoggle?: (id: string) => void;
	} = $props();

	const panelId = $derived(`xp-panel-${experience.id}`);
	const period = $derived(
		experience.from === experience.to ? experience.from : `${experience.from} — ${experience.to}`
	);
</script>

<div class="row">
	<div class="rail" aria-hidden="true">
		<span class="node" style:--accent={accent}></span>
	</div>

	<div class="body">
		<TiltCard {accent} max={4} lift={4}>
			<div class="card" style:--accent={accent}>
				<div class="head">
					<div class="head-main">
						<span class="period space-mono">{period}</span>
						<h3 class="title">{experience.title}</h3>
						<p class="company">
							{experience.company} <span class="dot">·</span>
							<span class="kind">{experience.kind}</span>
						</p>
					</div>

					<button
						class="toggle"
						class:open
						aria-expanded={open}
						aria-controls={panelId}
						onclick={() => ontoggle?.(experience.id)}
					>
						<span class="toggle-label">{open ? 'Less' : 'Details'}</span>
						<span class="caret" aria-hidden="true">▾</span>
					</button>
				</div>

				<p class="summary">{experience.summary}</p>

				<div id={panelId} class="panel" class:open>
					<div class="panel-inner">
						<ul class="bullets">
							{#each experience.bullets as bullet}
								<li>{bullet}</li>
							{/each}
						</ul>
					</div>
				</div>

				<div class="skills">
					{#each experience.skills as skill}
						<SkillChip name={skill} size="sm" />
					{/each}
				</div>
			</div>
		</TiltCard>
	</div>
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: 28px 1fr;
		gap: 1rem;
	}

	.rail {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.rail::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: -1.5rem;
		width: 1px;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04));
	}

	.node {
		position: relative;
		margin-top: 2rem;
		width: 9px;
		height: 9px;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent);
	}

	.card {
		position: relative;
		border-radius: 16px;
		padding: 1.5rem;
		background: linear-gradient(160deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015) 55%);
		border: 1px solid rgba(255, 255, 255, 0.08);
		transform-style: preserve-3d;
	}

	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		transform: translateZ(24px);
	}

	.period {
		display: block;
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 0.45rem;
	}

	.title {
		color: #ffffff;
		font-size: 1.15rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.company {
		margin-top: 0.25rem;
		color: rgba(255, 255, 255, 0.62);
		font-size: 0.85rem;
	}

	.dot {
		color: var(--accent);
	}

	.kind {
		color: rgba(255, 255, 255, 0.4);
	}

	.toggle {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.8rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.03);
		color: rgba(255, 255, 255, 0.7);
		font-family: 'Space Mono', monospace;
		font-size: 0.68rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.toggle:hover,
	.toggle:focus-visible {
		border-color: var(--accent);
		color: #ffffff;
	}

	.caret {
		display: inline-block;
		transition: transform 0.25s ease;
	}

	.toggle.open .caret {
		transform: rotate(180deg);
	}

	.summary {
		margin-top: 0.9rem;
		color: rgba(255, 255, 255, 0.72);
		font-size: 0.95rem;
		line-height: 1.65;
		transform: translateZ(14px);
	}

	/* grid-template-rows animates cleanly without measuring the content height. */
	.panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.panel.open {
		grid-template-rows: 1fr;
	}

	.panel-inner {
		overflow: hidden;
	}

	.bullets {
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		border-left: 1px solid rgba(255, 255, 255, 0.08);
		padding-left: 1rem;
	}

	.bullets li {
		position: relative;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.87rem;
		line-height: 1.6;
	}

	.bullets li::before {
		content: '';
		position: absolute;
		left: -1.0625rem;
		top: 0.6rem;
		width: 5px;
		height: 1px;
		background: var(--accent);
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 1.15rem;
		transform: translateZ(10px);
	}

	@media only screen and (max-width: 768px) {
		.row {
			grid-template-columns: 1fr;
		}

		.rail {
			display: none;
		}

		.card {
			padding: 1.15rem;
		}

		.head {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
