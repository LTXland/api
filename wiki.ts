import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";

const decoder = new TextDecoder("utf-8");

export const get = async (src: string) => {
    src = src.replaceAll(".md", "");
    let launch;
    try {
        launch = Marked.parse(decoder.decode(await Deno.readFile(`./wiki/${src}.md`))).content;
    } catch(error) {
        launch = Marked.parse(decoder.decode(await Deno.readFile(`./wiki/404.md`))).content;
    }
    return launch
}