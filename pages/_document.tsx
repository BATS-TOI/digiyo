import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme, { mavenPro } from '../styles/theme';
import createEmotionCache from '../styles/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={mavenPro.className}>
        <Head>
          <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"/>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="google-site-verification" content="b4iPTA5Zh0N-sNujgR3exlAbAQDJg1MAWy4FIMLJ3pc" />
          <meta property="og:title" content="digiYo" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="A sport-focused NFT minting platform" />
          <meta property="og:image" content="https://www.digiyo.io/logo512.png" />
          <meta property="og:url" content="https://www.digiyo.io/" />
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="digiYo" />
          <meta name="twitter:description" content="A sport-focused NFT minting platform" />
          <meta name="twitter:image" content="https://www.digiyo.io/logo512.png" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
