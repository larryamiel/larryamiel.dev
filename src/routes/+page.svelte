<script lang="ts">
	import Squiggle from '$lib/components/Squiggle.svelte';
	import Countries from '$lib/components/Countries/Countries.svelte';

	import IconGithub from '$lib/assets/icon_github.svg';
	import IconLinkedin from '$lib/assets/icon_linkedin.svg';

	import Experiences from './Experiences.svelte';
	import Greeting from './Greeting.svelte';
	import Skills from './Skills.svelte';
</script>

<div role="none" class="container flex lg:flex-row flex-col">
	<div class="left flex flex-col justify-between max-h-screen">
		<div class="mb-4 lg:hidden block">
			<div class="social-icons flex flex-row flex-wrap gap-4">
				<div class="social-icon w-6 h-6">
					<a href="https://github.com/larryamiel/" target="_blank">
						<img src={IconGithub} alt="Github" />
					</a>
				</div>

				<div class="social-icon w-6 h-6">
					<a href="https://www.linkedin.com/in/larry-amiel-tablando-996993152/" target="_blank">
						<img src={IconLinkedin} alt="Linkedin" />
					</a>
				</div>
			</div>
		</div>

		<div>
			<Greeting />
		</div>

		<div class="lg:w-120 w-full lg:max-h-120 max-h-80">
			<Countries />
		</div>

		<div class="my-10 lg:block hidden">
			<div class="social-icons flex flex-row flex-wrap gap-8">
				<div class="social-icon w-8 h-8">
					<a href="https://github.com/larryamiel/" target="_blank">
						<img src={IconGithub} alt="Github" />
					</a>
				</div>

				<div class="social-icon w-8 h-8">
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
				Hi there, I'm Larry Amiel. I'm a full stack developer based in the <span class="font-bold text-secondary-color">Golden City of Friendship</span> of the <span class="font-bold text-primary-color">Philippines</span>.
			</p>

			<p class="introduction mb-4">
				I have always loved the art of problem solving, this turned me from math to computer science. Since I have started my journey, I have always been drawn to work on projects that have
				<span class="font-bold text-primary-color">real world impact</span>.
			</p>

			<p class="introduction mb-4">
				I've led and been part of projects ranging from geo-location based <span class="font-bold text-tertiary-color">social media</span> applications to third party <span class="font-bold text-secondary-color">Amazon</span> services.
			</p>
		</div>

		<div class="mb-16">
			<Skills />
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

	@media only screen and (max-width: 768px) {
		.left,
		.right {
			width: 100%;
			padding-top: 4rem;
			padding-bottom: 4rem;
		}

		.left {
			position: relative;
			height: auto;
		}
	}
</style>
