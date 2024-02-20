import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import partytown from '@astrojs/partytown'
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: 'https://34to70.com/',
  integrations: [
    tailwind(),
    partytown({
			config: {
			  forward: ["dataLayer.push"],
			},
		}),
  ],
  output: "server",
  adapter: netlify()
});