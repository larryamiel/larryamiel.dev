<script>
	import SkillIcon from "$lib/components/SkillIcon.svelte";

  import SIJS from '$lib/assets/skill_icon_js.svg';
  import SIReact from '$lib/assets/skill_icon_react.svg';
  import SINext from '$lib/assets/skill_icon_next.svg';
  import SIVue from '$lib/assets/skill_icon_vue.svg';
  import SISvelte from '$lib/assets/skill_icon_svelte.svg';
  import SITailwind from '$lib/assets/skill_icon_tailwind.svg';
  import SIPHP from '$lib/assets/skill_icon_php.svg';
  import SILaravel from '$lib/assets/skill_icon_laravel.svg';
  import SIWordpress from '$lib/assets/skill_icon_wordpress.svg';
  import SIPython from '$lib/assets/skill_icon_python.svg';
  import SiMysql from '$lib/assets/skill_icon_mysql.svg';
  import SiRedis from '$lib/assets/skill_icon_redis.svg';
  import SiAWS from '$lib/assets/skill_icon_aws.svg';
  import SiFirebase from '$lib/assets/skill_icon_firebase.svg';
  import SiSupabase from '$lib/assets/skill_icon_supabase.svg';

	import { animate, stagger } from "animejs";
	import { onMount } from "svelte";

  let skills = [
    { name: 'JavaScript', svg: SIJS },
    { name: 'React', svg: SIReact },
    { name: 'Next.js', svg: SINext },
    { name: 'Vue', svg: SIVue },
    { name: 'Svelte', svg: SISvelte },
    { name: 'Tailwind', svg: SITailwind },
    { name: 'PHP', svg: SIPHP },
    { name: 'Laravel', svg: SILaravel },
    { name: 'Wordpress', svg: SIWordpress },
    { name: 'Python', svg: SIPython },
    { name: 'MySQL', svg: SiMysql },
    { name: 'Redis', svg: SiRedis },
    { name: 'AWS', svg: SiAWS },
    { name: 'Firebase', svg: SiFirebase },
    { name: 'Supabase', svg: SiSupabase },
  ];

  onMount(() => {
    animate('.skill-icon img', {
      opacity: [0.6, 1, 0.6],
      scale: [0.6, 1, 0.6],
      filter: ['grayscale(0.5)', 'grayscale(0)', 'grayscale(0.5)'],
      translateY: [0, -5, 0],
      easing: 'easeInOutSine',
      delay: stagger(3000),
      duration: 2000,
      loop: true,
      stagger: 100
    });
  });
</script>

<div class="skill-icons-container flex flex-row flex-wrap justify-center gap-4">
  {#each skills as skill}
    <SkillIcon skill={skill} />
  {/each}
</div>