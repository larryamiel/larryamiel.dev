/**
 * Source of truth for the /v2 home page.
 *
 * Roles, dates and skill lists are transcribed from
 * "Larry Amiel Tablando - CV 2026.pdf". The two pre-2018 roles are not on the
 * CV but are kept from the original site data (src/lib/constants/experiences.js)
 * behind the "earlier roles" toggle.
 */

import SIPHP from '$lib/assets/skill_icon_php.svg';
import SIJS from '$lib/assets/skill_icon_js.svg';
import SILaravel from '$lib/assets/skill_icon_laravel.svg';
import SIWordpress from '$lib/assets/skill_icon_wordpress.svg';
import SIReact from '$lib/assets/skill_icon_react.svg';
import SINext from '$lib/assets/skill_icon_next.svg';
import SIVue from '$lib/assets/skill_icon_vue.svg';
import SISvelte from '$lib/assets/skill_icon_svelte.svg';
import SITailwind from '$lib/assets/skill_icon_tailwind.svg';
import SIPython from '$lib/assets/skill_icon_python.svg';
import SIMysql from '$lib/assets/skill_icon_mysql.svg';
import SIRedis from '$lib/assets/skill_icon_redis.svg';
import SIAWS from '$lib/assets/skill_icon_aws.svg';
import SIFirebase from '$lib/assets/skill_icon_firebase.svg';
import SISupabase from '$lib/assets/skill_icon_supabase.svg';
import SINode from '$lib/assets/skill_icon_node.svg';

/**
 * Icon lookup by skill name. Anything missing here still renders — as a text
 * chip — so CV skills with no asset (Docker, Copilot, GPT-4, GCP) are not lost.
 */
export const skillIcons = {
	PHP: SIPHP,
	JavaScript: SIJS,
	Laravel: SILaravel,
	WordPress: SIWordpress,
	React: SIReact,
	'React Native': SIReact,
	'Next.js': SINext,
	'Vue.js': SIVue,
	Svelte: SISvelte,
	TailwindCSS: SITailwind,
	Python: SIPython,
	MySQL: SIMysql,
	Redis: SIRedis,
	AWS: SIAWS,
	Firebase: SIFirebase,
	Supabase: SISupabase,
	'Node.js': SINode,
	'Express.js': SINode
};

export const profile = {
	name: 'Larry Amiel Tablando',
	first: 'Larry Amiel',
	role: 'Senior Full Stack Developer',
	email: 'larryamieltablando@gmail.com',
	location: 'Golden City of Friendship, Philippines',
	github: 'https://github.com/larryamiel/',
	linkedin: 'https://www.linkedin.com/in/larry-amiel-tablando-996993152/',
	/** Written from the CV's own framing: architect, standard-setter, generalist. */
	summary:
		'I build the parts of a product that have to keep working — the architecture underneath it, the billing that has to be right, the reports someone depends on to do their job. Eight years across PHP and JavaScript, most of them as the person a team hands the hard half of the system to.',
	stats: [
		{ value: '8', label: 'years shipping', sub: 'since 2018' },
		{ value: '4', label: 'senior-level roles', sub: 'PH · SE · US clients' },
		{ value: '2', label: 'stacks, deep', sub: 'Laravel/Vue · React/Node' }
	]
};

/** CV-listed roles, newest first. */
export const experiences = [
	{
		id: 'edfolio',
		company: 'EdFolio',
		title: 'Senior Full Stack Developer',
		from: '2025',
		to: '2025',
		kind: 'Ed-tech · school administration',
		summary:
			'Brought in to steady an existing administrative platform and to own the billing side of its architecture.',
		bullets: [
			'Identified and resolved issues within existing administrative systems, improving overall efficiency and reliability.',
			'Designed and implemented solutions for billing-related system architecture to support accurate and scalable operations.'
		],
		skills: [
			'Laravel',
			'Vue.js',
			'TailwindCSS',
			'MySQL',
			'Docker',
			'GitHub',
			'Windsurf',
			'GitHub Copilot'
		]
	},
	{
		id: 'evotech-senior',
		company: 'Evotech Software Solutions Inc',
		title: 'Senior Full Stack Developer',
		from: '2023',
		to: '2025',
		kind: 'Third-party Amazon seller tooling',
		summary:
			'Feature work and architecture at the same time, working directly with Operations on what was actually breaking.',
		bullets: [
			'Collaborated with Operations to investigate and resolve reported issues.',
			'Developed and enhanced features for a third-party Amazon application.',
			'Conducted research and provided recommendations to improve system performance and reliability.',
			'Contributed to system planning and architecture to ensure scalability and maintainability.',
			'Prepared technical documentation and reports for stakeholders.'
		],
		skills: [
			'Laravel',
			'Vue.js',
			'TailwindCSS',
			'MySQL',
			'Python',
			'AWS',
			'Docker',
			'GitHub',
			'Windsurf',
			'GitHub Copilot',
			'GPT-4'
		]
	},
	{
		id: 'precise-media',
		company: 'Precise Media AB',
		title: 'Software Developer',
		from: '2020',
		to: '2023',
		kind: 'Swedish product studio · social platform',
		summary:
			'The primary technical implementer — set the standards the rest of the work was built on, and pushed the team into mobile.',
		bullets: [
			'Designed and contributed to system architecture to ensure scalable and sustainable growth.',
			'Served as the primary technical implementer, building development standards and best practices.',
			'Worked across multiple technologies to deliver reliable, end-to-end solutions.',
			'Drove innovation in mobile development, contributing to a social media-focused platform.'
		],
		skills: [
			'Next.js',
			'React',
			'React Native',
			'Node.js',
			'Express.js',
			'TailwindCSS',
			'MySQL',
			'Firebase',
			'Supabase',
			'GCP',
			'Docker',
			'GitHub'
		]
	},
	{
		id: 'evotech-full',
		company: 'Evotech Software Solutions Inc',
		title: 'Full Stack Developer',
		from: '2018',
		to: '2020',
		kind: 'Agency · client web',
		summary:
			'Client sites end to end — build, ship, then stay on the hook for them. Where the WordPress and Laravel depth came from.',
		bullets: [
			'Provided technical support and responded to customer inquiries in a timely manner.',
			'Built and managed client websites from development through ongoing maintenance.',
			'Developed and maintained projects using WordPress and Laravel.'
		],
		skills: ['WordPress', 'Laravel', 'MySQL', 'jQuery', 'SequelizeORM', 'Bootstrap', 'AJAX']
	}
];

/** Pre-CV roles, kept from the original site data and shown behind a toggle. */
export const earlierExperiences = [
	{
		id: 'stoneveil',
		company: 'Stoneveil Entertainment',
		title: 'Lead Game Developer',
		from: '2017',
		to: '2018',
		kind: 'Indie games',
		summary: 'Lead programmer on Spirits of Tallagone, built in GameMaker Studio 1 and 2.',
		bullets: ['Led the programming side of a released indie title end to end.'],
		skills: ['GameMaker Studio']
	},
	{
		id: 'mystery-room',
		company: 'Mystery Room Houston',
		title: 'Junior Web Developer',
		from: '2017',
		to: '2017',
		kind: 'Escape-room operations',
		summary:
			'An admin web app for a Houston escape-room business: player signups, in-game control and analytics.',
		bullets: ['Built the operator console used to run live rooms and track bookings.'],
		skills: ['PHP', 'MySQL', 'JavaScript']
	}
];

export const projects = [
	{
		id: 'ballview',
		name: 'Ballview',
		kicker: 'Open source · Windows desktop',
		year: '2025',
		href: '/ballview',
		cta: 'Read the case study',
		blurb:
			'A Windows desktop app for watching Major League Baseball pitch by pitch — live play-by-play, Statcast batted-ball data, box scores and highlight clips, all saveable to a single file that reopens with no network at all.',
		highlights: [
			'Live feed polled every 15s, backing off on rate limits and stopping on its own at Final',
			'Every pitch plotted on a real strike zone with type, velocity, spin and break',
			'Whole games written to one JSON file for offline replay'
		],
		stack: ['Tauri 2', 'Rust', 'React', 'TypeScript'],
		shot: '/ballview/shots/live-view.png',
		accent: '#FF4B4B'
	},
	{
		id: 'skwabble',
		name: 'Skwabble',
		kicker: 'Real-time multiplayer · Browser game',
		year: '2026',
		href: '/skwabble',
		cta: 'See how it plays',
		blurb:
			'A word-snatching game for 2–6 players. Tiles flip one at a time, everyone races to spell words from the face-up letters, and any word on the table can be stolen by rebuilding it with one more tile.',
		highlights: [
			'One Cloudflare Durable Object per room, so simultaneous claims resolve strictly in arrival order',
			'Quick Play matchmaking into the fullest open lobby, plus private rooms with house rules',
			'Game rules written as pure TypeScript shared by the client preview and the server'
		],
		stack: ['React', 'TypeScript', 'Cloudflare Workers', 'Durable Objects'],
		shot: '/skwabble/shots/steal-preview.webp',
		accent: '#FF4D8D'
	},
	{
		id: 'seller-investigators',
		name: 'Amazon seller reporting platform',
		kicker: 'Evotech Software Solutions',
		year: '2023–2025',
		blurb:
			'A third-party Amazon Fulfillment reporting platform. I worked the feature side and the architecture side at once — custom reports, automation, and the performance and reliability recommendations that came out of digging into why things broke.',
		highlights: [
			'Custom reporting and automation over Amazon fulfillment data',
			'Issue investigations run directly with the Operations team',
			'Technical documentation and stakeholder reporting as part of the job, not after it'
		],
		stack: ['Laravel', 'Vue.js', 'MySQL', 'AWS', 'Python'],
		accent: '#FFDB58'
	},
	{
		id: 'edfolio-billing',
		name: 'School administration & billing',
		kicker: 'EdFolio',
		year: '2025',
		blurb:
			'A platform for teachers to run their classes and for administrators to handle billing. I took the billing architecture — the part where being approximately right is the same as being wrong.',
		highlights: [
			'Billing-related system architecture designed for accuracy at scale',
			'Reliability problems in the existing admin systems tracked down and fixed'
		],
		stack: ['Laravel', 'Vue.js', 'TailwindCSS', 'MySQL'],
		accent: '#4bffff'
	},
	{
		id: 'social-platform',
		name: 'Social media platform',
		kicker: 'Precise Media AB',
		year: '2020–2023',
		blurb:
			'A social media-focused product where I was the primary technical implementer: the architecture meant to carry sustainable growth, the development standards the team wrote against, and the push into mobile.',
		highlights: [
			'Architecture set up for scalable, sustainable growth',
			'Established the development standards and best practices',
			'Drove the move into React Native mobile'
		],
		stack: ['Next.js', 'React Native', 'Node.js', 'Firebase', 'GCP'],
		accent: '#a78bfa'
	}
];

/** Grouped for the skills panel — reads better than one flat wall of icons. */
export const skillGroups = [
	{
		id: 'frontend',
		label: 'Front end',
		items: [
			'JavaScript',
			'React',
			'Next.js',
			'Vue.js',
			'Svelte',
			'React Native',
			'TailwindCSS',
			'Bootstrap'
		]
	},
	{
		id: 'backend',
		label: 'Back end',
		items: ['PHP', 'Laravel', 'Node.js', 'Express.js', 'Python', 'WordPress']
	},
	{
		id: 'data',
		label: 'Data & infra',
		items: ['MySQL', 'Redis', 'AWS', 'GCP', 'Firebase', 'Supabase', 'Docker']
	},
	{
		id: 'tooling',
		label: 'Tooling & AI',
		items: ['GitHub', 'Windsurf', 'GitHub Copilot', 'GPT-4']
	}
];
