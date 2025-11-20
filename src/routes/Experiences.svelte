<script lang="ts">
  import { experiences } from "$lib/constants/experiences";
	import Experience from "./Experience.svelte";

  let showMore = $state(false);
</script>

<div class="experiences flex flex-col">
  {#each experiences as experience, index}
    {#if showMore || index < 3}
      <Experience {experience} {index} />
    {/if}
  {/each}

  <div class="flex justify-center">
    <button class="show-more-button" onclick={() => showMore = !showMore}>
      {#if showMore}Show Less{:else}Show More{/if}
    </button>
  </div>
</div>

<style>
  :global(.experiences:has(.experience:hover) .experience:not(:hover)) {
    opacity: 0.5;
  }

  .show-more-button {
    color: #FFFFFF;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    margin: auto;
  }
</style>