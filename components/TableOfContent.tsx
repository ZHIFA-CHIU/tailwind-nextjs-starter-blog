'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const TableOfContent = ({ toc }: { toc: { value: string; url: string; depth: number }[] }) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const headings = toc
      .map((sel) => document.querySelector(sel.url) as HTMLElement | null)
      .filter((el): el is HTMLElement => !!el)

    if (!headings.length) return

    const selectHeading = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => {
          const at = a.target.getBoundingClientRect().top
          const bt = b.target.getBoundingClientRect().top
          return Math.abs(at) - Math.abs(bt)
        })
      if (visible.length) {
        setActiveId(visible[0].target.id)
      }
    }

    const io = new IntersectionObserver(selectHeading, {
      root: null,
      // Switch highlight when a heading passes ~30% from top of the container
      rootMargin: '-20% 0px -80% 0px',
      threshold: [0, 0.1, 0.5, 1],
    })

    headings.forEach((h) => io.observe(h))

    // If user lands on /page#hash, mark it active immediately
    if (location.hash) setActiveId(location.hash.slice(1))

    // Re-observe if layout changes (images/fonts)
    const ro = new ResizeObserver(() => {
      headings.forEach((h) => {
        io.unobserve(h)
        io.observe(h)
      })
    })
    headings.forEach((h) => ro.observe(h))

    return () => {
      ro.disconnect()
      headings.forEach((h) => io.unobserve(h))
      io.disconnect()
    }
  }, [toc])
  return (
    <div className="border-gray-200 pb-6 dark:border-gray-700">
      <h2 className="mb-4 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
        Table of Contents
      </h2>
      <nav>
        <ul className="space-y-2">
          {toc.map((item) => {
            const isActive = activeId === item.url.substring(1) // Remove the # from url
            return (
              <li key={item.url} style={{ paddingLeft: `${(item.depth - 2) * 0.75}rem` }}>
                <Link
                  href={item.url}
                  className={`block text-sm leading-5 transition-all duration-75 ease-in-out ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 border-primary-500 -ml-2 translate-x-1 transform border-l-2 pl-2 font-medium'
                      : 'hover:text-primary-500 dark:hover:text-primary-400 text-gray-700 hover:translate-x-0.5 dark:text-gray-300'
                  }`}
                >
                  {item.value}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
export default TableOfContent
