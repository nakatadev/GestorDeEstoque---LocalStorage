criarProdutoTabela();

// EventListener para o botão de cadastro
document.getElementById('botao__cadastrar').addEventListener('click', () => {
    cadastrarProduto();
    limparCampos();
});

// Função para obter produtos do localStorage com correção de bugs
function obterProdutosDoLocalStorage() {
    let produtos = [];
    try {
        const produtosStorage = localStorage.getItem('produtos');
        // Verifica se o valor retornado é nulo ou indefinido
        if (produtosStorage) {
            produtos = JSON.parse(produtosStorage);
        } else {
            // Se não houver produtos no localStorage, retorna um array vazio
            produtos = [];
        }
    } catch (error) {
        console.error("Erro ao fazer o parse dos produtos:", error);
        produtos = []; // Em caso de erro no parse, inicializa a lista como um array vazio
    }
    return produtos;
}

// Cria uma nova linha na tabela para um produto
function criarProdutoTabela() {
    let produtos = obterProdutosDoLocalStorage();
    let tabelaProdutos = document.querySelector('#tabelaProdutos');
    
    // Limpa a tabela antes de renderizar
    tabelaProdutos.innerHTML = "";

    if (produtos.length > 0) {
        produtos.forEach((produto) => {
            const novaLinha = tabelaProdutos.insertRow();
            const novaCelula1 = novaLinha.insertCell(0);
            const novaCelula2 = novaLinha.insertCell(1);
            const novaCelula3 = novaLinha.insertCell(2);
            const novaCelula4 = novaLinha.insertCell(3);

            novaCelula1.textContent = produto.nomeProduto;
            novaCelula2.textContent = produto.tipoProduto;
            novaCelula3.textContent = produto.quantidade;

            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "Remover";
            botaoRemover.addEventListener("click", () => {
                removerProduto(produto.ID);
            });
            novaCelula4.appendChild(botaoRemover);
        });
    } else {
        tabelaProdutos.innerHTML = `O estoque está vazio!`;
    }
}

// Cadastra um novo produto e o adiciona à tabela
function cadastrarProduto() {
    let produtos = obterProdutosDoLocalStorage();
    let ID = produtos.length + 1;
    let nomeProduto = document.getElementById('nomeProduto').value;
    let tipoProduto = document.getElementById('tipoProduto').value;
    let quantidade = parseInt(document.getElementById('quantidadeProduto').value);

    // Verifica se os campos foram preenchidos corretamente
    if (nomeProduto && tipoProduto && !isNaN(quantidade)) {
        let produto = {
            ID: ID,
            nomeProduto: nomeProduto,
            tipoProduto: tipoProduto,
            quantidade: quantidade
        };
        
        produtos.push(produto); // Adiciona o novo produto à lista
        atualizarEstoque(produtos); // Atualiza o localStorage com a nova lista de produtos
        alert("Produto cadastrado com sucesso.");
        criarProdutoTabela(); // Recarrega a tabela com os produtos atualizados
    } else {
        alert("Preencha todos os campos corretamente!");
    }
}

// Atualiza o armazenamento local com a lista de produtos
function atualizarEstoque(produtos) {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Limpa os campos do formulário
function limparCampos() {
    document.getElementById('nomeProduto').value = '';
    document.getElementById('tipoProduto').value = '';
    document.getElementById('quantidadeProduto').value = ''; 
}

// Remove um produto da lista e atualiza a tabela
function removerProduto(id) {
    let produtos = obterProdutosDoLocalStorage();
    produtos = produtos.filter(produto => produto.ID !== id);
    atualizarEstoque(produtos); // Atualiza o localStorage
    criarProdutoTabela(); // Recarrega a tabela com os produtos atualizados
}


// Função para buscar um produto no armazenamento local
function buscarProduto() {
    let pesquisa = document.getElementById('produto__buscado').value.toLowerCase(); // Converter para minúsculo para busca case-insensitive
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let tabelaProdutos2 = document.querySelector('.tabela__buscas tbody'); // Seleciona o corpo da tabela

    // Limpa a tabela de resultados antes de adicionar novos resultados
    tabelaProdutos2.innerHTML = "";

    if (produtos.length > 0) {
        let produtoEncontrado = produtos.find(produto => produto.nomeProduto.toLowerCase() === pesquisa); // Busca o produto

        if (produtoEncontrado) {
            const novaLinha = tabelaProdutos2.insertRow();
            const novaCelula1 = novaLinha.insertCell(0);
            const novaCelula2 = novaLinha.insertCell(1);
            const novaCelula3 = novaLinha.insertCell(2);

            novaCelula1.textContent = produtoEncontrado.nomeProduto;
            novaCelula2.textContent = produtoEncontrado.tipoProduto;
            novaCelula3.textContent = produtoEncontrado.quantidade;
        } else {
            tabelaProdutos2.innerHTML = `Produto não encontrado!`;
        }
    } else {
        tabelaProdutos2.innerHTML = `O estoque está vazio!`;
    }
}
