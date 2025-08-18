'use client'

import { useState } from 'react'
import Dropdown from './system_design/SystemDesignDropdown'

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const SystemDesignUncontrolledDropdownDemo = () => {
  const [showCode, setShowCode] = useState(false)

  const services = [
    { name: 'iCloud', description: 'Sync your data', icon: '☁️' },
    { name: 'App Store', description: 'Download apps', icon: '📱' },
    { name: 'Apple Music', description: 'Stream music', icon: '🎵' },
    { name: 'Apple TV+', description: 'Watch originals', icon: '📺' },
  ]

  const codeExample = `
<Dropdown defaultOpen={false}>
  <Dropdown.Button className="...">
    <span className="...">Choose a Service</span>
    <ChevronDownIcon className="..." />
  </Dropdown.Button>
  
  <Dropdown.Items className="...">
    {services.map((service) => (
      <Dropdown.Item
        key={service.name}
        onClick={() => alert(\`Opening \${service.name}...\`)}
        className="..."
      >
        {/* ... */}
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
              Uncontrolled Dropdown
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dropdown manages its own state internally
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
            <Dropdown defaultOpen={false}>
              <Dropdown.Button className="dark:hover:bg-gray-750 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-left shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:ring-gray-600">
                <span className="font-medium text-gray-900 dark:text-white">Choose a Service</span>
                <ChevronDownIcon className="h-5 w-5 text-gray-400 transition-transform dark:text-gray-500" />
              </Dropdown.Button>

              <Dropdown.Items className="z-10 w-80 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-600">
                {services.map((service) => (
                  <Dropdown.Item
                    key={service.name}
                    onClick={() => alert(`Opening ${service.name}...`)}
                    className="block w-full"
                  >
                    {(active) => (
                      <div
                        className={`px-4 py-3 transition-all duration-150 ${active ? 'scale-[1.02] border-l-4 border-purple-500 bg-purple-50 shadow-sm dark:border-purple-400 dark:bg-purple-900/50' : 'border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                      >
                        <div className="flex items-center">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                            {service.icon}
                          </div>
                          <div>
                            <p
                              className={`font-medium transition-colors ${active ? 'text-purple-900 dark:text-purple-100' : 'text-gray-900 dark:text-white'}`}
                            >
                              {service.name}
                            </p>
                            <p
                              className={`text-sm transition-colors ${active ? 'text-purple-700 dark:text-purple-200' : 'text-gray-500 dark:text-gray-400'}`}
                            >
                              {service.description}
                            </p>
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

export default SystemDesignUncontrolledDropdownDemo
