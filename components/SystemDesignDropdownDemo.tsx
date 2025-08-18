'use client'

import { useState } from 'react'
import Dropdown from './system_design/SystemDesignDropdown'

const SystemDesignDropdownDemo = () => {
  const [selectedProduct, setSelectedProduct] = useState('Select a product')
  const [isOpen, setIsOpen] = useState(false)
  const [showCode, setShowCode] = useState(false)

  const products = [
    { name: 'MacBook Air', price: '$999', description: 'Supercharged by M2' },
    { name: 'MacBook Pro', price: '$1,299', description: 'Supercharged by M3' },
    { name: 'iMac', price: '$1,299', description: '24-inch, M3 chip' },
    { name: 'Mac Studio', price: '$1,999', description: 'M2 Max or M2 Ultra' },
  ]

  const codeExample = `
<Dropdown open={isOpen} onOpenChange={setIsOpen}>
  <Dropdown.Button className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-left shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:ring-gray-600">
    <span className="font-medium text-gray-900 dark:text-white">{selectedProduct}</span>
    <ChevronDownIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
  </Dropdown.Button>
  
  <Dropdown.Items className="z-10 w-80 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-600">
    {products.map((product) => (
      <Dropdown.Item
        key={product.name}
        onClick={() => setSelectedProduct(product.name)}
        className="block w-full"
      >
        {(active) => (
          <div className={\`px-4 py-3 transition-colors \${
            active ? 'bg-blue-50 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
          }\`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
              </div>
              <p className="font-semibold text-blue-600 dark:text-blue-400">{product.price}</p>
            </div>
          </div>
        )}
      </Dropdown.Item>
    ))}
  </Dropdown.Items>
</Dropdown>`

  return (
    <div className="not-prose overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Controlled Dropdown
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Parent component manages the dropdown state
            </p>
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-700"
          >
            <svg
              className={`h-4 w-4 transition-transform ${showCode ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>
      </div>

      {/* Demo */}
      <div className="p-6 dark:bg-gray-900">
        <div className="flex min-h-[120px] items-center justify-center">
          <div className="w-full max-w-xs">
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Selected:{' '}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {selectedProduct}
              </span>
            </p>

            <Dropdown open={isOpen} onOpenChange={setIsOpen}>
              <Dropdown.Button className="dark:hover:bg-gray-750 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-left shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:ring-gray-600">
                <span className="font-medium text-gray-900 dark:text-white">{selectedProduct}</span>
                <svg
                  className={`h-5 w-5 text-gray-400 transition-transform dark:text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Dropdown.Button>

              <Dropdown.Items className="z-10 w-80 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-600">
                {products.map((product) => (
                  <Dropdown.Item
                    key={product.name}
                    onClick={() => setSelectedProduct(product.name)}
                    className="block w-full"
                  >
                    {(active) => (
                      <div
                        className={`px-4 py-3 transition-all duration-150 ${
                          active
                            ? 'scale-[1.02] border-l-4 border-blue-500 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-900/50'
                            : 'border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p
                              className={`font-medium transition-colors ${
                                active
                                  ? 'text-blue-900 dark:text-blue-100'
                                  : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              {product.name}
                            </p>
                            <p
                              className={`text-sm transition-colors ${
                                active
                                  ? 'text-blue-700 dark:text-blue-200'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
                              {product.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p
                              className={`font-semibold transition-colors ${
                                active
                                  ? 'text-blue-600 dark:text-blue-300'
                                  : 'text-blue-600 dark:text-blue-400'
                              }`}
                            >
                              {product.price}
                            </p>
                            {active && (
                              <svg
                                className="h-4 w-4 animate-pulse text-blue-500 dark:text-blue-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropdown.Item>
                ))}
              </Dropdown.Items>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Code Section with Prism.css */}
      {showCode && (
        <div className="border-t border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3 dark:border-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                React Component
              </span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(codeExample)}
              className="text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Copy
            </button>
          </div>
          <div className="overflow-x-auto">
            <pre className="language-tsx dark:bg-gray-800">
              <code className="language-tsx dark:text-gray-200">{codeExample}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default SystemDesignDropdownDemo
