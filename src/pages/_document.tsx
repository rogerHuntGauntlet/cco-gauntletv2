import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" />
          
          {/* Favicon */}
          <link rel="icon" href="/assets/icons/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/brain-card-32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/brain-card-16.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/brain-card-48.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/assets/icons/brain-card-optimized.png" />
        </Head>
        <body>
          {/* Script to prevent flash of wrong theme */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme');
                    if (theme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else if (theme === 'light') {
                      document.documentElement.classList.remove('dark');
                    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    }
                  } catch (e) {}
                })();
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 