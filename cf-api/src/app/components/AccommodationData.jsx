import { useState, useEffect } from 'react'

export function useAccommodationData(formData) {
    const [resultsAccommodationsData, setResultsAccommodationsData] = useState([])
    const [resultsPriceSeat, setResultsPriceSeat] = useState({ total: null })
    const [resultsPriceCabin, setResultsPriceCabin] = useState({ total: null })
    
    const fetchPrice = async (formData, accommodationType, setResult) => {
        try {
          const response = await fetch(`https://tadpole.clickferry.app/price?route=${formData.routeFrom}${formData.routeTo}&time=${formData.departureDate}T${formData.departureTime}&adults=${formData.adults}&children=${formData.children}&babies=${formData.babies}&accommodation=${accommodationType}`)
          const data = await response.json()
          setResult(data.total)
        } catch (error) {
          console.error(`Error en fetchPrice para ${accommodationType} en AccommodationData:`, error)
          setResult(null)
        }
      }
      
    useEffect(() => {
        const fetchDepartureAccommodations = async () => {
        try {
            const response = await fetch(`https://tadpole.clickferry.app/accommodations?route=${formData.routeFrom}${formData.routeTo}&time=${formData.departureDate}T${formData.departureTime}&adults=${formData.adults}&children=${formData.children}&babies=${formData.babies}`)
            const data = await response.json()
            setResultsAccommodationsData(data)
        } catch (error) {
            console.error('Error en fetchDepartureAccommodations en AccommodationData:', error)
            setResultsAccommodationsData([])
        }
    }

    if (formData) {
        fetchDepartureAccommodations()
    }
  }, [formData])

    useEffect(() => {
        if (formData) {
        fetchPrice(formData, 'S', setResultsPriceSeat)
        fetchPrice(formData, 'C2', setResultsPriceCabin)
        }
    }, [formData])

    const calculatePrecio = (code, resultsPriceSeat, resultsPriceCabin) => {
        let precio = "Precio no disponible"
    
        if (code === "S" && resultsPriceSeat !== null && !isNaN(resultsPriceSeat)) {
            precio = resultsPriceSeat
        } else if (code === "C2" && resultsPriceCabin !== null && !isNaN(resultsPriceCabin)) {
            precio = resultsPriceCabin
        } else {
            precio = "Desconocido"
        }
        return precio
    }

    return { resultsAccommodationsData, resultsPriceSeat, resultsPriceCabin, calculatePrecio }
}
