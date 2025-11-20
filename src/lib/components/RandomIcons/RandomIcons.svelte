<script>
  import PHSVG from '$lib/assets/ph.svg';
  import JapanSVG from '$lib/assets/japan.svg';
  import ESSVG from '$lib/assets/es.svg';
  import ITSVG from '$lib/assets/it.svg';

  import { onMount } from 'svelte';
	import { animate } from 'animejs';

  const svgs = [
    PHSVG,
    JapanSVG,
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
	});
</script>

<img src={svg} alt="Placeholder" id="active-svg">