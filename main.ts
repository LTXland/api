// deno-lint-ignore-file no-case-declarations
import { serve } from "https://deno.land/std@0.129.0/http/server.ts"

import * as launches from "./launches.ts";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname, _params = new URLSearchParams(url.search);
  const route = (route:string) => { const regexRoute = new RegExp(route, "gmi"); if(regexRoute.test(path)){ return path } else { return "/404" }}

  let tr, rb, ct = "";

  switch(path){
    case '/':
      tr = true, rb = "api", ct = "text/plain";
      break;

    // launches
    case '/launches':
      tr = true, rb = await launches.list(), ct = "application/json";
      break;
    /*case '/launches/latest':
      tr = true, rb = await launches.latest(), ct = "application/json";
      break;*/
      
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