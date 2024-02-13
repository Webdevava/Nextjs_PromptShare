import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'
import { Children } from 'react'
import Head from 'next/head'; // Import Head for managing the document head

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PromptShare</title>
        <meta name="description" content="Discover & Share AI Prompts" />
      </Head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
