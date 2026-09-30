<script lang="ts">
	import { onMount } from 'svelte';

	import SunHero from '$lib/components/v3/SunHero.svelte';
	import ProjectCard from '$lib/components/v2/ProjectCard.svelte';
	import ExperienceCard from '$lib/components/v2/ExperienceCard.svelte';
	import SkillChip from '$lib/components/v2/SkillChip.svelte';
	import Reveal from '$lib/components/v2/Reveal.svelte';

	import IconGithub from '$lib/assets/icon_github.svg';
	import IconLinkedin from '$lib/assets/icon_linkedin.svg';
	import profileImage from '$lib/assets/profile.png';

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

	/** Sun-faded palette: ochre, amber, terracotta, clay green. */
	const accents = ['#F6A03D', '#FF7A2F', '#E8B23A', '#8FB08A'];

	// The cards read their accent off the project itself, so v3 re-tints them
	// rather than the shared constants carrying two palettes.
	const tinted = projects.map((project, index) => ({
		...project,
		accent: accents[index % accents.length]
	}));

	// The personal projects get the wide cards; the team work shares the grid.
	const featured = tinted.filter((project) => project.href);
	const rest = tinted.filter((project) => !project.href);

	const sections = [
		{ id: 'work', label: 'Work' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'stack', label: 'Stack' },
		{ id: 'contact', label: 'Contact' }
	];

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
	<meta property="og:url" content="https://larryamiel.dev" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:image" content={profileImage} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://larryamiel.dev" />
	<meta property="twitter:title" content={TITLE} />
	<meta property="twitter:description" content={DESCRIPTION} />
	<meta property="twitter:image" content={profileImage} />
	<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
</svelte:head>

<div class="page">
	<div class="ambient" aria-hidden="true">
		<span class="haze haze-a"></span>
		<span class="haze haze-b"></span>
		<span class="grain"></span>
		<span class="horizon"></span>
	</div>

	<a class="skip" href="#work">Skip to work</a>

	<header class="topbar">
		<div class="shell topbar-inner">
			<a class="brand space-mono" href="/">
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

	<main>
		<div class="shell">
			<SunHero />
		</div>

		<div class="band" aria-hidden="true">
			<span class="band-strip"></span>
		</div>

		<div class="shell">
			<!-- Selected work -->
			<section id="work" class="section">
				<Reveal>
					<div class="section-head">
						<span class="section-kicker space-mono">01 — Selected work</span>
						<h2 class="section-title">Things I built that people actually use</h2>
						<p class="section-lede">
							Two are mine — a desktop app you can download and a game you can play right now. The
							other three are production systems I worked on inside a team — described at the level
							I can describe them.
						</p>
					</div>
				</Reveal>

				<Reveal delay={80}>
					<div class="featured-wrap">
						{#each featured as project, index}
							<ProjectCard {project} featured reverse={index % 2 === 1} />
						{/each}
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
								accent="rgba(246, 227, 198, 0.45)"
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
							Got something that has to <span class="hot">hold up</span>?
						</h2>
						<p class="section-lede">
							Based in the {profile.location}, working with teams anywhere. Email is the fastest way
							to reach me.
						</p>

						<div class="contact-actions">
							<a class="btn solid" href="mailto:{profile.email}">{profile.email}</a>

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
				<span class="footer-links">
					<a class="footer-link" href="/v2">v2 →</a>
					<a class="footer-link" href="/v1">The original site →</a>
				</span>
			</footer>
		</div>
	</main>
</div>

<style>
	.page {
		position: relative;
		min-height: 100vh;
		overflow-x: clip;
		background: #17110c;
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
			radial-gradient(900px 500px at 50% 0%, rgba(255, 122, 47, 0.12), transparent 65%),
			linear-gradient(180deg, #1d140d 0%, #17110c 45%, #120d09 100%);
	}

	.haze {
		position: absolute;
		border-radius: 999px;
		filter: blur(130px);
	}

	.haze-a {
		width: 560px;
		height: 560px;
		top: -14%;
		left: 50%;
		translate: -50% 0;
		background: rgba(246, 160, 60, 0.16);
	}

	.haze-b {
		width: 480px;
		height: 480px;
		bottom: -12%;
		right: -8%;
		background: rgba(179, 47, 44, 0.14);
	}

	/* Warm paper grain instead of the cool grid v2 uses. */
	.grain {
		position: absolute;
		inset: 0;
		opacity: 0.5;
		background-image:
			linear-gradient(rgba(246, 227, 198, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(246, 227, 198, 0.02) 1px, transparent 1px);
		background-size: 52px 52px;
		mask-image: radial-gradient(circle at 50% 15%, #000 0%, transparent 78%);
		-webkit-mask-image: radial-gradient(circle at 50% 15%, #000 0%, transparent 78%);
	}

	.horizon {
		position: absolute;
		left: 0;
		right: 0;
		top: 62vh;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(246, 160, 60, 0.35) 20%,
			rgba(246, 160, 60, 0.35) 80%,
			transparent
		);
	}

	/* ---- top bar ---- */

	.skip {
		position: absolute;
		left: -9999px;
		top: 0;
		z-index: 50;
		padding: 0.75rem 1.2rem;
		background: #ff7a2f;
		color: #17110c;
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
		background: rgba(23, 17, 12, 0.7);
		border-bottom: 1px solid rgba(246, 160, 60, 0.14);
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
		color: #f6e3c6;
		font-weight: 700;
		font-size: 0.85rem;
		letter-spacing: 0.06em;
	}

	.brand-dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: #ff7a2f;
		box-shadow: 0 0 10px rgba(255, 122, 47, 0.8);
	}

	.brand-tld {
		color: rgba(246, 227, 198, 0.4);
	}

	.nav {
		display: flex;
		gap: 0.25rem;
		padding: 0.25rem;
		border-radius: 999px;
		border: 1px solid rgba(246, 227, 198, 0.1);
		background: rgba(246, 227, 198, 0.03);
	}

	.nav-link {
		padding: 0.4rem 0.95rem;
		border-radius: 999px;
		color: rgba(246, 227, 198, 0.55);
		font-size: 0.82rem;
		transition:
			color 0.2s ease,
			background 0.2s ease;
	}

	.nav-link:hover {
		color: #f6e3c6;
	}

	.nav-link.active {
		color: #17110c;
		background: #f6a03d;
	}

	.nav-cta {
		padding: 0.45rem 1rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 122, 47, 0.5);
		color: #ff7a2f;
		font-size: 0.82rem;
		font-weight: 700;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.nav-cta:hover {
		background: #ff7a2f;
		color: #17110c;
	}

	/* ---- band divider ---- */

	.band {
		margin: 1rem 0 0;
		padding: 0 0 0.5rem;
	}

	.band-strip {
		display: block;
		height: 14px;
		background: repeating-linear-gradient(
			90deg,
			#ff7a2f 0 22px,
			#f6a03d 22px 44px,
			#e8b23a 44px 66px,
			#8fb08a 66px 88px,
			#b32f2c 88px 110px
		);
		opacity: 0.55;
		mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
	}

	/* ---- sections ---- */

	.section {
		padding: 5.5rem 0;
		scroll-margin-top: 80px;
	}

	.section-head {
		max-width: 44rem;
		margin: 0 auto 2.75rem;
		text-align: center;
	}

	.section-kicker {
		display: block;
		font-size: 0.68rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #f6a03d;
		margin-bottom: 0.85rem;
	}

	.section-title {
		font-family: 'Anton', 'Raleway', sans-serif;
		color: #f6e3c6;
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.06;
		letter-spacing: 0.01em;
		text-transform: uppercase;
	}

	.section-lede {
		margin-top: 1rem;
		color: rgba(246, 227, 198, 0.58);
		font-size: 0.98rem;
		line-height: 1.7;
	}

	.featured-wrap {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
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
		border: 1px dashed rgba(246, 227, 198, 0.2);
		background: transparent;
		color: rgba(246, 227, 198, 0.6);
		font-family: 'Space Mono', monospace;
		font-size: 0.75rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.earlier-btn:hover,
	.earlier-btn:focus-visible {
		border-color: #f6a03d;
		color: #ffd27a;
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
		border: 1px solid rgba(246, 227, 198, 0.09);
		background: linear-gradient(160deg, rgba(246, 160, 60, 0.07), rgba(246, 227, 198, 0.015));
		transition:
			border-color 0.25s ease,
			transform 0.25s ease;
	}

	.stack-card:hover {
		border-color: rgba(246, 160, 60, 0.45);
		transform: translateY(-3px);
	}

	.stack-label {
		font-size: 0.7rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #e8b23a;
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
		border: 1px solid rgba(246, 160, 60, 0.18);
		text-align: center;
		background:
			radial-gradient(700px 320px at 50% 0%, rgba(255, 122, 47, 0.16), transparent 70%),
			linear-gradient(160deg, rgba(246, 227, 198, 0.05), rgba(246, 227, 198, 0.01));
	}

	.contact .section-lede {
		margin-inline: auto;
		max-width: 34rem;
	}

	.contact-title {
		margin-top: 0.4rem;
		font-family: 'Anton', 'Raleway', sans-serif;
		color: #f6e3c6;
		font-size: clamp(1.9rem, 4vw, 3.2rem);
		line-height: 1.06;
		text-transform: uppercase;
	}

	.hot {
		/* Restated: layout.css puts Raleway on bare spans. */
		font-family: inherit;
		color: #ff7a2f;
	}

	.contact-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
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

	.solid {
		background: #ff7a2f;
		color: #17110c;
	}

	.solid:hover,
	.solid:focus-visible {
		transform: translateY(-2px);
		box-shadow: 0 16px 32px -14px rgba(255, 122, 47, 0.95);
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
		border: 1px solid rgba(246, 227, 198, 0.14);
		transition:
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.social:hover,
	.social:focus-visible {
		border-color: #ffd27a;
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
		border-top: 1px solid rgba(246, 227, 198, 0.08);
		color: rgba(246, 227, 198, 0.3);
		font-size: 0.75rem;
	}

	.footer-links {
		display: flex;
		gap: 1.25rem;
	}

	.footer-link {
		color: rgba(246, 227, 198, 0.5);
	}

	.footer-link:hover {
		color: #ffd27a;
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
