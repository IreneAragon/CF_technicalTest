import { useState, useEffect } from 'react'

export function useAccommodationData(formData) {
    const [resultsAccommodationsData, setResultsAccommodationsData] = useState([])
    const [resultsPriceSeat, setResultsPriceSeat] = useState({ total: null })
    const [resultsPriceCabin, setResultsPriceCabin] = useState({ total: null })
    const [resultsPriceCabin4, setResultsPriceCabin4] = useState({ total: null })
    
    const fetchPrice = async (formData, accommodationType, setResult) => {
        try {
            const response = await fetch(`https://tadpole.clickferry.app/price?route=${formData.selectedRoute}&time=${formData.departureDate}T${formData.departureTime}&adults=${formData.adults}&children=${formData.children}&babies=${formData.babies}&accommodation=${accommodationType}`)
            if (response.status === 200 && response.status !== 400) {
                const data = await response.json()
                setResult(data.total)
            } else {
                setResult(null)
            }
        } catch (error) {
            console.error(`Error en fetchPrice para ${accommodationType} en AccommodationData:`, error)
            setResult(null)
        }
    }
      
    useEffect(() => {
        const fetchDepartureAccommodations = async () => {
        try {
            const response = await fetch(`https://tadpole.clickferry.app/accommodations?route=${formData.selectedRoute}&time=${formData.departureDate}T${formData.departureTime}&adults=${formData.adults}&children=${formData.children}&babies=${formData.babies}`)
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
            fetchPrice(formData, 'C4', setResultsPriceCabin4)
        }
    }, [formData])

    const calculatePrecio = (code, resultsPriceSeat, resultsPriceCabin) => {
        let precio = "Precio no disponible"
    
        if (code === "S" && resultsPriceSeat !== null && !isNaN(resultsPriceSeat)) {
            precio = resultsPriceSeat
        } else if (code === "C2" && resultsPriceCabin !== null && !isNaN(resultsPriceCabin)) {
            precio = resultsPriceCabin
        } else if (code === "C4" && resultsPriceCabin4 !== null && !isNaN(resultsPriceCabin4)) {
            precio = resultsPriceCabin4
        } else {
            precio = "Desconocido"
        }
        return precio
    }

    return { resultsAccommodationsData, resultsPriceSeat, resultsPriceCabin, calculatePrecio }
}
