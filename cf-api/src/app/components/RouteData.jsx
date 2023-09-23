import { useState, useEffect } from 'react'

export function useRouteData(formData) {
  const [resultsDepartureData, setResultsDepartureData] = useState([])

  useEffect(() => {
    const fetchDeparture = async () => {
      try {
        const response = await fetch(`https://tadpole.clickferry.app/departures?route=${formData.routeFrom}${formData.routeTo}&time=${formData.departureDate}`)
        const data = await response.json()
        setResultsDepartureData(data)
      } catch (error) {
        console.error('Error en fetchDeparture en RouteData:', error)
        setResultsDepartureData([])
      }
    }

    if (formData && formData.routeFrom && formData.routeTo && formData.departureDate) {
      fetchDeparture()
    }
  }, [formData])

  return {resultsDepartureData}
}
