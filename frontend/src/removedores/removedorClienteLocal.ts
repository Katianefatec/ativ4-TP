import { Cliente } from '../cliente'; // Importe a interface Cliente

interface RemovedorLocal {
    remover(clientes: Cliente[], id: string): Cliente[];
}

export default class RemovedorClienteLocal implements RemovedorLocal {
    public remover(clientes: Cliente[], id: string): Cliente[] {
      let clientesRestantes = clientes.filter(cliente => cliente.id !== id)
      return clientesRestantes;
    }
}