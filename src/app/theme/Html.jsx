import {h} from '../../../hyperapp'

// Bundle css for this view
import './style.css'

// Root container component
export const Html = ({state}, children) => (
  <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1"/>

      <title>{state.title}</title>
      <meta name="description" content={state.description} />

      <link rel="home" href="https://hyperapp.rocks/"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="canonical" href="https://hyperapp.rocks/" />

      {/* Open graph */}
      <meta property="og:title" content={state.title} />
      <meta property="og:description" content={state.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hyperapp.rocks/" />
      <meta property="og:image" content="/card.png" />
      <meta property="og:image:secure_url" content="/card.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={state.title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:url" content="https://hyperapp.rocks/"/>
      <meta name="twitter:title" content={state.title} />

      {/* Android */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="mobile-web-app-capable" content="yes"/>
      <meta name="theme-color" content="#3369e7"/>

      {/* IOS */}
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="#3369e7"/>
      <meta name="apple-mobile-web-app-title" content={state.title} />
      <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />

      {/* Windows */}
      <meta name="msapplication-TileImage" content="/icon-512x512.png" />
      <meta name="msapplication-TileColor" content="#3369e7"/>

      {/* CSS bundle */}
      <link rel="stylesheet" href="/client.62456f60.css"/>

    </head>
    <body>
      {children}
      {
        // This will only appear in the server-side rendered views
        typeof window === 'undefined' && [

          // State used for the server-side render. 
          // Hyperapp will pick this up and hydrate the app.
          <script>window.initialState = [INJECT_INIT_STATE]</script>,

          // JS bundle
          <script src="/client.62456f60.js"></script>,
          
          // Google Analytics, fight me - (ง ͠° ͟ʖ ͡°)ง
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-73430538-4"></script>,
          <script>[INJECT_GA_CODE]</script>
        ]
      }
    </body>
  </html>
)
