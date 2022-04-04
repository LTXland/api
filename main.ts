// deno-lint-ignore-file no-case-declarations
import { serve } from "https://deno.land/std@0.129.0/http/server.ts"

import { main } from "./routes/index.ts";
import * as launches from "./routes/launches.ts";
import * as wiki from "./routes/wiki.ts";
import * as streams from "./routes/streams.ts";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname, _params = new URLSearchParams(url.search);
  const route = (route:string) => { const regexRoute = new RegExp(route, "gmi"); if(regexRoute.test(path)){ return path }}

  let tr, rb, ct = "";

  switch(path){
    case '/':
      tr = true, rb = await main(), ct = "application/json";
      break;

    // launches
    case '/launches':
      tr = true, rb = await launches.list(), ct = "application/json";
      break;

    case '/streams':
      tr = true, rb = await streams.list(), ct = "application/json";
      break;
    
    case '/wiki':
      tr = true, rb = await wiki.list(), ct = "application/json";
      break;
    case route('/wiki/.'):
      const article = path.replace("/wiki/", "");
      tr = true, rb = await wiki.get(article), ct = "text/html; charset=UTF-8";
      break;
    
    
    default:
      tr = true, rb = "not found", ct = "text/plain";
  }

  let res;

  if(tr){
    res = new Response(rb, { headers: { "content-type": ct } });
  } else {
    res = Response.redirect(rb, 302);
  }
  return res!;
}

await serve(handler);