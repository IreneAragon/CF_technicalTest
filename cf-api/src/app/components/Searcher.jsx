'use client'

import styles from './Searcher.module.scss'
import { createContext, useContext, useState, useEffect } from 'react'
import { Results } from './Results'

const SearcherContext = createContext()

export function Searcher() {
    const [departureDate, setDepartureDate] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [babies, setBabies] = useState(0)
    const [showResults, setShowResults] = useState(false)
    const [selectedRoute, setSelectedRoute] = useState('ALGECEUT')
    
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setShowResults(true)
    }

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10)
        setDepartureDate(today)
      }, [])

    const contextData = {
        selectedRoute,
        departureDate,
        departureTime,
        adults,
        children,
        babies
    }

    const totalPassengers = adults + children + babies

    return (
        <>
            <section className={styles.searcher}>
                <form onSubmit={handleFormSubmit} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <div className={styles.rutes}>
                            <label>Ruta</label>
                            <select
                                value={selectedRoute}
                                onChange={(e) => setSelectedRoute(e.target.value)}
                                required
                            >
                                <option value="ALGECEUT">Algeciras - Ceuta</option>
                                <option value="CEUTALGE">Ceuta - Algeciras</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <div className={styles.input}>
                            <label>Fecha de Salida</label>
                            <input
                                className={styles.date}
                                type="date"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.input}>
                            <label>Hora de Salida</label>
                            <select
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                                required
                            >
                                <option value="">Elige</option>
                                <option value="04:00">06:00</option>
                                <option value="05:00">07:00</option>
                                <option value="06:00">08:00</option>
                                <option value="07:00">09:00</option>
                                <option value="08:00">10:00</option>
                                <option value="09:00">11:00</option>
                                <option value="10:00">12:00</option>
                                <option value="11:00">13:00</option>
                                <option value="12:00">14:00</option>
                                <option value="13:00">15:00</option>
                                <option value="14:00">16:00</option>
                                <option value="15:00">17:00</option>
                                <option value="16:00">18:00</option>
                            </select>
                        </div>
                    </div> 
                    <div className={styles.inputContainer}>
                        <div className={styles.input}>
                            <label>Adultos</label>
                            <input
                                type="number"
                                value={adults}
                                onChange={(e) => setAdults(parseInt(e.target.value))}
                                min="1"
                                required
                            />
                        </div>
                        <div className={styles.input}>
                            <label>Niños</label>
                            <input
                                type="number"
                                value={children}
                                onChange={(e) => setChildren(parseInt(e.target.value))}
                                min="0"
                                required
                            />
                        </div>
                        <div className={styles.input}>
                            <label>Bebés</label>
                            <input
                                type="number"
                                value={babies}
                                onChange={(e) => setBabies(parseInt(e.target.value))}
                                min="0"
                                required
                            />
                        </div>
                    </div>
                    <button className={styles.btn} type="submit">Buscar Ferry</button>
                </form>
            </section>
            {showResults && ( 
                <Results formData={{ ...contextData, selectedRoute }} totalPassengers={totalPassengers} /> 
            )}
        </>
    )
}

export function useSearcherContext() {
    return useContext(SearcherContext)
}