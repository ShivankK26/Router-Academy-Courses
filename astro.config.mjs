import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'RouterAcademy',
    social: {
      github: 'https://github.com/ShivankK26/Router-Academy-Courses',
	  "x.com": "https://x.com/SuperRabbitsDAO",
    },
    customCss: ['./src/tailwind.css',],
    sidebar: [
	{
      label: 'Introduction',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'About',
        slug: 'introduction/about'
      }]
  },
	{
		label: 'Understanding Router Nitro',
      	autogenerate: {
			directory: 'Understanding Router Nitro'
		}
	},
  {
		label: 'Building on Router Nitro',
      	autogenerate: {
			directory: 'Building on Router Nitro'
		}
	},
  {
		label: 'Understanding Router CCIF',
      	autogenerate: {
			directory: 'Understanding Router CCIF'
		}
	},
  {
		label: 'Building on Router CCIF',
      	autogenerate: {
			directory: 'Building on Router CCIF'
		}
	},
  {
		label: 'Understanding Router Chain',
      	autogenerate: {
			directory: 'Understanding Router Chain'
		}
	},
	{
		label: 'Building on Router Chain',
      	autogenerate: {
			directory: 'Building on Router Chain'
		}
	},
	]
  }), tailwind({
	// Disable the default base styles:
	applyBaseStyles: false,
  })]
});