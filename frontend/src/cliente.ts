export interface Telefone {
  ddd: string;
  numero: string;
}

export interface Endereco {
  cidade: string;
  estado: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

export interface Cliente {
  id: string;
  nome: string;
  sobreNome: string;
  endereco: Endereco;
  telefones: Telefone[];
}