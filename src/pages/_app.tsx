import type { AppProps } from 'next/app'
import Head from 'next/head'
import ProfilePicture from '../../public/profilepic.png'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Artie{"'"}s Blog</title>

        <meta name='og:title' content='Artie Fuzzz' />
        <meta name='theme-color' content='#f87171' />
        <meta name='og:image' content={ProfilePicture.src} />
        <meta
          name='og:description'
          content='Self Taught Frontend / Backend Developer'
        />
        <meta
          name='description'
          content='Self Taught Frontend / Backend Developer'
        />
        <meta name='og:url' content='https://artiefuzzz.is-a.dev' />
        <meta name='og:site_name' content='Artie' />
        <meta name='keywords' content='ArtieFuzzz, Artie, Fuzzz' />
      </Head>
      
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
