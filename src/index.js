const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));

const LANGUAGES = (process.env.LANGUAGES || "en").split(",");
const DEFAULT_LANGUAGE = "en";

app.get("/", async (req, res) => {
  const lang = req.acceptsLanguages(LANGUAGES) || DEFAULT_LANGUAGE;

  res.redirect(302, `/${lang}`);
});

new Promise((resolve) => {
  app.listen({ port: 4000 }, () => resolve());
}).then(() => {
  console.log(`🚀 Server ready`);
});
