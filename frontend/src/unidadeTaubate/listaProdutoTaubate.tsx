import React, { useState, useEffect  } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../estilos/styles.module.css';
import { Link } from 'react-router-dom';


type Produto = {
    nome: string;
    preco: number;
}

function ListaProdutoTaubate() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoModal, setProdutoModal] = useState<Produto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filtroProduto, setFiltroProduto] = useState('');

  useEffect(() => {
      let produtosIniciais: Produto[] = [
        { nome: "Shampoo", preco: 100 },
        { nome: "Condicionador", preco: 110 },
        { nome: "Óleo secante", preco: 12 },
        { nome: "Esmalte", preco: 10 },
        { nome: "Máscara capilar", preco: 140 },
        { nome: "Máscara facial", preco: 150 },
        { nome: "Secador de cabelo", preco: 160 },
        { nome: "Algodão", preco: 10 },
        { nome: "Lixa", preco: 5 },
        { nome: "Alicate", preco: 20 },
        { nome: "Pente", preco: 15 },
        { nome: "Escova de cabelo", preco: 30 },
        { nome: "Creme de pentear", preco: 50 },
        { nome: "Gel", preco: 20 },
        { nome: "Pomada", preco: 25 },
        { nome: "Cera", preco: 30 },
        { nome: "Spray", preco: 40 },
        { nome: "Mousse", preco: 45 },
        { nome: "Gloss", preco: 30 },
        { nome: "Batom", preco: 50 },
        { nome: "Base", preco: 60 }
        ];

        produtosIniciais = produtosIniciais.sort((a, b) => a.nome.localeCompare(b.nome));
        setProdutos(produtosIniciais);
    }, []);

  const handleEditarClick = (produto: Produto) => {
      setProdutoModal(produto);
      setShowModal(true);
  };
  
  const handleSalvarClick = () => {
    setShowModal(false);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (produtoModal) {
        setProdutoModal({ ...produtoModal, nome: event.target.value });
    }
};

const handlePrecoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (produtoModal) {
      const valor = parseFloat(event.target.value.replace(/\D/g,'')) / 100;
      setProdutoModal({ ...produtoModal, preco: valor });
  }
};

const handleCloseModal = () => {
    setShowModal(false);
};

const handleExcluirClick = (produto: Produto) => {
    setProdutos(produtos.filter(p => p !== produto));
};

const handleFiltroProdutoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroProduto(event.target.value);
};

const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(filtroProduto.toLowerCase()));

  return (
          <>
            <div className={styles['container-lista']}>
              <div className={styles['wrap-lista']}>
                <div className={styles['titulo-tabela']}>
                  <h1>Lista de Produtos</h1>
                </div>
                <div className={styles['titulo-tabela2']}>                           
                <input type="text" value={filtroProduto} onChange={handleFiltroProdutoChange} placeholder="Buscar por produto" />
                    <Link to="/cadastroTaubate">
                        <button>Cadastrar </button>
                    </Link>
                </div>
                <div className={styles['table-responsive']}>
                  <Table striped hover>
                    <thead>
                      <tr className={styles['coluna-left']}>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Alterar</th>
                        <th>Excluir</th>
                      </tr>
                    </thead>
                    <tbody>
                    {produtosFiltrados.map((produto, index) => (
                        <tr className={styles['coluna-left']} key={index} >
                          <td>{produto.nome}</td>
                          <td>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                          <td><button onClick={() => handleEditarClick(produto)}>Editar</button></td>
                          <td><button onClick={() => handleExcluirClick(produto)}>Excluir</button></td>
                        </tr>
                    ))}
                    </tbody>
                  </Table>
                </div>
              </div>
                    
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                  <div className="form-group">
                      <label htmlFor="produtoNome">Produto</label>
                      <input type="text" className="form-control" id="produtoNome" value={produtoModal?.nome} onChange={handleNomeChange} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="produtoPreco">Preço</label>
                      <input type="text" className="form-control" id="produtoPreco" 
                        value={produtoModal?.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                        onChange={handlePrecoChange} />
                  </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSalvarClick}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>                    
            </>
        );
    };

export default ListaProdutoTaubate;
