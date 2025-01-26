/** @type {import('tailwindcss').Config} */

const { colors, fontFamily } = require("tailwindcss/defaultTheme");

const palette = {
  parchment: "#f1e6d5",
  akaroa: "#d5baa5",
  turkishRose: "#bc7b8c",
  cannonPink: "#914b75",
  voodoo: "#5b3f69",
};

const { parchment, akaroa, turkishRose, cannonPink, voodoo } = palette;

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        background: parchment,
        primary: cannonPink,
        secondary: turkishRose,
        tertiary: akaroa,
        textColor: parchment,
        headerColor: voodoo,
        borderColor: voodoo,
        buttonColor: voodoo,
      },
      fontFamily: {
        macondo: ["Macondo", ...fontFamily.serif],
        cormorantGaramond: ["Cormorant Garamond", ...fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
