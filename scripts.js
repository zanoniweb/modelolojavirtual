const produtos = [
    { id: 1, nome: 'Produto A', preco: 50.0, imagem: 'url_produto_a.jpg'},
    { id: 2, nome: 'Produto B', preco: 30.0, imagem: 'url_produto_b.jpg'},
    { id: 3, nome: 'Produto C', preco: 20.0, imagem: 'url_produto_c.jpg'},
    { id: 4, nome: 'Produto D', preco: 15.0, imagem: 'url_produto_c.jpg'},
    { id: 5, nome: 'Produto E', preco: 20.0, imagem: 'url_produto_c.jpg'},
    { id: 6, nome: 'Produto F', preco: 25.0, imagem: 'url_produto_c.jpg'},
    { id: 7, nome: 'Produto G', preco: 30.0, imagem: 'url_produto_c.jpg'},
    { id: 8, nome: 'Produto H', preco: 22.0, imagem: 'url_produto_c.jpg'},
    { id: 9, nome: 'Produto I', preco: 23.0, imagem: 'url_produto_c.jpg'},
    { id: 10, nome: 'Produto J', preco: 21.0, imagem: 'url_produto_c.jpg'},
    { id: 11, nome: 'Produto K', preco: 22.0, imagem: 'url_produto_c.jpg'},
    { id: 12, nome: 'Produto L', preco: 20.0, imagem: 'url_produto_c.jpg'},
    { id: 13, nome: 'Produto M', preco: 20.5, imagem: 'url_produto_c.jpg'},
    { id: 14, nome: 'Produto N', preco: 21.0, imagem: 'url_produto_c.jpg'},
  ];
  
  let carrinho = [];
  let usuarioLogado = null;
  
  document.getElementById('link-historia').addEventListener('click', exibirHistoria);
  document.getElementById('link-cadastro').addEventListener('click', exibirCadastro);
  document.getElementById('link-login').addEventListener('click', exibirLogin);
  document.getElementById('link-loja').addEventListener('click', exibirLoja);

  function exibirHistoria() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
      <h2>Nossa História</h2>
      <p>Bem-vindo à nossa loja! Começamos nossa jornada em [ano de fundação] com o objetivo de [missão ou objetivo]. Desde então, temos nos dedicado a oferecer produtos de qualidade e um atendimento excepcional. Obrigado por fazer parte da nossa história!</p>
    `;
  }
  
  function exibirCadastro() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
      <h2>Cadastro</h2>
      <form id="form-cadastro">
        <label>Usuário:</label>
        <input type="text" id="cadastro-usuario" required>
        <label>Senha:</label>
        <input type="password" id="cadastro-senha" required>
        <button type="submit">Cadastrar</button>
      </form>
    `;
    document.getElementById('form-cadastro').addEventListener('submit', cadastrarUsuario);
  }
  
  function exibirLogin() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
      <h2>Login</h2>
      <form id="form-login">
        <label>Usuário:</label>
        <input type="text" id="login-usuario" required>
        <label>Senha:</label>
        <input type="password" id="login-senha" required>
        <button type="submit">Login</button>
      </form>
    `;
    document.getElementById('form-login').addEventListener('submit', logarUsuario);
  }
  
  function exibirLoja() {
    if (!usuarioLogado) {
      alert('Faça login para acessar a loja.');
      return exibirLogin();
    }
  
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
  <h2>Loja</h2>
  <div id="produtos">
    ${produtos.map(produto => `
      <div class="produto">
        <img src="${produto.imagem}" alt="${produto.descricao}" width="100">
        <p>${produto.nome}</p>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
      </div>
    `).join('')}
  </div>
  <div style="text-align: center; margin-top: 20px;">
    <button onclick="exibirCarrinho()">Ver Carrinho</button>
    <button onclick="exibirLoja()">Loja</button>
  </div>
`;
  }
  
  function exibirCarrinho() {
    const conteudo = document.getElementById('conteudo');
    let total = carrinho.reduce((sum, item) => sum + (item.preco * (item.quantidade || 1)), 0);
  
    conteudo.innerHTML = `
    <h2>Carrinho</h2>
    <table border="1" cellspacing="0" cellpadding="8">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço (R$)</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${carrinho.map((item, index) => `
          <tr>
            <td>${item.nome}</td>
            <td>${item.preco.toFixed(2)}</td>
            <td>${item.quantidade || 1}</td>
            <td>
              <button onclick="alterarQuantidade(${index}, 1)">+</button>
              <button onclick="alterarQuantidade(${index}, -1)">-</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
  
      <h3>Dados de Entrega</h3>
      <label>Nome:</label> <input type="text" id="nome-cliente"><br>
      <label>Rua:</label> <input type="text" id="rua"><br>
      <label>Número:</label> <input type="text" id="numero"><br>
      <label>Bairro:</label> <input type="text" id="bairro"><br>
      <label>Cidade:</label> <input type="text" id="cidade"><br>
      <label>CEP:</label> <input type="text" id="cep"><br>
      <h3>Formas de Pagamento</h3>
      <p>PIX: 000.000.000-00</p>
      <p>Transferência: Banco ?????, Agência ????, Conta ?????-?</p>
      <button onclick="salvarPDF()">Salvar em PDF</button>
      <button onclick="finalizarCompra()">Finalizar Compra</button>
    `;
  }
  
  function cadastrarUsuario(event) {
    event.preventDefault();
    const usuario = document.getElementById('cadastro-usuario').value;
    const senha = document.getElementById('cadastro-senha').value;
    localStorage.setItem(usuario, senha);
    alert('Usuário cadastrado com sucesso!');
  }
  
  function logarUsuario(event) {
    event.preventDefault();
    const usuario = document.getElementById('login-usuario').value;
    const senha = document.getElementById('login-senha').value;
    const senhaSalva = localStorage.getItem(usuario);
  
    if (senha === senhaSalva) {
      alert('Login realizado com sucesso!');
      usuarioLogado = usuario;
      exibirLoja();
    } else {
      alert('Usuário ou senha inválidos!');
    }
  }
  
  function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const itemCarrinho = carrinho.find(p => p.id === produtoId);
    if (itemCarrinho) {
      itemCarrinho.quantidade++;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }
    alert(`${produto.nome} adicionado ao carrinho!`);
  }
  
  
  function alterarQuantidade(index, quantidade) {
    const produto = carrinho[index];
    produto.quantidade = (produto.quantidade || 1) + quantidade;
  
    if (produto.quantidade <= 0) {
      carrinho.splice(index, 1);
    }
    exibirCarrinho();
  }
  
  async function salvarPDF() {
    if (carrinho.length === 0) {
      alert('O carrinho está vazio. Adicione itens antes de salvar.');
      return;
    }
  
    const nomeCliente = document.getElementById('nome-cliente').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const cep = document.getElementById('cep').value.trim();
  
    if (!nomeCliente || !rua || !numero || !bairro || !cidade || !cep) {
      alert('Preencha todos os campos de entrega antes de salvar.');
      return;
    }
  
    // Inicialize o jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Adicione informações do cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${nomeCliente}`, 10, 10);
    doc.text(`Endereço: ${rua}, ${numero}, ${bairro}, ${cidade}, CEP: ${cep}`, 10, 20);
  
    // Adicione itens do carrinho
    doc.text(`Carrinho de Compras:`, 10, 30);
    let y = 40;
    carrinho.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}`, 10, y);
      y += 10;
    });
  
    // Adicione o total
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    doc.text(`Total: R$ ${total.toFixed(2)}`, 10, y + 10);
  
    // Salve o PDF
    doc.save('detalhes_compra.pdf');
  }
  
  function finalizarCompra() {
    alert('Compra finalizada! Obrigado pela sua preferência.');
    carrinho = [];
    exibirLoja();
  }
  