'use client'

import { Combobox, ComboboxOptions, ComboboxInput, ComboboxOption } from '@headlessui/react'
import { ChangeEvent, useRef, useState, useCallback, useMemo } from 'react'
import { Search } from 'lucide-react'
import { debounce } from 'lodash'

type Location = {
  id: number
  name: string
  country: string
  continent: string
  type: string
}

const cache = new Map<string, Location[]>()

const AutoComplete = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [isPending, setIsPending] = useState(false)
  const queryRef = useRef<string>('')

  const fetchLocations = async (query: string) => {
    try {
      const response = await fetch(`/api/locations?search=${encodeURIComponent(query)}`)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch locations')
      }
      return data.data || []
    } catch (error) {
      console.error('Error fetching locations:', error)
      return []
    }
  }

  const debouncedFetch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.trim() === '') {
          setLocations([])
          setIsPending(false)
          return
        }

        setIsPending(true)
        try {
          if (cache.has(query)) {
            setLocations(cache.get(query) || [])
            setIsPending(false)
            return
          }
          const results = await fetchLocations(query)
          setLocations((_) => {
            cache.set(query, results)
            return results
          })
        } finally {
          setIsPending(false)
        }
      }, 300),
    []
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value
      queryRef.current = query
      debouncedFetch(query)
    },
    [debouncedFetch]
  )

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
        <div className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Search Locations
        </div>

        <Combobox>
          <div className="relative">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <ComboboxInput
                className="w-full rounded-xl border-0 bg-gray-50 py-3 pr-4 pl-10 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:bg-gray-700 dark:focus:ring-blue-400"
                placeholder="Search for a location..."
                displayValue={(location: string) => location}
                onChange={handleInputChange}
              />
            </div>

            <ComboboxOptions
              anchor="bottom start"
              transition
              className="z-10 mt-2 w-[var(--input-width)] rounded-xl border-0 bg-white p-2 shadow-xl ring-1 ring-black/5 transition duration-100 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-gray-800 dark:ring-white/10"
            >
              {locations.slice(0, 10).map((location) => (
                <ComboboxOption
                  key={location.id}
                  value={`${location.name} ${location.country}, ${location.continent}`}
                  className="group flex cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-100 data-[focus]:bg-blue-50 data-[focus]:text-blue-600 dark:text-white dark:hover:bg-gray-700 dark:data-[focus]:bg-blue-900/20 dark:data-[focus]:text-blue-400"
                >
                  <Search className="mr-3 h-4 w-4 text-gray-400 group-data-[focus]:text-blue-500 dark:group-data-[focus]:text-blue-400" />
                  <span className="truncate">{`${location.name} ${location.country}, ${location.continent}`}</span>
                </ComboboxOption>
              ))}

              {!isPending && locations.length === 0 && queryRef.current !== '' && (
                <div className="px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400">
                  No locations found.
                </div>
              )}
              {isPending && (
                <div className="px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400">
                  Loading...
                </div>
              )}
            </ComboboxOptions>
          </div>
        </Combobox>
      </div>
    </div>
  )
}

export default AutoComplete
