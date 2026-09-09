<script lang="ts">
	import { onMount } from 'svelte';

	import Hero3D from '$lib/components/v2/Hero3D.svelte';
	import ProjectCard from '$lib/components/v2/ProjectCard.svelte';
	import ExperienceCard from '$lib/components/v2/ExperienceCard.svelte';
	import SkillChip from '$lib/components/v2/SkillChip.svelte';
	import Reveal from '$lib/components/v2/Reveal.svelte';

	import IconGithub from '$lib/assets/icon_github.svg';
	import IconLinkedin from '$lib/assets/icon_linkedin.svg';

	import {
		profile,
		experiences,
		earlierExperiences,
		projects,
		skillGroups
	} from '$lib/constants/profile.js';

	const TITLE = 'Larry Amiel Tablando — Senior Full Stack Developer';
	const DESCRIPTION =
		'Senior full stack developer with eight years across Laravel/Vue and React/Node — system architecture, billing systems, and third-party Amazon reporting tooling. Selected work, full track record and stack.';

	const accents = ['#FF4B4B', '#FFDB58', '#4bffff', '#a78bfa'];
	const sections = [
		{ id: 'work', label: 'Work' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'stack', label: 'Stack' },
		{ id: 'contact', label: 'Contact' }
	];

	const [featured, ...rest] = projects;

	let openRoles = $state<string[]>([experiences[0].id]);
	let showEarlier = $state(false);
	let activeSection = $state('');

	const toggleRole = (id: string) => {
		openRoles = openRoles.includes(id)
			? openRoles.filter((roleId) => roleId !== id)
			: [...openRoles, id];
	};

	onMount(() => {
		if (typeof IntersectionObserver === 'undefined') return;

		// Scroll-spy for the sticky nav. The upper band keeps the highlight on the
		// section you are actually reading rather than the one entering the fold.
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeSection = entry.target.id;
				}
			},
			{ rootMargin: '-20% 0px -70% 0px' }
		);

		for (const section of sections) {
			const el = document.getElementById(section.id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="title" content={TITLE} />
	<meta name="description" content={DESCRIPTION} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={TITLE} />
	<meta property="twitter:description" content={DESCRIPTION} />
</svelte:head>

<div class="page">
	<div class="ambient" aria-hidden="true">
		<span class="blob blob-a"></span>
		<span class="blob blob-b"></span>
		<span class="blob blob-c"></span>
		<span class="noise"></span>
	</div>

	<a class="skip" href="#work">Skip to work</a>

	<header class="topbar">
		<div class="shell topbar-inner">
			<a class="brand" href="/">
				<span class="brand-dot" aria-hidden="true"></span>
				larryamiel<span class="brand-tld">.dev</span>
			</a>

			<nav class="nav" aria-label="Sections">
				{#each sections as section}
					<a class="nav-link" class:active={activeSection === section.id} href="#{section.id}">
						{section.label}
					</a>
				{/each}
			</nav>

			<a class="nav-cta" href="mailto:{profile.email}">Get in touch</a>
		</div>
	</header>

	<main class="shell">
		<Hero3D />

		<!-- Selected work -->
		<section id="work" class="section">
			<Reveal>
				<div class="section-head">
					<span class="section-kicker space-mono">01 — Selected work</span>
					<h2 class="section-title">Things I built that people actually use</h2>
					<p class="section-lede">
						One is open source and you can download it. The other three are production systems I
						worked on inside a team — described at the level I can describe them.
					</p>
				</div>
			</Reveal>

			<Reveal delay={80}>
				<div class="featured-wrap">
					<ProjectCard project={featured} featured />
				</div>
			</Reveal>

			<div class="project-grid">
				{#each rest as project, index}
					<Reveal delay={100 + index * 80}>
						<ProjectCard {project} />
					</Reveal>
				{/each}
			</div>
		</section>

		<!-- Experience -->
		<section id="experience" class="section">
			<Reveal>
				<div class="section-head">
					<span class="section-kicker space-mono">02 — Experience</span>
					<h2 class="section-title">Eight years, four senior-level rooms</h2>
					<p class="section-lede">
						Straight from the CV. Open any role for the detail — otherwise the summary line is the
						honest version of what the job was.
					</p>
				</div>
			</Reveal>

			<div class="timeline">
				{#each experiences as experience, index}
					<Reveal delay={index * 70}>
						<ExperienceCard
							{experience}
							accent={accents[index % accents.length]}
							open={openRoles.includes(experience.id)}
							ontoggle={toggleRole}
						/>
					</Reveal>
				{/each}

				{#if showEarlier}
					{#each earlierExperiences as experience}
						<ExperienceCard
							{experience}
							accent="rgba(255,255,255,0.45)"
							open={openRoles.includes(experience.id)}
							ontoggle={toggleRole}
						/>
					{/each}
				{/if}
			</div>

			<div class="earlier-row">
				<button
					class="earlier-btn"
					aria-expanded={showEarlier}
					onclick={() => (showEarlier = !showEarlier)}
				>
					{showEarlier ? 'Hide' : 'Show'} earlier roles (2017—2018)
					<span class="caret" class:open={showEarlier} aria-hidden="true">▾</span>
				</button>
			</div>
		</section>

		<!-- Stack -->
		<section id="stack" class="section">
			<Reveal>
				<div class="section-head">
					<span class="section-kicker space-mono">03 — Stack</span>
					<h2 class="section-title">What I reach for</h2>
					<p class="section-lede">
						Grouped by where it sits in the system, not by how confident the logo looks on a grid.
					</p>
				</div>
			</Reveal>

			<div class="stack-grid">
				{#each skillGroups as group, index}
					<Reveal delay={index * 70}>
						<div class="stack-card">
							<h3 class="stack-label space-mono">{group.label}</h3>
							<div class="stack-items">
								{#each group.items as item}
									<SkillChip name={item} />
								{/each}
							</div>
						</div>
					</Reveal>
				{/each}
			</div>
		</section>

		<!-- Contact -->
		<section id="contact" class="section">
			<Reveal>
				<div class="contact">
					<span class="section-kicker space-mono">04 — Contact</span>
					<h2 class="contact-title">
						Got something that has to <span class="text-primary-color">hold up</span>?
					</h2>
					<p class="section-lede">
						Based in the {profile.location}, working with teams anywhere. Email is the fastest way
						to reach me.
					</p>

					<div class="contact-actions">
						<a class="btn primary" href="mailto:{profile.email}">{profile.email}</a>

						<div class="socials">
							<a class="social" href={profile.github} target="_blank" rel="noreferrer">
								<img src={IconGithub} alt="GitHub" />
							</a>
							<a class="social" href={profile.linkedin} target="_blank" rel="noreferrer">
								<img src={IconLinkedin} alt="LinkedIn" />
							</a>
						</div>
					</div>
				</div>
			</Reveal>
		</section>

		<footer class="footer">
			<span class="space-mono">© {new Date().getFullYear()} {profile.name}</span>
			<a class="footer-link" href="/">Original home page →</a>
		</footer>
	</main>
</div>

<style>
	.page {
		position: relative;
		min-height: 100vh;
		overflow-x: clip;
	}

	.shell {
		width: min(1200px, 100% - 2.5rem);
		margin-inline: auto;
	}

	/* ---- ambient background ---- */

	.ambient {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background:
			radial-gradient(1200px 600px at 70% -10%, rgba(255, 75, 75, 0.07), transparent 60%), #252423;
	}

	.blob {
		position: absolute;
		border-radius: 999px;
		filter: blur(120px);
		opacity: 0.5;
	}

	.blob-a {
		width: 520px;
		height: 520px;
		top: -12%;
		right: -6%;
		background: rgba(255, 75, 75, 0.2);
	}

	.blob-b {
		width: 460px;
		height: 460px;
		top: 42%;
		left: -12%;
		background: rgba(75, 255, 255, 0.09);
	}

	.blob-c {
		width: 420px;
		height: 420px;
		bottom: -8%;
		right: 10%;
		background: rgba(255, 219, 88, 0.08);
	}

	.noise {
		position: absolute;
		inset: 0;
		opacity: 0.35;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.016) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.016) 1px, transparent 1px);
		background-size: 46px 46px;
		mask-image: radial-gradient(circle at 50% 20%, #000 0%, transparent 75%);
		-webkit-mask-image: radial-gradient(circle at 50% 20%, #000 0%, transparent 75%);
	}

	/* ---- top bar ---- */

	.skip {
		position: absolute;
		left: -9999px;
		top: 0;
		z-index: 50;
		padding: 0.75rem 1.2rem;
		background: #ff4b4b;
		color: #1a1918;
		border-radius: 0 0 10px 0;
		font-weight: 700;
	}

	.skip:focus {
		left: 0;
	}

	.topbar {
		position: sticky;
		top: 0;
		z-index: 40;
		backdrop-filter: blur(14px);
		background: rgba(37, 36, 35, 0.72);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.topbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: 62px;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #ffffff;
		font-weight: 700;
		font-size: 0.95rem;
	}

	.brand-dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: #ff4b4b;
	}

	.brand-tld {
		color: rgba(255, 255, 255, 0.35);
	}

	.nav {
		display: flex;
		gap: 0.25rem;
		padding: 0.25rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.07);
		background: rgba(255, 255, 255, 0.025);
	}

	.nav-link {
		padding: 0.4rem 0.95rem;
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.82rem;
		transition:
			color 0.2s ease,
			background 0.2s ease;
	}

	.nav-link:hover {
		color: #ffffff;
	}

	.nav-link.active {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.08);
	}

	.nav-cta {
		padding: 0.45rem 1rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 75, 75, 0.45);
		color: #ff4b4b;
		font-size: 0.82rem;
		font-weight: 700;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.nav-cta:hover {
		background: #ff4b4b;
		color: #1a1918;
	}

	/* ---- sections ---- */

	.section {
		padding: 5.5rem 0;
		scroll-margin-top: 80px;
	}

	.section-head {
		max-width: 44rem;
		margin-bottom: 2.75rem;
	}

	.section-kicker {
		display: block;
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.32);
		margin-bottom: 0.85rem;
	}

	.section-title {
		color: #ffffff;
		font-size: clamp(1.7rem, 3vw, 2.5rem);
		font-weight: 700;
		line-height: 1.12;
		letter-spacing: -0.015em;
	}

	.section-lede {
		margin-top: 1rem;
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.98rem;
		line-height: 1.7;
	}

	.featured-wrap {
		margin-bottom: 1.5rem;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.5rem;
		align-items: stretch;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.earlier-row {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	.earlier-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.3rem;
		border-radius: 999px;
		border: 1px dashed rgba(255, 255, 255, 0.18);
		background: transparent;
		color: rgba(255, 255, 255, 0.6);
		font-family: 'Space Mono', monospace;
		font-size: 0.75rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.earlier-btn:hover,
	.earlier-btn:focus-visible {
		border-color: rgba(255, 255, 255, 0.4);
		color: #ffffff;
	}

	.caret {
		transition: transform 0.25s ease;
	}

	.caret.open {
		transform: rotate(180deg);
	}

	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1.25rem;
	}

	.stack-card {
		height: 100%;
		padding: 1.4rem;
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.07);
		background: linear-gradient(160deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.012));
		transition:
			border-color 0.25s ease,
			transform 0.25s ease;
	}

	.stack-card:hover {
		border-color: rgba(255, 255, 255, 0.18);
		transform: translateY(-3px);
	}

	.stack-label {
		font-size: 0.7rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #ffdb58;
		margin-bottom: 1rem;
	}

	.stack-items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	/* ---- contact ---- */

	.contact {
		padding: 3rem;
		border-radius: 22px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background:
			radial-gradient(700px 300px at 20% 0%, rgba(255, 75, 75, 0.12), transparent 70%),
			linear-gradient(160deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
	}

	.contact-title {
		margin-top: 0.4rem;
		color: #ffffff;
		font-size: clamp(1.8rem, 3.4vw, 2.8rem);
		font-weight: 700;
		line-height: 1.1;
	}

	.contact-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.8rem 1.5rem;
		border-radius: 999px;
		font-weight: 700;
		font-size: 0.9rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.primary {
		background: #ff4b4b;
		color: #1a1918;
	}

	.primary:hover,
	.primary:focus-visible {
		transform: translateY(-2px);
		box-shadow: 0 14px 30px -12px rgba(255, 75, 75, 0.9);
	}

	.socials {
		display: flex;
		gap: 0.6rem;
	}

	.social {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		transition:
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.social:hover,
	.social:focus-visible {
		border-color: #ffffff;
		transform: translateY(-2px);
	}

	.social img {
		width: 20px;
		height: 20px;
	}

	.footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 2.5rem 0 3.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		color: rgba(255, 255, 255, 0.3);
		font-size: 0.75rem;
	}

	.footer-link {
		color: rgba(255, 255, 255, 0.5);
	}

	.footer-link:hover {
		color: #ffffff;
	}

	@media only screen and (max-width: 860px) {
		.nav {
			display: none;
		}

		.section {
			padding: 3.5rem 0;
		}

		.contact {
			padding: 1.75rem;
		}
	}

	@media only screen and (max-width: 520px) {
		.nav-cta {
			display: none;
		}
	}
</style>
