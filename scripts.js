//COMEÇO DA CODIFICAÇÃO DA RELAÇÃO DE PRODUTOS


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

//FINAL DA CODIFICAÇÃO DA RELAÇÃO DE PRODUTOS

//COMEÇO DA CODIFICAÇÃO DO RELACIONAMENTO DE PÁGINAS
  
  document.getElementById('link-historia').addEventListener('click', exibirHistoria);
  document.getElementById('link-cadastro').addEventListener('click', exibirCadastro);
  document.getElementById('link-login').addEventListener('click', exibirLogin);
  document.getElementById('link-loja').addEventListener('click', exibirLoja);
 
//FINAL DA CODIFICAÇÃO DO RELACIONAMENTO DE PÁGINAS

  function exibirHistoria() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
      <h2>Nossa História</h2>
      <p>Bem-vindo à nossa loja! Começamos nossa jornada em [ano de fundação] com o objetivo de [missão ou objetivo]. Desde então, temos nos dedicado a oferecer produtos de qualidade e um atendimento excepcional. Obrigado por fazer parte da nossa história!</p>
    `;
  }
  
//COMEÇO DA CODIFICAÇÃO DO CADASTRO DE USUÁRIO

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

   function cadastrarUsuario(event) {
    event.preventDefault();
    const usuario = document.getElementById('cadastro-usuario').value;
    const senha = document.getElementById('cadastro-senha').value;
    localStorage.setItem(usuario, senha);
    alert('Usuário cadastrado com sucesso!');
  }

//FINAL DA CODIFICAÇÃO DO CADASTRO DE USUÁRIO

//COMEÇO DA CODIFICAÇÃO DO LOGAMENTO DO USUÁRIO

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

  //FINAL DA CODIFICAÇÃO DO LOGAMENTO DO USUÁRIO
  
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
      <label><b>Nome:</b></label> <input type="text" id="nome-cliente"><br>
      <label><b>Rua:</b></label> <input type="text" id="rua"><br>
      <label><b>Número:</b></label> <input type="text" id="numero"><br>
      <label><b>Bairro:</b></label> <input type="text" id="bairro"><br>
      <label><b>Cidade:</b></label> <input type="text" id="cidade"><br>
      <label><b>CEP:</b></label> <input type="text" id="cep"><br>
      <h3>Formas de Pagamento</h3>
<div>
  <label for="pix">
    <input type="checkbox" id="pix" name="payment-method" value="pix">
    <p><b>PIX:</b> 000.000.000-00</p>
  </label>
  
  <label for="transfer">
    <input type="checkbox" id="transfer" name="payment-method" value="transfer">
    <p><b>Transferência: </b> Banco ?????, Agência ????, Conta ?????-?</p>
  </label>
</div>
      <button onclick="print()">Imprimir</button>
      <button onclick="salvarPDF()">Salvar em PDF</button>
      <button onclick="finalizarCompra()">Finalizar Compra</button>
       <p id="selected-method"></p>
    `;
  }
  
 
//COMEÇO DA CODIFICAÇÃO DO CARRINHO
  
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

  //FINAL DA CODIFICAÇÃO DO CARRINHO

  // INICIAL DA FORMA DE PAGAMENTO ESCOLHIDA 
  function getSelectedMethod() {
    const pixCheckbox = document.getElementById('pix');
    const transferCheckbox = document.getElementById('transfer');

    if (pixCheckbox.checked && transferCheckbox.checked) {
        return "PIX e Transferência";
    } else if (pixCheckbox.checked) {
        return "PIX";
    } else if (transferCheckbox.checked) {
        return "Transferência";
    } else {
        return "Nenhuma forma de pagamento selecionada";
    }
}

  // FINAL DA FORMA DE PAGAMENTO ESCOLHIDA

  //INICIAL DO CÓDIGO PARA FINALIZAR A COMPRA

  function finalizarCompra() {
    alert('Compra finalizada! Obrigado pela sua preferência.');
    carrinho = [];
    exibirLoja();
  }

  //FINALIZAÇÃO DO CÓDIGO PARA FINALIZAR A COMPRA


//COMEÇO DA CODIFICAÇÃO DA SALVA DO CARRINHO
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

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Informações do cliente
  doc.setFontSize(12);
  doc.text(`Cliente: ${nomeCliente}`, 10, 10);
  doc.text(`Endereço: ${rua}, ${numero}, ${bairro}, ${cidade}, CEP: ${cep}`, 10, 20);

  // Itens do carrinho
  doc.text(`Carrinho de Compras:`, 10, 30);
  let y = 40;
  carrinho.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}`, 10, y);
      y += 10;
  });

  // Total
  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
  doc.text(`Total: R$ ${total.toFixed(2)}`, 10, y + 10);

  // Forma de pagamento
  const formaPagamento = getSelectedMethod();
  doc.text(`Forma de Pagamento: ${formaPagamento}`, 10, y + 20);

  // Salvar PDF
  doc.save(`pedido_${nomeCliente}.pdf`);
}

//FINAL DA CODIFICAÇÃO DA SALVA DO CARRINHO

//COMEÇO DA CODIFICAÇÃO DAS FUNÇÕES DO CHAT
const questionsAndAnswers = [
  { question: "Qual é o horário de funcionamento?", answer: "Nosso horário é das 8:30h às 11:30 e das 13:00 até as 18:00h, de segunda a sexta-feira." },
  { question: "Vocês abrem aos finais de semana?", answer: "Sim, estamos abertos aos sábados das 9h às 12h." },
  { question: "Como posso entrar em contato?", answer: "Você pode entrar em contato pelo telefone (43) 9999-44331 (Wats)." },
  { question: "Vocês oferecem entrega?", answer: "Sim, temos opções de entrega para sua comodidade." },
  { question: "Qual é o endereço da loja?", answer: "Atualmente não temos loja física apenas um ambiente de produção dos produtos artesanais." },
  { question: "Vocês possuem estacionamento?", answer: "Não, temos estacionamento nesse momento." },
  { question: "Quais são as formas de pagamento aceitas?", answer: "Aceitamos PIX ou transferência bancária." },
  { question: "Vocês oferecem descontos?", answer: "Sim, confira nossas promoções no site ou na loja quando forem divulgadas." },
  { question: "Vocês emitem nota fiscal?", answer: "Sim, emitimos nota fiscal." },
  { question: "Há garantia nos produtos?", answer: "Sim, oferecemos garantia conforme o fabricante." },
  { question: "Vocês têm produtos em promoção?", answer: "Sim, temos uma seção de promoções no site e na loja." },
  { question: "Vocês aceitam encomendas especiais?", answer: "Sim, trabalhamos com encomendas personalizadas." },
  { question: "Há atendimento online?", answer: "Sim, oferecemos suporte online via e-mail. lojapipocasdavalquria@gamil.com" },
  { question: "Qual é o prazo de entrega?", answer: "Como realizamos entregas na região de Londrina/Pr e em cidades de sua região metropolitana que são Cambé e Ibiporã a entrega pode ser agendada para o dia e o horário que o cliente combinar para sua festa." },
  { question: "Vocês fazem atendimentos diretamente nos eventos?", answer: "Sim, temos uma equipe especializada para atuar dentro de eventos." },
  { question: "Posso reservar produtos?", answer: "Sim, reservas podem ser feitas pelo nosso Wats (43) 9999-44331 ou pelo nosso e-mail comercercial lojapipocasdavalquria@gamil.com." },
  { question: "Vocês trabalham com produtos em estoque?", answer: "Não, produzimos de forma artesansal especificamente para sua demanda e de fuma forma persoanlizada." },
  { question: "Vocês têm atendimento para empresas?", answer: "Sim, já prestamos serviços para empresas em eventos." },
  { question: "Há algum programa de fidelidade?", answer: "Sim, para os nossos clientes fidelizados temos vantagens." },
  { question: "Posso cancelar um pedido?", answer: "Sim, mas existe um prazo de 24 horas para que isso seja realizado antes que a produção artesanal de sua encomenda comece a ser produzida." },
];

document.getElementById('start-chat-btn').addEventListener('click', function () {
  document.getElementById('chat-box').classList.remove('hidden');
  document.getElementById('chat-box').style.display = 'flex'; // Mostra o chat-box
  document.getElementById('start-chat-btn').classList.add('hidden'); // Esconde o botão
  document.getElementById('welcome-message').classList.remove('hidden');
  loadQuestions();
});

document.getElementById('close-chat-btn').addEventListener('click', function () {
  document.getElementById('chat-box').classList.add('hidden');
  document.getElementById('chat-box').style.display = 'none'; // Esconde o chat-box
  document.getElementById('start-chat-btn').classList.remove('hidden'); // Mostra o botão
  document.getElementById('welcome-message').classList.add('hidden');
  document.getElementById('question-list').classList.add('hidden');
  document.getElementById('response').classList.add('hidden');
});

function loadQuestions() {
  const questionList = document.getElementById('question-list');
  questionList.innerHTML = ''; // Limpa perguntas existentes
  questionsAndAnswers.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${item.question}`;
    listItem.addEventListener('click', () => showResponse(item.answer));
    questionList.appendChild(listItem);
  });
  questionList.classList.remove('hidden');
}

  function showResponse(answer) {
    const response = document.getElementById('response');
    response.textContent = answer;
    response.classList.remove('hidden');
  
    // Realiza a rolagem para a resposta
    response.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
//FINAL DA CODIFICAÇÃO DAS FUNÇÕES DO CHAT

//COMEÇO DA CODIFICAÇÃO DO POSISIONAMENTO DO BOTÃO INICAR CHAT PARA POSICIONAR ANTES DO FOOTER

document.addEventListener("DOMContentLoaded", function () {
  const startChatBtn = document.getElementById('start-chat-btn');
  const footer = document.querySelector('footer'); // Seleciona o footer da página

  function adjustChatButtonPosition() {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Verifica se o footer está visível na viewport
    if (footerRect.top < windowHeight) {
      // Reposiciona o botão acima do footer
      const overlapHeight = windowHeight - footerRect.top;
      startChatBtn.style.bottom = `${overlapHeight + 20}px`; // Ajuste com 20px de margem
    } else {
      // Mantém a posição fixa
      startChatBtn.style.bottom = '20px';
    }
  }

  // Chama a função inicialmente e ao redimensionar/rolar a página
  adjustChatButtonPosition();
  window.addEventListener('scroll', adjustChatButtonPosition);
  window.addEventListener('resize', adjustChatButtonPosition);
});

//FINAL DO POSISIONAMENTO DO BOTÃO INICAR CHAT PARA POSICIONAR ANTES DO FOOTER