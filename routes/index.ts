export const main = async () => {
    const json = {
        "dev": {
            "sha": await fetch("https://api.github.com/repos/LTXland/ltx/commits").then(res => res.json()).then((res) => { return res[0].sha }),
            "id": Deno.env.get("DENO_DEPLOYMENT_ID") ? `https://api-ltx-${Deno.env.get("DENO_DEPLOYMENT_ID")}.deno.dev` : "dev",
            "deployment_region": Deno.env.get("DENO_REGION") ? Deno.env.get("DENO_REGION") : "local"
        },

        "routes": {
            "html": "https://ltx.land",
            "launches": "https://api.ltx.land/launches",
            "streams": "https://api.ltx.land/streams",
            "wiki": "https://api.ltx.land/wiki",
            "wiki/*": "https://api.ltx.land/wiki/*",
        },

        "links": {
            "github": "https://github.com/LTXland",
            "discord": "https://discord.gg/Zma3aV9Zdm",
        }
    }

    return JSON.stringify(json, null, 2)
}