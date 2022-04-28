import { parse } from "https://deno.land/std@0.132.0/encoding/toml.ts";

const decoder = new TextDecoder("utf-8");

export const list = async () => {
    // deno-lint-ignore no-explicit-any
    let launches: Array<any> = [];
    Deno.readDir("./launches");
    for await (const file of Deno.readDir("./launches")){
        if(file.name !== ".git" && file.name !== "streams.json" && !file.isDirectory) {
            const launch = decoder.decode(await Deno.readFile(`./launches/${file.name}`));
            launches.push(parse(launch));
        }
    }

    launches = launches.sort((a: { date?: string }, b: { date?: string }) => a.date! < b.date!? -1:1)

    return JSON.stringify(launches, null, 2)
}