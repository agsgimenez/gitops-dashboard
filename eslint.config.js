import html from "eslint-plugin-html";

export default [
  {
    files: ["*.html"],
    plugins: { html },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        // Browser
        window: "readonly", document: "readonly", location: "readonly",
        localStorage: "readonly", sessionStorage: "readonly",
        fetch: "readonly", alert: "readonly", confirm: "readonly",
        Notification: "readonly", atob: "readonly",
        URL: "readonly", URLSearchParams: "readonly",
        setTimeout: "readonly", setInterval: "readonly", clearInterval: "readonly",
        console: "readonly", encodeURIComponent: "readonly",
        Math: "readonly", Date: "readonly", Promise: "readonly",
        Map: "readonly", Set: "readonly", JSON: "readonly",
        // Project globals (config.js + cross-script)
        CI_CONFIG: "readonly",
      },
    },
    rules: {
      "no-var": "warn",
    },
  },
];
