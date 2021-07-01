const express = require("express");
const morgan = require("morgan");

const LANGUAGES = (process.env.LANGUAGES || "en").split(",");
const DEFAULT_LANGUAGE = "en";

const app = express();

app.use(morgan("combined"));

app.get("/", async (req, res) => {
  const lang = req.acceptsLanguages(LANGUAGES) || DEFAULT_LANGUAGE;

  res.redirect(302, `/${lang}`);
});

new Promise((resolve) => {
  const server = app.listen({ port: 4000 }, () => resolve());

  process.on("SIGTERM", () => server.close());
}).then(() => {
  console.log(`🚀 Server ready`);
});
