<script lang="ts">
	import Squiggle from '$lib/components/Squiggle.svelte';
	import Countries from '$lib/components/Countries/Countries.svelte';

	import IconGithub from '$lib/assets/icon_github.svg';
	import IconLinkedin from '$lib/assets/icon_linkedin.svg';

	import Experiences from './Experiences.svelte';
	import Greeting from './Greeting.svelte';
	import Skills from './Skills.svelte';
</script>

<div role="none" class="container flex flex-col lg:flex-row">
	<div class="left flex max-h-screen flex-col justify-between">
		<div class="mb-4 block lg:hidden">
			<div class="social-icons flex flex-row flex-wrap gap-4">
				<div class="social-icon h-6 w-6">
					<a href="https://github.com/larryamiel/" target="_blank">
						<img src={IconGithub} alt="Github" />
					</a>
				</div>

				<div class="social-icon h-6 w-6">
					<a href="https://www.linkedin.com/in/larry-amiel-tablando-996993152/" target="_blank">
						<img src={IconLinkedin} alt="Linkedin" />
					</a>
				</div>
			</div>
		</div>

		<div>
			<Greeting />
		</div>

		<div class="w-full lg:w-120">
			<Countries />
		</div>

		<div class="my-10 hidden lg:block">
			<div class="social-icons flex flex-row flex-wrap gap-8">
				<div class="social-icon h-8 w-8">
					<a href="https://github.com/larryamiel/" target="_blank">
						<img src={IconGithub} alt="Github" />
					</a>
				</div>

				<div class="social-icon h-8 w-8">
					<a href="https://www.linkedin.com/in/larry-amiel-tablando-996993152/" target="_blank">
						<img src={IconLinkedin} alt="Linkedin" />
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="right">
		<div class="mb-16">
			<p class="introduction mb-4">
				Hi there, I'm Larry Amiel. I'm a full stack developer based in the <span
					class="text-secondary-color font-bold">Golden City of Friendship</span
				>
				of the <span class="text-primary-color font-bold">Philippines</span>.
			</p>

			<p class="introduction mb-4">
				I have always loved the art of problem solving, this turned me from math to computer
				science. Since I have started my journey, I have always been drawn to work on projects that
				have
				<span class="text-primary-color font-bold">real world impact</span>.
			</p>

			<p class="introduction mb-4">
				I've led and been part of projects ranging from geo-location based <span
					class="text-tertiary-color font-bold">social media</span
				>
				applications to third party <span class="text-secondary-color font-bold">Amazon</span> services.
			</p>
		</div>

		<div class="mb-16">
			<Skills />
		</div>

		<div class="mb-16">
			<a class="project-card" href="/ballview">
				<span class="space-mono project-kicker">Project</span>
				<span class="project-title">Ballview <span class="text-primary-color">→</span></span>
				<span class="project-desc">
					A Windows desktop app for watching Major League Baseball pitch by pitch — live
					play-by-play, Statcast batted-ball data, box scores and highlights, built with
					Tauri&nbsp;2, Rust and React.
				</span>
			</a>
		</div>

		<div class="">
			<Experiences />
		</div>
	</div>
</div>

<style>
	.left,
	.right {
		width: 50%;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 6rem;
		padding-bottom: 6rem;
	}

	.left {
		top: 0;
		position: sticky;
		height: 100vh;
	}

	.introduction {
		color: #ffffff;
		font-weight: 400;
		font-size: 1.5rem;
	}

	.project-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 12px;
		padding: 1.5rem;
		transition:
			border-color 0.18s ease,
			background 0.18s ease,
			transform 0.18s ease;
	}

	.project-card:hover {
		border-color: #ff4b4b;
		background: rgba(255, 75, 75, 0.05);
		transform: translateY(-3px);
	}

	.project-kicker {
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.35);
	}

	.project-title {
		color: #ffffff;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.project-desc {
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.7;
	}

	@media only screen and (max-width: 768px) {
		.left,
		.right {
			width: 100%;
			padding-top: 0;
			padding-bottom: 4rem;
		}

		.left {
			padding-top: 4rem;
			position: relative;
			height: auto;
		}
	}
</style>
