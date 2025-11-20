import SIPHP from '$lib/assets/skill_icon_php.svg';
import SIJS from '$lib/assets/skill_icon_js.svg';
import SIMysql from '$lib/assets/skill_icon_mysql.svg';
import SILaravel from '$lib/assets/skill_icon_laravel.svg';
import SIWordpress from '$lib/assets/skill_icon_wordpress.svg';
import SIReact from '$lib/assets/skill_icon_react.svg';
import SINext from '$lib/assets/skill_icon_next.svg';
import SIVue from '$lib/assets/skill_icon_vue.svg';
import SISvelte from '$lib/assets/skill_icon_svelte.svg';
import SITailwind from '$lib/assets/skill_icon_tailwind.svg';
import SIPython from '$lib/assets/skill_icon_python.svg';
import SiMysql from '$lib/assets/skill_icon_mysql.svg';
import SiRedis from '$lib/assets/skill_icon_redis.svg';
import SiAWS from '$lib/assets/skill_icon_aws.svg';
import SiFirebase from '$lib/assets/skill_icon_firebase.svg';
import SiSupabase from '$lib/assets/skill_icon_supabase.svg';
import SiNode from '$lib/assets/skill_icon_node.svg';

export const experiences = [
  {
    from: 'Jan 2017',
    to: 'Jul 2018',
    company: 'Stoneveil Entertainment',
    title: 'Lead Game Developer',
    skills: [],
    description: 'Lead Programmer for StoneVeil Entertainment. Using Game Maker Studio and Game Make Studio 2. Developed Spirits of Tallagone.'
  },
  {
    from: 'Jan 2017',
    to: 'Feb 2017',
    company: 'Mystery Room Houston',
    title: 'Junior Web Developer',
    skills: [
      {
        name: 'PHP',
        svg: SIPHP
      },
      {
        name: 'MySQL',
        svg: SIMysql
      },
      {
        name: 'JavaScript',
        svg: SIJS
      }
    ],
    description: 'Developed a Web Application for Mystery Room Houston, a Mystery Room business based in Houston, Texas. The web application was built to provide administrators with a way to manage player signups, control the game, handle analytics, and much more.'
  },
  {
    from: 'Feb 2018',
    to: 'Feb 2020',
    company: 'Evotech Software Solutions Inc.',
    title: 'Junior Web Developer',
    skills: [
      {
        name: 'Laravel',
        svg: SILaravel
      },
      {
        name: 'Vue',
        svg: SIVue
      },
      {
        name: 'Wordpress',
        svg: SIWordpress
      }
    ],
    description: 'Contributed to multiple high-impact projects, many of which I handled independently from start to finish. Gained extensive experience across various PHP and JavaScript frameworks, and built several custom WordPress themes and plugins tailored to client requirements.'
  },
  {
    from: 'Feb 2020',
    to: 'Feb 2023',
    company: 'Precise Media AB.',
    title: 'Junior Web Developer - Senior Web Developer',
    skills: [
      {
        name: 'React',
        svg: SIReact
      },
      {
        name: 'Next',
        svg: SINext
      },
      {
        name: 'Tailwind',
        svg: SITailwind
      },
      {
        name: 'Node',
        svg: SiNode
      },
      {
        name: 'Firebase',
        svg: SiFirebase
      },
      {
        name: 'Redis',
        svg: SiRedis
      }
    ],
    description: 'Started training as a Junior Web Developer and grew to be a Senior Web Developer for the company. Handled all projects ranging from e-commerce shops to social media to real-estate management platforms.'
  },
  {
    from: 'Aug 2023',
    to: 'Oct 2025',
    company: 'Evotech Software Solutions Inc.',
    title: 'Senior Web Developer',
    skills: [
      {
        name: 'Laravel',
        svg: SILaravel
      },
      {
        name: 'Vue',
        svg: SIVue
      },
      {
        name: 'Tailwind',
        svg: SITailwind
      },
      {
        name: 'AWS',
        svg: SiAWS
      }
    ],
    description: 'Onboarded as a Senior Web Developer to help develop SellerInvestigators, a third-party Amazon Fulfillment reporting platform. Helped in developing multiple additional features, from custom reports to automation.'
  },
  {
    from: 'Feb 2023',
    to: 'May 2025',
    company: 'Edtech (Skooltek)',
    title: 'Senior Web Developer',
    skills: [
      {
        name: 'Laravel',
        svg: SILaravel
      },
      {
        name: 'Vue',
        svg: SIVue
      },
      {
        name: 'Tailwind',
        svg: SITailwind
      }
    ],
    description: 'Onboarded to help develop an application called Skooltek, a platform for teachers to manage their classes and students, admins to handle billing and other management tasks.'
  },
].reverse();