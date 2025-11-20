<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	
	<!-- Primary Meta Tags -->
	<title>larryamiel.dev - Full Stack Web Developer</title>
	<meta name="title" content="larryamiel.dev - Full Stack Web Developer" />
	<meta name="description" content="I'm Larry Amiel. I'm a full stack developer based in the Golden City of Friendship of the Philippines.

	I have always loved the art of problem solving, this turned me from math to computer science. Since I have started my journey, I have always been drawn to work on projects that have real world impact." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://larryamiel.dev" />
	<meta property="og:title" content="larryamiel.dev - Full Stack Web Developer" />
	<meta property="og:description" content="I'm Larry Amiel. I'm a full stack developer based in the Golden City of Friendship of the Philippines.

	I have always loved the art of problem solving, this turned me from math to computer science. Since I have started my journey, I have always been drawn to work on projects that have real world impact." />
	<meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

	<!-- X (Twitter) -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://larryamiel.dev" />
	<meta property="twitter:title" content="larryamiel.dev - Full Stack Web Developer" />
	<meta property="twitter:description" content="I'm Larry Amiel. I'm a full stack developer based in the Golden City of Friendship of the Philippines.

	I have always loved the art of problem solving, this turned me from math to computer science. Since I have started my journey, I have always been drawn to work on projects that have real world impact." />
	<meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />

	<!-- Meta Tags Generated with https://metatags.io -->
</svelte:head>

{@render children()}
