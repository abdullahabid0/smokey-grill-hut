import fs from "fs";
import path from "path";

const BASE_PATH = "/smokey-order-hut";
const DIST_DIR = "dist";
const CLIENT_DIR = path.join(DIST_DIR, "client");
const ASSETS_DIR = path.join(CLIENT_DIR, "assets");

function findAssets(dir) {
  const files = fs.readdirSync(dir);
  const css = files.filter((f) => f.endsWith(".css"));
  const js = files.filter((f) => f.endsWith(".js")).sort();
  return { css, js };
}

function generateIndexHtml() {
  const { css, js } = findAssets(ASSETS_DIR);

  const cssLinks = css
    .map((f) => `    <link rel="stylesheet" crossorigin href="${BASE_PATH}/assets/${f}">`)
    .join("\n");

  const jsScripts = js
    .map((f) => `    <script type="module" crossorigin src="${BASE_PATH}/assets/${f}"></script>`)
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Smokey Grill Hut · Flame-Grilled Burgers & Shawarmas in Model Town, Lahore</title>
    <meta name="description" content="Order sizzling grilled burgers, shawarmas, platters and more from Smokey Grill Hut, Model Town Lahore. Fast delivery, COD available.">
    <meta property="og:title" content="Smokey Grill Hut · Lahore">
    <meta property="og:description" content="Smokey & grilled perfection since 2024. Order now via WhatsApp.">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary">
${cssLinks}
  </head>
  <body>
    <div id="root"></div>
${jsScripts}
  </body>
</html>
`;

  fs.writeFileSync(path.join(DIST_DIR, "index.html"), html);
  fs.writeFileSync(path.join(CLIENT_DIR, "index.html"), html);

  // Ensure 404.html exists in dist root for GitHub Pages SPA routing
  const source404 = path.join(CLIENT_DIR, "404.html");
  const target404 = path.join(DIST_DIR, "404.html");
  if (fs.existsSync(source404)) {
    fs.copyFileSync(source404, target404);
  }

  console.log("✅ GitHub Pages static files generated in dist/");
  console.log("   - dist/index.html");
  console.log("   - dist/404.html");
  console.log("   - dist/client/index.html");
}

generateIndexHtml();
