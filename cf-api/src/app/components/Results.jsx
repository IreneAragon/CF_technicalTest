import { useRouteData } from './RouteData'
import { useAccommodationData } from './AccommodationData'

export function  Results({ formData })   {
    const { resultsDepartureData } = useRouteData(formData)
    const { resultsAccommodationsData, resultsPriceSeat, resultsPriceCabin, calculatePrecio  } = useAccommodationData(formData)  

    return (
        <>
            <section>
                {resultsDepartureData.length > 0 ? (
                    <div>
                        <p>RUTA: {resultsDepartureData.length}</p>
                            {resultsDepartureData.map((item, index) => (
                                <ul key={index}>
                                    <li>Nombre barco: {item.ship}</li>
                                    <li>Nombre naviera: {item.operator}</li>
                                    <li>Hora salida: {item.time}</li>
                                    <li>Hora llegada destino: {item.arrival}</li>
                                    <li>Ciudad Salida: {formData.routeFrom}</li>
                                    <li>Ciudad Llegada: {formData.routeTo}</li>
                                    <li>Fecha: {item.time}</li>
                                </ul>
                            ))}
                    </div>
                ) : (
                    <p>Los datos de los barcos no están disponibles.</p>
                )}
            </section>
            <section>
                {resultsAccommodationsData.length > 0 ? (
                    <div>
                    <p>ACOMODACIONES: {resultsAccommodationsData.length}</p>
                    {resultsAccommodationsData.map((item, index) => (
                        <ul key={index}>
                        <li>Código: {item.code}</li>
                        <li>Nombre: {item.name}</li>
                        <li>
                            Precio: {calculatePrecio(item.code, resultsPriceSeat, resultsPriceCabin)}
                        </li>
                        </ul>
                    ))}
                    </div>
                ) : (
                    <p>Los datos de los barcos no están disponibles.</p>
                )}
            </section>
        </>
    )
}