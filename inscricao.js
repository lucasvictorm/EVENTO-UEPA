
    function verificarSelecionados(){
        const select = document.getElementById('opcoes');
        const listaDeOpcoes = document.getElementById('lista-de-opcoes');
        tagsP = Array.from(listaDeOpcoes.getElementsByTagName('p'))

        tagsOpt = Array.from(select.getElementsByTagName('option'))

        tagsP.forEach(tag => {
            tagsOpt.forEach(opt => {
                console.log(opt.innerText)
                console.log(tag.innerText)
                if(tag.innerText === opt.innerText){
                    opt.disabled = true;
                }
            })
        })

    }


    function adicionarEscolha(){
        const select = document.getElementById('opcoes');
        let opcaoSelecionada = select.options[select.selectedIndex];
        if(opcaoSelecionada.disabled){
            return;
        }
        const listaDeOpcoes = document.getElementById('lista-de-opcoes');
        const total = document.getElementById('total');

        let preco = opcaoSelecionada.dataset.preco;
        let texto = opcaoSelecionada.text;

       
        total.innerText = (parseFloat(total.innerText.replace(',', '.')) + parseFloat(preco)).toFixed(2);
        
        

        const div = document.createElement('tr');
        div.classList.add('opcao-selecionada');
        div.innerHTML = `<td>${texto}</td>`;
        div.innerHTML += `<td class='lixeira'>${'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e20712"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'}</td>`;
        listaDeOpcoes.appendChild(div);

        verificarSelecionados();

        
    }

    function listarOpcoes() {
        const eventos = {
    palestra: [
        {
            nome: "A Engenharia de Software na Era da Inteligência Artificial - R$ 100,00",
            preco: 100.00
        },
        {
            nome: "DevOps e Engenharia de Software: Estratégias para Maximizar a Produtividade - R$ 120,00",
            preco: 120.00
        },
        {
            nome: "Microserviços e Arquitetura Moderna: Desafios e Soluções - R$ 150,00",
            preco: 150.00
        },
        {
            nome: "Encerramento do Dia: Painel de Discussão com Especialistas - R$ 80,00",
            preco: 80.00
        }
    ],
    minicurso: [
        {
            nome: "Introdução à Programação em Python - R$ 150,00",
            preco: 150.00
        },
        {
            nome: "Marketing Digital para Iniciantes - R$ 120,00",
            preco: 120.00
        },
        {
            nome: "Design Gráfico com Canva - R$ 100,00",
            preco: 100.00
        },
        {
            nome: "Fotografia com Smartphone - R$ 80,00",
            preco: 80.00
        },
        {
            nome: "Gestão de Projetos com Trello - R$ 130,00",
            preco: 130.00
        },
        {
            nome: "Introdução ao Desenvolvimento Web - R$ 170,00",
            preco: 170.00
        }
    ]
};

        
        const tipoEvento = document.getElementById('palestraMinicurso').value;
        const opcoes = document.getElementById('opcoes');

        opcoes.innerHTML = '';

        eventos[tipoEvento].forEach(opcao => {
            const option = document.createElement('option');
            option.innerText = opcao.nome;
            option.dataset.preco = opcao.preco;
            opcoes.appendChild(option);
        });

        verificarSelecionados()

    }


    function selecionarMinicurso(linha, event) {
        
        const checkbox = linha.querySelector('.form-check-input');

        let totalAtual = parseFloat(document.getElementById('total').innerText.replace(',', '.'));
        let precoDoMinicurso = parseFloat(linha.querySelector('td:last-child').innerText.replace(',', '.').replace('R$ ', ''));
        
      
       if (event.target.tagName === 'INPUT') {
     
            if (checkbox.checked) {
                totalAtual += precoDoMinicurso;
            } else {
                totalAtual -= precoDoMinicurso;
            }
        } else {
           
           
            
            if (!checkbox.checked) {
                totalAtual += precoDoMinicurso;
            } else {
                totalAtual -= precoDoMinicurso;
            }

            checkbox.checked = !checkbox.checked;
        }

       
        document.getElementById('total').innerText = totalAtual.toFixed(2).replace('.', ',');
    }
      
    
    (() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }else{
        event.preventDefault()
        document.getElementById('div-formulario-principal').style.display = 'none';
        document.getElementById('div-confirmacao').style.display = 'flex';
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

 
