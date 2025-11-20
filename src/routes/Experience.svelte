<script>
	import { animate } from "animejs";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

  let { experience, index } = $props();

  onMount(() => {
    animate('#experience-' + index, {
      opacity: [0, 1],
      scaleY: [0.5, 1],
      easing: 'easeInOutSine',
      duration: 500,
      delay: index * 100
    });
  })
</script>

<div transition:fade id="experience-{index}" class="experience flex flex-row gap-4">
  <div class="w-1/4">
    <span class="experience-date text-secondary-color">{experience.from} - {experience.to}</span>
  </div>
  <div class="w-3/4">
    <span class="experience-title"><span class="experience-highlight">{experience.title}</span> <b class="text-primary-color">·</b> {experience.company}</span>
    <span class="experience-description">{experience.description}</span>
  
    <div class="flex flex-row flex-wrap mt-4 gap-2">
      {#each experience.skills as skill}
        <div class="experience-skill-icon">
          <img src={skill.svg} alt={skill.name} />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .experience {
    margin-bottom: 1rem;
    padding: 2rem;
    border-radius: 1rem;
    cursor: pointer;
    opacity: 0;

    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 2px 10px 30px rgba(0, 0, 0, 0.15);
      background-color: #292928;

      .experience-highlight {
        color: #FF4B4B;
      }

      .experience-description {
        color: #ffffff;
      }
    }

    .experience-date,
    .experience-title,
    .experience-description,
    .experience-highlight {
      transition: all 0.3s ease-in-out;
    }

    .experience-skill-icon {
      width: 48px;
      height: 48px;
      padding: 10px;
      border-radius: 1rem;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
      background: #252423;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 24px;
        height: 24px;
      }
    }
  }

  .experience-date {
    font-weight: 600;
    font-size: 0.75rem;
  }

  .experience-title {
    color: #ffffff;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;

    display: block;
  }

  .experience-description {
    color: #aaaaaa;
    font-weight: 400;
    font-size: 0.85rem;
  }
</style>