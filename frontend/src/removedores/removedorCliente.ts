import { Cliente } from '../cliente'; // Importe a interface Cliente
import { URI } from "../enuns/uri";
import RemovedorRemoto from "./removedorRemoto";

export default class RemovedorCliente implements RemovedorRemoto {
    public remover(cliente: Cliente): Promise<Response> {
      let json = { id: cliente.id }
  
      return fetch(URI.DELETAR_CLIENTE, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      });
    }
}