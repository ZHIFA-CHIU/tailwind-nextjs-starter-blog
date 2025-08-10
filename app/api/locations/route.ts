import { NextResponse } from 'next/server'
import locations from 'test_data/locations'

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    if (search) {
      const filteredLocations = locations.filter((location) =>
        location.name.toLowerCase().includes(search.toLowerCase())
      )
      return Response.json({
        data: filteredLocations,
      })
    }
    return Response.json({
      data: [],
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      },
      { status: 500 }
    )
  }
}
