// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "destination",
        label: "Destinations",
        path: "content/destinations",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "region",
            label: "Region",
            required: true
          },
          {
            type: "string",
            name: "type",
            label: "Type"
          },
          {
            type: "image",
            name: "image",
            label: "Main Image"
          },
          {
            type: "string",
            name: "description",
            label: "Main Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "insiderTip",
            label: "The Insider Take",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "perk",
            label: "Exclusive Perk",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
