<script lang="ts">
	import { animate } from "animejs";
	import { onMount } from "svelte";

  let canvas: any;
  let path: any;
  let pathD: string = "";
  let points: { x: Number, y: Number }[] = [];

  const getLocal = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  const smoothLine = (points: { x: Number, y: Number }[]) => {
    if (points.length < 2) return "";

    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      const cp = points[i - 1];
      d += ` Q ${cp.x},${cp.y} ${p.x},${p.y}`;
    }
    return d;
  }

  const addPoint = (x: Number, y: Number) => {
    points.push({ x, y });

    if (points.length > 12) {
      points.shift();
    }

    pathD = smoothLine(points);
  }

  const onMove = (e: MouseEvent) => {
    const { x, y } = getLocal(e);
    addPoint(x, y);
  }

  onMount(() => {
    animate(path, {
      stroke: ['#FFFFFF', '#FF4B4B', '#FFDB58'],
      duration: 10000,
      loop: true,
      alternate: true
    })
  })
</script>

<div
  role="none"
  bind:this={canvas}
  onmousemove={onMove}
  class="follower fixed top-0 left-0 min-w-full -z-1"
>
  <svg
    width="100%"
    class="min-h-screen"
  >
    <path
      bind:this={path}
      stroke="#FF4B4B"
      stroke-width="20"
      stroke-linecap="round"
      fill="none"
      d={pathD}
    />
  </svg>
</div>

