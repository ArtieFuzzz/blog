import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
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

      <nav className='flex items-center justify-between flex-wrap p-3'>
        <div className='flex items-center flex-shrink-0 text-white mr-5 px-1'>
          <span className='font-semibold text-xl tracking-tight'>Artie{'\''}s Blog</span>
        </div>
        <div
          className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'
          style={{ marginTop: '0.30rem' }}
        >
          <div className='text-sm lg:flex-grow'>
            <Link href='/'>
              <a className='navbar-item'>
                Home
              </a>
            </Link>
          </div>
        </div>
      </nav>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
