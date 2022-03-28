import { parse, stringify } from "https://deno.land/std@0.132.0/encoding/toml.ts";

const decoder = new TextDecoder("utf-8");

export const list = async () => {
    let temp: Array<any> = [];
    Deno.readDir("./launches");
    for await (const file of Deno.readDir("./launches")){
        if(file.name !== ".git") {
            const launch = decoder.decode(await Deno.readFile(`./launches/${file.name}`));
            temp.push(parse(launch));
        }
    }

    temp = temp.sort((a: { date?: string }, b: { date?: string }) => a.date! < b.date!? -1:1)

    return JSON.stringify(temp, null, 2)
}