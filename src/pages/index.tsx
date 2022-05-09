/* eslint-disable @next/next/no-img-element */
import dayjs from 'dayjs'
import Link from 'next/link'
import slugify from 'slugify'
import ProfilePicture from '../../public/profilepic.png'
import { getPages, PageData } from '../lib/md'

export const getStaticProps = async () => {
  const pages = await getPages()

  return {
    props: {
      documents: pages.map((p) => ({
        data: {
          ...p.data,
        },
        content: p.content,
        file: p.file,
      })),
    },
  }
}

const Home = ({ documents }: { documents: PageData[] }) => {
  return (
    <>
      <div className='justify-center text-center mx-auto items-center flex mt-10 flex-col py-2'>
        <img
          className='rounded-full'
          alt='Profile Picture'
          src={ProfilePicture.src}
          width='199'
          height='175'
          draggable='false'
        />
        <h1 className='text-3xl font-bold mt-3 my-5 text-red-400'>
          Artie{"'s"} Blog
        </h1>
      </div>

      <div className='justify-center items-center mx-auto flex flex-col align-middle space-x-3'>
        <ul className='display-boxes'>
          {documents.length !== 0 ? (
            documents.slice(0, documents.length).map((d) => (
              <article
                key={`article-${slugify(d.data.title)}`}
                className='a-box'
              >
                <div className='flex flex-col justify-center p-1 lg:p-2'>
                  <h2 className='text-red-400 font-bold text-lg lg:text-2xl'>
                    <Link href={`/p/${slugify(d.data.title).toLowerCase()}`}>
                      <a className='hover'>{d.data.title}</a>
                    </Link>
                  </h2>
                </div>

                <footer className='p-2 flex items-center text-red-400'>
                  <p>
                    {dayjs(d.data.createdAt).format('DD/MM/YYYY - hh:mm A')}
                  </p>
                </footer>
              </article>
            ))
          ) : (
            <div className='justify-center text-center flex mx-auto'>
              <h2 className='text-red-400 italic'>
                I haven{"'"}t posted anything yet!
              </h2>
            </div>
          )}
        </ul>
      </div>
    </>
  )
}

export default Home
