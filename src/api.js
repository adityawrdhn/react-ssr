import Axios from 'axios'

export const fetchCircuits = () => {
    return Axios.get('http://ergast.com/api/f1/2018/circuits.json').then(
        res => res.data.MRData.CircuitTable.Circuits,
    )
}
