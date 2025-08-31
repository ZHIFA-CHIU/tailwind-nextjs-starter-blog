'use client'

import { useCallback, useId, useMemo, useState } from 'react'
import Modal from './system_design/SystemDesignModal'
import { AnimatePresence, motion, type Variants } from 'framer-motion'

// Apple-style modal demo using Tailwind CSS + Framer Motion
// Demonstrates: Backdrop, Header, Content, Footer, a11y labels, ESC/backdrop close

const overlayVariants: Variants = {
  visible: { opacity: 1, transition: { duration: 0.18 } },
  hidden: { opacity: 0, transition: { duration: 0.18 } },
}

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 420, damping: 30, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: { duration: 0.14 },
  },
}

export default function SystemDesignModalDemo() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  const titleId = useId()
  const descId = useId()

  const startClose = useCallback(() => {
    // Play exit animation first, then unmount modal
    setClosing(true)
  }, [])

  const handleExitComplete = useCallback(() => {
    setOpen(false)
    setClosing(false)
  }, [])

  const footerButtons = useMemo(
    () => (
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={startClose}
          className="inline-flex items-center justify-center rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={startClose}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 active:bg-blue-600"
        >
          Continue
        </button>
      </div>
    ),
    [startClose]
  )

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-black/90 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
      >
        Open Modal
      </button>

      {/* Modal root acts as the portal container. */}
      <Modal
        open={open}
        onClose={() => {
          if (!closing) startClose()
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        {/* Backdrop for click-to-close; visual overlay is animated separately with pointer-events-none */}
        <Modal.Backdrop className="absolute inset-0" />

        {/* Animated visual overlay (keeps Backdrop clickable) */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-black/50 backdrop-blur-sm"
              variants={overlayVariants}
              initial="hidden"
              animate={closing ? 'hidden' : 'visible'}
              exit="hidden"
            />
          )}
        </AnimatePresence>

        {/* Content panel with header/body/footer */}
        <Modal.Content as="section" className="relative z-10 w-full max-w-lg">
          <AnimatePresence>
            {open && (
              <motion.div
                role="document"
                variants={panelVariants}
                initial="hidden"
                animate={closing ? 'exit' : 'visible'}
                exit="exit"
                onAnimationComplete={() => {
                  if (closing) handleExitComplete()
                }}
                className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70"
              >
                <Modal.Header
                  as="header"
                  className="flex items-center justify-between gap-3 px-6 pt-5 pb-3"
                >
                  <h2
                    id={titleId}
                    className="text-base font-semibold text-zinc-900 dark:text-zinc-50"
                  >
                    System Design Modal
                  </h2>
                  <button
                    type="button"
                    onClick={startClose}
                    aria-label="Close"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-200/70 dark:text-zinc-200 dark:hover:bg-white/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </Modal.Header>

                <div className="px-6 py-4">
                  <p id={descId} className="text-sm text-zinc-700 dark:text-zinc-300">
                    This modal demonstrates the header, backdrop, content, and footer API with
                    Apple-style translucent visuals and smooth motion.
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <ul className="list-disc pl-5">
                      <li>Press Escape to close.</li>
                      <li>Click backdrop to close.</li>
                      <li>Focus is trapped within the dialog.</li>
                      <li>Aria labels link title and description.</li>
                    </ul>
                  </div>
                </div>

                <Modal.Footer as="footer" className="px-6 pt-3 pb-5">
                  {footerButtons}
                </Modal.Footer>
              </motion.div>
            )}
          </AnimatePresence>
        </Modal.Content>
      </Modal>
    </div>
  )
}
