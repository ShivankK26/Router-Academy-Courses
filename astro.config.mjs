import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [starlight({
    title: 'Our Courses',
    social: {
      github: 'https://github.com/ShivankK26/Router-Academy-Courses',
      "youtube": 'https://www.youtube.com/@RouterProtocol',
      telegram: "https://t.me/+nRKsasrX2285YTI1",
      "x.com": "https://x.com/SuperRabbitsDAO",
    },
    customCss: ['./src/tailwind.css'],
    sidebar: [
      {
        label: 'Introduction',
        collapsed: true,
        items: [
          {
            label: 'About',
            link: '/introduction/about/'
          }
        ]
      },
      {
        label: 'Understanding Router Nitro',
        collapsed: true,
        autogenerate: { directory: 'Understanding Router Nitro' }
      },
      {
        label: 'Building on Router Nitro',
        collapsed: true,
        autogenerate: { directory: 'Building on Router Nitro' }
      },
      {
        label: 'Understanding Router CCIF',
        collapsed: true,
        autogenerate: { directory: 'Understanding Router CCIF' }
      },
      {
        label: 'Building on Router CCIF',
        collapsed: true,
        autogenerate: { directory: 'Building on Router CCIF' }
      },
      {
        label: 'Understanding Router Chain',
        collapsed: true,
        autogenerate: { directory: 'Understanding Router Chain' }
      },
      {
        label: 'Building on Router Chain',
        collapsed: true,
        autogenerate: { directory: 'Building on Router Chain' }
      },
      {
        label: 'Articles by Our Community ❤️',
        link: '/articles/'
      },
      {
        label: 'DApp Tutorials',
        link: '/tutorials/'
      }
    ]
  }), tailwind({
    // Disable the default base styles:
    applyBaseStyles: false,
  })]
});