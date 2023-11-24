export default interface Buscador {
    buscar(): Promise<any>
    buscarPeloID(id: any): Promise<any>
}