<script>
  import PHSVG from '$lib/assets/ph.svg';
  import JPSVG from '$lib/assets/jp.svg';
  import ESSVG from '$lib/assets/es.svg';
  import ITSVG from '$lib/assets/it.svg';
  import GridSVG from '$lib/assets/grid.svg';

  import { onMount } from 'svelte';
	import { animate } from 'animejs';

  const svgs = [
    PHSVG,
    JPSVG,
    ESSVG,
    ITSVG
  ];

  let svg = PHSVG;
  let svgIndex= 0;

  onMount(() => {
    const changeSVG = () => {
      svgIndex = (svgIndex + 1) % svgs.length;
      svg = svgs[svgIndex];
    }

		animate('#active-svg', {
			rotateY: [0, 35, 0, -35],
			rotateX: [0, 10, -35],
			duration: 20000,
			loop: true,
			easing: 'linear',
			alternate: true,
      onLoop: changeSVG
		})

    animate('#random-grid', {
      rotateY: [0, 35, 0, -35],
      rotateX: [0, 10, -35],
      duration: 20000,
      loop: true,
      easing: 'linear',
      alternate: true
    })
	});
</script>

<div class="relative">
  <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-auto z-0 opacity-50" src={GridSVG} alt="Grid"  id="random-grid">
  <img class="relative z-22" src={svg} alt="Placeholder" id="active-svg">
</div>