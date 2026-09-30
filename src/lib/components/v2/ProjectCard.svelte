<script lang="ts">
	import TiltCard from './TiltCard.svelte';
	import SkillChip from './SkillChip.svelte';

	let {
		project,
		featured = false,
		reverse = false
	}: {
		project: {
			id: string;
			name: string;
			kicker: string;
			year: string;
			blurb: string;
			highlights: string[];
			stack: string[];
			accent: string;
			href?: string;
			cta?: string;
			shot?: string;
		};
		featured?: boolean;
		/** Featured only: puts the screenshot on the left, for alternating rows. */
		reverse?: boolean;
	} = $props();
</script>

<TiltCard accent={project.accent} max={featured ? 5 : 7} lift={featured ? 5 : 7}>
	<article
		class="project"
		class:featured
		class:reverse={featured && reverse}
		style:--accent={project.accent}
	>
		<div class="content">
			<div class="meta">
				<span class="kicker space-mono">{project.kicker}</span>
				<span class="year space-mono">{project.year}</span>
			</div>

			<h3 class="name">
				{project.name}
				{#if project.href}<span class="arrow" aria-hidden="true">→</span>{/if}
			</h3>

			<p class="blurb">{project.blurb}</p>

			<ul class="highlights">
				{#each project.highlights as highlight}
					<li>{highlight}</li>
				{/each}
			</ul>

			<div class="stack">
				{#each project.stack as item}
					<SkillChip name={item} size="sm" />
				{/each}
			</div>

			{#if project.href}
				<a class="cta" href={project.href}>
					{project.cta ?? 'View project'}
					<span aria-hidden="true">→</span>
				</a>
			{/if}
		</div>

		{#if project.shot}
			<div class="shot">
				<img src={project.shot} alt="{project.name} interface" loading="lazy" />
			</div>
		{/if}
	</article>
</TiltCard>

<style>
	.project {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border-radius: 18px;
		padding: 1.6rem;
		background: linear-gradient(155deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.015) 60%);
		border: 1px solid rgba(255, 255, 255, 0.08);
		transform-style: preserve-3d;
		overflow: hidden;
	}

	/* Accent wash anchored to the top edge, pushed behind the content in 3D. */
	.project::before {
		content: '';
		position: absolute;
		inset: -40% 0 auto 0;
		height: 220px;
		background: radial-gradient(
			ellipse at 50% 100%,
			color-mix(in srgb, var(--accent) 16%, transparent),
			transparent 70%
		);
		pointer-events: none;
	}

	.featured {
		flex-direction: row;
		align-items: center;
		gap: 2.25rem;
		padding: 2rem;
	}

	.reverse {
		flex-direction: row-reverse;
	}

	.reverse .shot {
		transform: translateZ(44px) rotateY(6deg);
	}

	.content {
		position: relative;
		flex: 1;
		transform: translateZ(28px);
	}

	.meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.7rem;
	}

	.kicker {
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.year {
		font-size: 0.66rem;
		color: rgba(255, 255, 255, 0.3);
	}

	.name {
		color: #ffffff;
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.15;
	}

	.featured .name {
		font-size: 2rem;
	}

	.arrow {
		display: inline-block;
		color: var(--accent);
		transition: transform 0.25s ease;
	}

	.project:hover .arrow {
		transform: translateX(5px);
	}

	.blurb {
		margin-top: 0.75rem;
		color: rgba(255, 255, 255, 0.66);
		font-size: 0.92rem;
		line-height: 1.7;
	}

	.highlights {
		margin: 1.15rem 0 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.highlights li {
		position: relative;
		padding-left: 1.15rem;
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.82rem;
		line-height: 1.6;
	}

	.highlights li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55rem;
		width: 6px;
		height: 6px;
		border-radius: 999px;
		border: 1px solid var(--accent);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 1.25rem;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1.4rem;
		padding: 0.6rem 1.1rem;
		border-radius: 999px;
		background: var(--accent);
		color: #1a1918;
		font-weight: 700;
		font-size: 0.85rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.cta:hover,
	.cta:focus-visible {
		transform: translateY(-2px);
		box-shadow: 0 12px 28px -10px color-mix(in srgb, var(--accent) 80%, transparent);
	}

	.shot {
		position: relative;
		flex: 1;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.09);
		transform: translateZ(44px) rotateY(-6deg);
		box-shadow: 0 30px 60px -25px rgba(0, 0, 0, 0.9);
	}

	.shot img {
		display: block;
		width: 100%;
		height: auto;
	}

	@media only screen and (max-width: 900px) {
		.featured,
		.reverse {
			flex-direction: column;
			align-items: stretch;
			padding: 1.5rem;
		}

		.featured .name {
			font-size: 1.6rem;
		}

		.shot,
		.reverse .shot {
			transform: none;
			order: -1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.shot,
		.reverse .shot {
			transform: none;
		}
	}
</style>
