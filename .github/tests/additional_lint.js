import { parse } from "es-html-parser";
import fs from "node:fs/promises";

const BANNED_TAGS = ["script"];

const lintFile = async (path) => {
  const fHandle = await fs.open(path);
  const text = await fHandle.readFile({
    encoding: "utf-8",
  });
  const { ast, entries } = parse(text);
  const seenTags = new Set();
  const traverse = (node) => {
    if (node.type === "Tag") {
      seenTags.add(node.name);
    }
    if (node.children !== undefined) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  };
  traverse(ast);
  let hadErrors = false;
  for (const bannedTag of BANNED_TAGS) {
    if (seenTags.has(bannedTag)) {
      console.error(`Usage of tag ${bannedTag} is prohibited.`);
      hadErrors = true;
    }
  }
  if (hadErrors) {
    throw new Error(`File ${path} has errors.`);
  }
};

const main = async () => {
  const files = await fs.readdir(".");
  await Promise.all(
    files.filter((fname) => fname.endsWith(".html")).map(lintFile),
  );
};

await main();
