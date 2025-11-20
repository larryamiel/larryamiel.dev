<script lang="ts">
	import { animate } from "animejs";
	import { onMount } from "svelte";

  const greetings = [
    'kumusta, ako si',
    'hello, i am',
    'こんにちは、私は',
    'como estas, soy',
    'ciao, sono',
    'salut, je suis',
    'hallo, ich bin',
  ];

  let currentGreeting = $state(0);
  let greetingText = $state('');

  const typeGreeting = (text: string) => {
    const characters = text.split('');
    for (let i = 0; i < characters.length; i++) {
      setTimeout(() => {
        greetingText += characters[i];

        if (i === characters.length - 1) {
          setTimeout(() => {
            currentGreeting = (currentGreeting + 1) % greetings.length;
            greetingText = '';
            typeGreeting(greetings[currentGreeting]);
          }, 5000);
        }
      }, 200 * i);
    }
  }

  onMount(() => {
    typeGreeting(greetings[currentGreeting]);

    animate('.cursor', {
      opacity: [0, 1, 0],
      easing: 'easeInOutSine',
      duration: 500,
      loop: true
    })
  });
</script>

<div class="header">
  <span class="greeting block">{greetingText}<span class="cursor">|</span></span>
  <span class="jumbo">
    <span class="text-primary-color">Larry</span>
    <span class="title mb-4">
      a <span class="text-secondary-color">full stack developer</span>
    </span>
  </span>
</div>

<style>
  .header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .header .jumbo {
    color: #ffffff;
    font-weight: 600;
    font-size: 4rem;
    line-height: 0.9;
  }

  .header .greeting {
    color: #ffffff;
    font-weight: 600;
    font-size: 4rem;
    line-height: 0.9;
  }

  .header .title {
    color: #ffffff;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 0.9;
  }

  /* Media query outside the selector */
  @media only screen and (max-width: 768px) {
    .header .jumbo {
      font-size: 2.5rem;
    }

    .header .greeting {
      font-size: 2.5rem;
    }

    .header .title {
      font-size: 1.2rem;
    }
  }
</style>