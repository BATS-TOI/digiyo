import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Script from 'next/script'
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme';
import createEmotionCache from '../styles/createEmotionCache';
import '../styles/globals.css';
import { Amplify, Auth, API, Storage } from 'aws-amplify';
import * as fcl from '@onflow/fcl';
import awsExports from '../src/aws-exports';
import * as gtag from '../lib/gtag'

Amplify.configure(awsExports)
Auth.configure({mandatorySignIn: false})
API.configure(awsExports)
Storage.configure(awsExports)

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const router = useRouter()
  const mobile = useMediaQuery(theme.breakpoints.down(`md`))
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [flowAddr, setFlowAddr] = useState(null);
  const [nfts, setNfts] = useState({})
  const [loadedNfts, setLoadedNfts] = useState(false)

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    return fcl
      .currentUser()
      .subscribe((res: any) => setFlowAddr(res.addr))
    }
  , [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name={`viewport`} content={`initial-scale=1, width=device-width`} />
      </Head>
      <Script
        strategy={`afterInteractive`}
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id={`gtag-init`}
        strategy={`afterInteractive`}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Component
            key={router.asPath}
            {...pageProps}
            authz={{
              flowAddr: flowAddr,
              setFlowAddr: setFlowAddr,
              nfts: nfts,
              setNfts: setNfts,
              loadedNfts: loadedNfts,
              setLoadedNfts: setLoadedNfts
            }}
            mobile={mobile}
          />
      </ThemeProvider>
    </CacheProvider>
  );
}
