'use client'

import styles from './Searcher.module.scss'
import { createContext, useContext, useState } from 'react'
import { Results } from './Results'

const SearcherContext = createContext()

export function Searcher() {
    const [routeFrom, setRouteFrom] = useState('ALGE')
    const [routeTo, setRouteTo] = useState('CEUT')
    const [departureDate, setDepartureDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [departureTime, setDepartureTime] = useState('04:00')
    const [returnTime, setReturnTime] = useState('07:00')
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [babies, setBabies] = useState(0)
    const [showResults, setShowResults] = useState(false)
    
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setShowResults(true)
    }

    const contextData = {
        routeFrom,
        routeTo,
        departureDate,
        returnDate,
        departureTime,
        returnTime,
        adults,
        children,
        babies
    }

    return (
        <SearcherContext.Provider value={contextData}>
            <section className={styles.form}>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Ruta - Desde:</label>
                        <input
                            type="text"
                            value={routeFrom}
                            onChange={(e) => setRouteFrom(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Ruta - Hasta:</label>
                        <input
                            type="text"
                            value={routeTo}
                            onChange={(e) => setRouteTo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Fecha de Salida:</label>
                        <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Hora de Salida:</label>
                        <input
                            type="text"
                            value={departureTime}
                            onChange={(e) => setDepartureTime(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Fecha de Vuelta:</label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Hora de Vuelta:</label>
                        <input
                            type="text"
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Adultos:</label>
                        <input
                            type="number"
                            value={adults}
                            onChange={(e) => setAdults(parseInt(e.target.value))}
                            min="1"
                            required
                        />
                    </div>
                    <div>
                        <label>Niños:</label>
                        <input
                            type="number"
                            value={children}
                            onChange={(e) => setChildren(parseInt(e.target.value))}
                            min="0"
                            required
                        />
                    </div>
                    <div>
                        <label>Bebés:</label>
                        <input
                            type="number"
                            value={babies}
                            onChange={(e) => setBabies(parseInt(e.target.value))}
                            min="0"
                            required
                        />
                    </div>
                    <button type="submit">Buscar</button>
                </form>
            </section>
            {showResults && ( 
                <>
                    <section>
                        <p>Desde {routeFrom}</p>
                        <p>Hasta {routeTo}</p>
                        <p>Fecha salida:  {departureDate}</p>
                        <p>Fecha llegada:  {returnDate}</p>
                        <p>Adultos:  {adults}</p>
                        <p>Niños:  {children}</p>
                        <p>Bebés:  {babies}</p>
                    </section>
                    <section>
                        <Results
                            formData={{
                                routeFrom,
                                routeTo,
                                departureDate,
                                returnDate,
                                adults,
                                children,
                                babies,
                                departureTime,
                                returnTime
                            }}
                            // departureAccommodationData={{
                            //     routeFrom,
                            //     routeTo,
                            //     departureDate,
                            //     adults,
                            //     children,
                            //     babies,
                            //     departureTime,
                            //     returnTime
                            // }}
                            // returnData={{
                            //     routeFrom,
                            //     routeTo,
                            //     departureDate,
                            //     returnDate,
                            //     adults,
                            //     children,
                            //     babies,
                            //     departureTime,
                            //     returnTime
                            // }}
                        />
                    </section>
                </>
            )}
        </SearcherContext.Provider>
    )
}

export function useSearcherContext() {
    return useContext(SearcherContext)
}