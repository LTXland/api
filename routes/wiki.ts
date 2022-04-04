import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";

const decoder = new TextDecoder("utf-8");

export const list = async () => {
    let articles: Array<any> = [];
    Deno.readDir("./wiki");
    for await (const file of Deno.readDir("./wiki")){
        if(file.name !== ".git" && file.name !== "streams.json" && !file.isDirectory) {
            articles.push(file.name);
        }
    }
    return JSON.stringify(articles, null, 2)
}

export const get = async (src: string) => {
    src = src.replaceAll(".md", "");
    let article;
    try {
        article = Marked.parse(decoder.decode(await Deno.readFile(`./wiki/${src}.md`))).content;
    } catch(error) {
        article = Marked.parse(decoder.decode(await Deno.readFile(`./wiki/404.md`))).content;
    }
    return article
}