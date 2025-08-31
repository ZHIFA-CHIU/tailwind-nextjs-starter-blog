'use client'

import { FocusTrap } from 'focus-trap-react'
import {
  createContext,
  ElementType,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  open: boolean
  onClose: () => void
  'aria-labelledby'?: string
  'aria-label'?: string
  'aria-describedby'?: string
}

type ModalContextType = {
  open: boolean
  onClose: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

const useModalContext = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('Modal components must be used within a Modal')
  }

  return context
}

const Modal = ({
  children,
  as,
  className,
  onClose,
  open,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const Component = as || 'div'

  const onEscClickHanlder = useCallback(
    (e: KeyboardEvent) => {
      if (open && e.key === 'Escape') {
        onClose()
      }
    },
    [onClose, open]
  )

  const onClickOutsideHandler = useCallback(
    (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', onEscClickHanlder)

    return () => document.removeEventListener('keydown', onEscClickHanlder)
  }, [onEscClickHanlder])

  useEffect(() => {
    const originalStyle = document.body.style.overflow

    if (open) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [open])

  // Close the modal when clicking outside of it
  useEffect(() => {
    if (!open) return

    document.addEventListener('mousedown', onClickOutsideHandler)
    document.addEventListener('touchstart', onClickOutsideHandler)

    return () => {
      document.removeEventListener('mousedown', onClickOutsideHandler)
      document.removeEventListener('touchstart', onClickOutsideHandler)
    }
  }, [open, onClickOutsideHandler])

  const isBrowser = typeof window !== 'undefined'

  if (!isBrowser || !open) return null

  return (
    <ModalContext.Provider value={{ open, onClose }}>
      {createPortal(
        <FocusTrap>
          <Component
            ref={ref}
            className={className}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
          >
            {children}
          </Component>
        </FocusTrap>,
        document.body
      )}
    </ModalContext.Provider>
  )
}

type ModalHeader = {
  children: ReactNode
  as?: ElementType
  className?: string
}

const ModalHeader = ({ children, as, className }: ModalHeader) => {
  const Component = as || 'div'

  const onClick = useCallback((e: ReactMouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <Component className={className} onClick={onClick}>
      {children}
    </Component>
  )
}

type ModalBackdrop = {
  as?: ElementType
  className?: string
}

const ModalBackdrop = ({ as, className }: ModalBackdrop) => {
  const { onClose } = useModalContext()
  const Component = as || 'div'

  return <Component className={className} onClick={onClose} />
}

type ModalContent = ModalHeader

const ModalContent = ({ as, children, className }: ModalContent) => {
  const Component = as || 'div'

  const onClick = useCallback((e: ReactMouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <Component className={className} onClick={onClick}>
      {children}
    </Component>
  )
}

type ModalFooter = ModalHeader

const ModalFooter = ({ children, as, className }: ModalFooter) => {
  const Component = as || 'div'

  const onClick = useCallback((e: ReactMouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <Component className={className} onClick={onClick}>
      {children}
    </Component>
  )
}

Modal.Header = ModalHeader
Modal.Backdrop = ModalBackdrop
Modal.Content = ModalContent
Modal.Footer = ModalFooter

export default Modal
