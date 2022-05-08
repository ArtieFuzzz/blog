import Link from 'next/link'
import slugify from 'slugify'
import { getPages } from '../../lib/md'

export const getStaticProps = async ({ params }: { params: any }) => {
  const pages = await getPages()
  const page = pages.find(
    (p) => slugify(p.data.title).toLowerCase() === params.page
  )

  return {
    props: {
      document:
        page !== undefined
          ? {
              data: {
                ...page.data,
              },
              file: page.file,
              content: page.content,
            }
          : null,
    },
  }
}

export const getStaticPaths = async () => {
  const pages = await getPages()

  return {
    paths: pages.map((p) => ({
      params: {
        page: slugify(p.data.title.toLowerCase()),
      },
    })),
    fallback: 'blocking',
  }
}

const Page = ({ document }: { document: any }) => {
  if (!document) {
    return (
      <>
        <div className='justify-center items-center flex middle text-center'>
          <div className='lg:grid lg:text-center lg:relative mb-5 text-center gap-4'>
            <h1>This page {`doesn't`} exist!</h1>
            <div className='flex items-start mx-auto space-x-3'>
              <Link href='/'>
                <a className='btn'> Home </a>
              </Link>
              <a href='#' onClick={() => history.back()} className='btn'>
                Go Back
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <main>
        <article className='py-12 max-w-6xl mx-auto'>
          <h1 className='text-center mx-auto text-5xl text-red-400'>
            {document.data.title}
          </h1>

          <h2 className='text-center mx-auto text-lg text-red-300'>
            {document.data.description}
          </h2>

          <div
            className='mx-auto mt-5 prose text-red-300 prose-code:text-red-300 prose-headings:text-red-400'
            dangerouslySetInnerHTML={{ __html: document.content }}
          />
        </article>
      </main>
    </>
  )
}

export default Page
