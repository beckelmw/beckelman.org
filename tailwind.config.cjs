module.exports = {
  content: ["./src/**/*.{html,js,hbs}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
