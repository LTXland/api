const decoder = new TextDecoder("utf-8");

export const list = async () => {
    const streams = JSON.parse(decoder.decode(await Deno.readFile(`./launches/streams.json`)));

    return JSON.stringify(streams, null, 2)
}