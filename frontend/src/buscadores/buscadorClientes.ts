import { URI } from "../enuns/uri";
import Buscador from "./buscador";

export default class BuscadorClientes implements Buscador {
    public async buscar() {
        let json = await fetch(URI.BUSCAR_CLIENTES).then(resposta => resposta.json())
        return json
    }

    public async buscarPeloID(id: any) {
        return fetch(`${URI.BUSCAR_CLIENTE_PELO_ID}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resposta => resposta.json())
    }
}