import { URI } from "../enuns/uri";
import Cadastrador from "./cadastrador";

class CadastradorCliente implements Cadastrador {
    async cadastrar(objeto: Object): Promise<void> {
        try {
            const response = await fetch(URI.CADASTRAR_CLIENTE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objeto)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }
}
export default CadastradorCliente