export const config = {
  mode: "development" as "production" | "development" | "tunnel",
  name: "incmix",
  slug: "incmix",

  frontendUrl: "http://localhost:3000",
  backendUrl: "http://localhost:4000",
  userIdLength: 15,
  defaultRedirectPath: "/home",

  aboutUrl: "/about",
  statusUrl: "https://status.incmix.com",
  productionUrl: "https://incmix.com",

  description:
    "Your last TypeScript template to build modern web apps. Implementation-ready. MIT licensed.",
  keywords:
    "starter kit, fullstack, monorepo, typescript, hono, honojs, drizzle, shadcn, react, postgres, pwa",

  notificationsEmail: "uincmix@gmail.com",
  senderIsReceiver: false,

  debug: false,
  maintenance: false,

  // Webhooks with n8n
  newsletterWebhookUrl: "https://incmix.app.n8n.cloud/webhook/subscription?",
  contactWebhookUrl: "https://incmix.app.n8n.cloud/webhook/contact?",

  // Payment with Paddle
  // paddleToken: 'live_ba8bb57b62089459e4f4fd1da8c',
  // paddlePriceIds: {
  //   donate: 'pri_01hq8hech7se5y1dw9tnscfzpc',
  // },
  paddleToken: "test_85052d6574ab68d36b341e0afc8",
  paddlePriceIds: {
    donate: "pri_01hq8da4mn9s0z0da7chh0ntb9",
  },

  sentryDsn:
    "https://0f6c6e4d1e825242d9d5b0b73faa97fa@o4506897995399168.ingest.us.sentry.io/4506898171559936",
  sentSentrySourceMaps: true,

  // Customer support with Gleap
  gleapToken: "1ZoAxCRA83h5pj7qtRSvuz7rNNN9iXDd",

  // File handling with tus
  tusUrl: "http://localhost:1080",
  tusPort: 1080,
  s3UploadBucket: "incmix-uploads",
  s3UploadRegion: "eu-west-1",
  privateCDNUrl: "https://cdn-priv.incmix.com",
  publicCDNUrl: "https://cdn.incmix.com",

  // Theme settings
  theme: {
    rose: { primary: "#e11d48" },
    colorDarkBackground: "hsl(240 10% 9%)",
    strokeWidth: 1.5,
    screenSizes: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
  },

  // Enabled OAuth providers
  oauthOptions: ["Google"],

  // Optional settings
  has: {
    pwa: false,
    signUp: true,
    onboarding: true,
  },

  // Languages
  languages: [
    { value: "en", label: "English" },
    { value: "nl", label: "Nederlands" },
  ],

  defaultLanguage: "en" as const,

  // App specific entity types
  entityTypes: ["USER", "ORGANIZATION", "WORKSPACE", "PROJECT"] as const,
  contextEntityTypes: ["ORGANIZATION", "WORKSPACE", "PROJECT"] as const,

  rolesByType: {
    systemRoles: ["USER", "ADMIN"] as const,
    entityRoles: ["MEMBER", "ADMIN"] as const,
    allRoles: ["USER", "MEMBER", "ADMIN"] as const,
  },

  // Company details
  company: {
    name: "incmix",
    shortName: "incmix",
    email: "info@incmix.com",
    postcode: "95014",
    tel: "+1 781123123",
    streetAddress: "Incmix Street 1",
    city: "Cupertino",
    country: "US",
    googleMapsUrl: "https://goo.gl/maps/SQlrh",
    scheduleCallUrl: "https://cal.com/incmix",
    twitterUrl: "https://twitter.com/incmix",
    twitterHandle: "@incmix",
    githubUrl: "https://github.com/incmix/incmix",
    mapZoom: 4,
    coordinates: {
      lat: 51.92760809717153,
      lon: 4.47421039909924,
    },
  },
  oauthProviderOptions: ["GITHUB", "GOOGLE", "MICROSOFT"] as const,

  // Roles
  // TODO, make dynamic and type safe, for now it's hardcoded
}

export default config

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type Config = DeepPartial<typeof config>
