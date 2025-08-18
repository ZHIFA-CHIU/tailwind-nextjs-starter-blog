import {
  createContext,
  CSSProperties,
  ElementType,
  ReactNode,
  RefObject,
  use,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react'
import { ReferenceType, useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/react'

type DropdownProps = {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  as?: ElementType
  position?: 'top' | 'bottom' | 'left' | 'right'
}

type DropdownContextType = {
  isOpen: boolean
  handleOnOpenChange: (open: boolean) => void
  refs: {
    reference: RefObject<ReferenceType | null>
    floating: RefObject<HTMLElement | null>
    setReference: (node: ReferenceType | null) => void
    setFloating: (node: HTMLElement | null) => void
  }
  floatingStyles: CSSProperties
  activeItem: string
  setActiveItem: (item: string) => void
}

const DropdownContext = createContext<DropdownContextType>(null as unknown as DropdownContextType)

const Dropdown = ({
  children,
  as: Component = 'div',
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  position = 'bottom',
}: DropdownProps) => {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [activeItem, setActiveItem] = useState('')
  const { refs, floatingStyles } = useFloating({
    placement: position,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8), // Add 8px gap between button and dropdown
      flip(), // Flip to opposite side if no space
      shift({ padding: 8 }), // Shift to stay in viewport
    ],
  })

  const isOpen = isControlled ? open : internalOpen

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      if (isControlled && onOpenChange) {
        onOpenChange(open)
      } else {
        setInternalOpen(open)
      }
    },
    [isControlled, onOpenChange]
  )

  useEffect(() => {
    if (isOpen !== internalOpen) {
      setInternalOpen(isOpen)
    }
  }, [isOpen, internalOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refs.domReference.current && !refs.floating.current?.contains(event.target as Node)) {
        handleOnOpenChange(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refs, handleOnOpenChange])

  return (
    <DropdownContext.Provider
      value={{
        activeItem,
        setActiveItem,
        isOpen,
        handleOnOpenChange,
        refs,
        floatingStyles,
      }}
    >
      <Component className={className}>{children}</Component>
    </DropdownContext.Provider>
  )
}

type DropdownButtonProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  onClick?: () => void
}

const DropdownButton = ({
  children,
  as: Component = 'button',
  className,
  onClick,
}: DropdownButtonProps) => {
  const { isOpen, handleOnOpenChange, refs } = use(DropdownContext)

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    handleOnOpenChange(!isOpen)
  }

  return (
    <Component
      role="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      className={className}
      onClick={handleClick}
      ref={refs.setReference}
    >
      {children}
    </Component>
  )
}

type DropdownItemsProps = {
  children: ReactNode
  className?: string
  as?: ElementType
}

const DropdownItems = ({ children, as: Component = 'ul', className }: DropdownItemsProps) => {
  const { isOpen, refs, floatingStyles } = use(DropdownContext)

  if (!isOpen) return null

  return (
    <Component
      role="menu"
      ref={refs.setFloating}
      style={{
        position: 'absolute',
        ...floatingStyles,
      }}
      className={className}
    >
      {children}
    </Component>
  )
}

type DropdownItemProps = {
  children: ReactNode | ((active?: boolean) => ReactNode)
  className?: string
  onClick?: () => void
  as?: ElementType
}

const DropdownItem = ({
  children,
  className,
  onClick,
  as: Component = 'li',
}: DropdownItemProps) => {
  const id = useId()
  const { setActiveItem, handleOnOpenChange, activeItem } = use(DropdownContext)

  const handleClick = () => {
    if (onClick) {
      onClick()
    }

    handleOnOpenChange(false)
  }

  const onMouseEnter = () => {
    setActiveItem(id)
  }

  const onMouseLeave = () => {
    setActiveItem('')
  }

  return (
    <Component
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      id={id}
      className={className}
      onClick={handleClick}
      role="menuitem"
    >
      {children instanceof Function ? children(activeItem === id) : children}
    </Component>
  )
}

Dropdown.Button = DropdownButton
Dropdown.Items = DropdownItems
Dropdown.Item = DropdownItem

export default Dropdown
