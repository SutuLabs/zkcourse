module.exports = {
  enabled: process.env.NODE_ENV === "production",
  content: ["./docs/.vitepress/**/*.js", "./docs/.vitepress/**/*.vue", "./docs/.vitepress/**/*.ts", "./docs/cheats/**/*.md"],
  options: {
    safelist: ["html", "body"],
  },
};
