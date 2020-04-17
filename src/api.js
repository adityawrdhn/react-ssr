import Axios from 'axios'

export const fetchCircuits = year => {
    return Axios.get(`http://ergast.com/api/f1/${year}/circuits.json`).then(
        res => res.data.MRData.CircuitTable.Circuits,
    )
}
