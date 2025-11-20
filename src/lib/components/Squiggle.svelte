<script lang="ts">
  import { animate } from 'animejs';
	import { onMount } from 'svelte';

  let { length = 240, colorFrom = '#FFDB58', colorTo = '#FF4B4B' } = $props();

  let squiggle: any;
  let squigglePath: any = $state('');

  // Run animation once component mounts
  onMount(() => {
    for (let i = 2; i < Math.ceil(length / 12); i++) {
      squigglePath += 'T' + (i * 12) + ' 12 ';
    }

    let squiggleLength = length * 1.5;
    
    if (squiggle) {
      squiggle.style.strokeDasharray = squiggleLength;
      squiggle.style.strokeDashoffset = squiggleLength;

      animate(squiggle, {
        strokeDashoffset: [squiggleLength, 0],
        stroke: ['#FFFFFF', colorTo, colorFrom],
        duration: 12500,
        easing: 'easeInOutSine',
        loop: true,
        alternate: true,
        transformOrigin: 'center center'
      });
    }
  });
</script>

<svg
  width={length}
  height="24"
  fill="none"
  viewBox="0 0 {length} 24"
>
  <path
    bind:this={squiggle}
    d="M0 12 
       Q6 0 12 12
       {squigglePath}"
    stroke={colorFrom}
    stroke-width="5"
    stroke-linecap="round"
    fill="none"
  />
</svg>

<style>
  svg {
    display: block;
  }
</style>