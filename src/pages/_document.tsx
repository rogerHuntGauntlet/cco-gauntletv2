import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" />
          
          {/* Favicons */}
          <link rel="icon" type="image/png" sizes="16x16" href="/branding/favicons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/branding/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/branding/favicons/favicon-48x48.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/branding/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/branding/favicons/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/branding/favicons/android-chrome-512x512.png" />
          
          {/* Open Graph */}
          <meta property="og:image" content="/branding/social/logo-og-image.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
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