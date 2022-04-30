// deno-lint-ignore-file no-case-declarations
import { serve } from "https://deno.land/std@0.129.0/http/server.ts"

import { main } from "./routes/index.ts";
import * as launches from "./routes/launches.ts";
import * as wiki from "./routes/wiki.ts";
import * as streams from "./routes/streams.ts";

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname, _params = new URLSearchParams(url.search);
  const route = (route:string) => { const regexRoute = new RegExp(route, "gmi"); if(regexRoute.test(path)){ return path }}

  let response, response_body, content_type = "";

  switch(path){
    case '/':
      response = true, response_body = await main(), content_type = "application/json";
      break;
    
    case '/html':
      response = false, response_body = "https://ltx.land";
      break;

    case '/launches':
      response = true, response_body = await launches.list(), content_type = "application/json";
      break;

    case '/streams':
      response = true, response_body = await streams.list(), content_type = "application/json";
      break;
    
    case '/wiki':
      response = true, response_body = await wiki.list(), content_type = "application/json";
      break;
    case route('/wiki/.'):
      const article = path.replace("/wiki/", "");
      response = true, response_body = await wiki.get(article), content_type = "text/html; charset=UTF-8";
      break;

    case '/github':
      response = false, response_body = "https://github.com/LTXland";
      break;
    
    case '/discord':
      response = false, response_body = "https://discord.gg/Zma3aV9Zdm";
      break;
    
    default:
      response = true, response_body = "not found", content_type = "text/plain";
  }

  if(response){
    response = new Response(response_body, { headers: { "content-type": content_type } });
  } else {
    response = Response.redirect(response_body, 302);
  }
  return response!;
}

await serve(handler);