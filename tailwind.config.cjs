/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-elevation")(["responsive"]),
    require("tailwindcss-no-scrollbar"),
  ],
};

module.exports = config;
