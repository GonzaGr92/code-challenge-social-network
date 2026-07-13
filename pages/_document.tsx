import { addBasePath } from 'next/dist/client/add-base-path'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href={addBasePath('/apple-touch-icon.png')} />
        <link rel="icon" type="image/png" sizes="32x32" href={addBasePath('/favicon-32x32.png')} />
        <link rel="icon" type="image/png" sizes="16x16" href={addBasePath('/favicon-16x16.png')} />
        <link rel="manifest" href={addBasePath('/site.webmanifest')} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
