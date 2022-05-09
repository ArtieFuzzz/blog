import { readdirSync, readFileSync } from 'fs'
import graymatter from 'gray-matter'
import { marked } from 'marked'
import { join } from 'path'
import { getHighlighter, Highlighter } from 'shiki'

export interface PageData {
  data: Record<string, any>
  file?: string
  content: string
}

let highlighter!: Highlighter

export const getPages = async () => {
  if (!highlighter) {
    highlighter = await getHighlighter({
      theme: 'rose-pine'
    })
  }

  const _files = readdirSync(join(process.cwd(), 'content'), { encoding: 'utf-8' })
  const files = _files.filter(file => file.endsWith('.md'))

  let pages = []

  for (const file of files) {
    const contents = readFileSync(join(process.cwd(), 'content', file), 'utf8')
    const { data, content } = graymatter(contents)

    marked.use({
      renderer: {
        code(code, lang) {
          return highlighter.codeToHtml(code, { lang, theme: 'rose-pine' })
        }
      },
      smartLists: true,
      smartypants: true
    })

    const mdContent = marked(content, {
      gfm: true
    })

    pages.push({ data, file, content: mdContent })
  }

  return pages
}

export const getPage = async (page: string) => {
  if (!highlighter) {
    highlighter = await getHighlighter({
      theme: 'rose-pine'
    })
  }

  const contents = readFileSync(join(process.cwd(), 'content', `${page}.md`), 'utf8')
  const { data, content } = graymatter(contents)

  console.log(data)
  console.log(content)

  marked.use({
    renderer: {
      code(code, lang) {
        return highlighter.codeToHtml(code, { lang, theme: 'rose-pine' })
      }
    },
    smartLists: true,
    smartypants: true
  })

  const mdContent = marked(content, {
    gfm: true
  })

  return { data, content: mdContent }
}
