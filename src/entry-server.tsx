import { renderToString } from 'react-dom/server';
import { prerenderToNodeStream } from 'react-dom/static';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { routeConfig } from './app/route-config';
import { AppShell } from './app/app-shell';

const handler = createStaticHandler(routeConfig);

export async function render(pathname: string): Promise<string> {
  const context = await handler.query(new Request(`https://romamakes.com${pathname}`));
  if (context instanceof Response) throw new Error(`Unexpected response for ${pathname}: ${context.status}`);
  const router = createStaticRouter(handler.dataRoutes, context);
  let renderError: unknown;
  const tree = <AppShell staticMarkup><StaticRouterProvider router={router} context={context} hydrate={false} /></AppShell>;
  // Resolve every lazy route, then serialize finished markup. The synchronous
  // pass avoids embedding streaming Suspense payloads in a static fragment.
  const { prelude } = await prerenderToNodeStream(tree, {
    onError(error) { renderError ??= error; },
  });
  for await (const _chunk of prelude) { /* drain pending route imports */ }
  if (renderError) throw renderError;
  const html = renderToString(tree);
  if (/<!--\$(?:!|\?)-->|<script>/.test(html)) throw new Error(`Unfinished static markup for ${pathname}`);
  return html;
}
