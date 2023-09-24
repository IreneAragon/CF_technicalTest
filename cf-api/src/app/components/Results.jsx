import styles from './Results.module.scss'
import { useRouteData } from './RouteData'
import { useAccommodationData } from './AccommodationData'

export function Results({ formData, totalPassengers }) {
    const { resultsDepartureData } = useRouteData(formData)
    const { resultsAccommodationsData, resultsPriceSeat, resultsPriceCabin, calculatePrecio } = useAccommodationData(formData)
  
    return (
      <>
        <section className={styles.resultsContainer}>
            {resultsDepartureData.length > 0 ? (
                <>
                    {resultsDepartureData.map((item, index) => {
                        const departureDate = new Date(item.time)
                        const horaSalida = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        
                        const arrivalDate = new Date(item.arrival)
                        const durationMinutes = Math.floor((arrivalDate - departureDate) / (60 * 1000))
                        
                        const hours = Math.floor(durationMinutes / 60)
                        const minutes = durationMinutes % 60
                        
                        const horaLlegada = new Date(departureDate.getTime() + durationMinutes * 60 * 1000)
                            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        
                        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
                        const fechaSalida = departureDate.toLocaleDateString('es-ES', options)

                        return (
                            <div key={index} className={styles.resultCard}>
                                <div className={styles.resultHeaderCard}>
                                    {index === 0 && <p>Más barato</p>}
                                </div>
                                <div className={styles.resultHeaderCard}>
                                    {index === 1 && <p>Otra Opción</p>}
                                </div>
                                <div className={styles.resultShipInfo}>
                                    <p>{item.ship}</p>
                                    <p>{item.operator}</p>
                                </div>
                                <div className={styles.resultRouteContainer}>
                                    <div>
                                        <p>Algeciras</p>
                                        <p className={styles.resultRouteInfoTime}>{horaSalida}</p>
                                        <p>{fechaSalida}</p>
                                    </div>
                                    <div className={styles.resultTimeToArrive}>
                                        <p>{`${hours}h ${minutes}m`}</p>
                                        <p>--&gt;</p>
                                    </div>
                                    <div>
                                        <p>Ceuta</p>
                                        <p className={styles.resultRouteInfoTime}>{horaLlegada}</p>
                                        <p>{fechaSalida}</p>
                                    </div>
                                </div>
                                <section className={styles.resultsAccommodationContainer}>
                                    {resultsAccommodationsData.length > 0 ? (
                                        <>
                                            {index === 1 && <p>Otra Opción</p>}
                                            <label>
                                                Opciones disponibles para {totalPassengers}{' '}
                                                {totalPassengers > 1 ? 'pasajeros' : 'pasajero'}
                                            </label>
                                            <select className={styles.selectAccommodation}>
                                                {resultsAccommodationsData.map((accommodation, accIndex) => (
                                                    <option key={accIndex} value={accommodation.code}>
                                                        {accommodation.name} -{' '}
                                                        {calculatePrecio(accommodation.code, resultsPriceSeat, resultsPriceCabin)}€
                                                    </option>
                                                ))}
                                            </select>
                                            <button className={styles.btnRoute} type="submit">Seleccionar</button>
                                        </>
                                    ) : (
                                        <p>No hay disponibilidad para {totalPassengers} pasajeros.</p>
                                    )}
                                </section>
                            </div>
                        )
                    })}
                </>
            ) : (
                <p>Los datos de los ferris no están disponibles.</p>
            )}
        </section>
      </>
    )
}



