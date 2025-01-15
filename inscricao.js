
    function verificarSelecionados(){
        const select = document.getElementById('opcoes');
        textos = Array.from(document.getElementsByClassName('texto-opcao-selecionada'))

        tagsOpt = Array.from(select.getElementsByTagName('option'))
        console.log(textos) 
        textos.forEach(texto => {
            tagsOpt.forEach(opt => {
                
                if(texto.innerText === opt.innerText){
                    opt.disabled = true;
                }else{
                    opt.disabled = false;
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
        div.innerHTML = `<td class='texto-opcao-selecionada'>${texto}</td>`;

        let lixeira = document.createElement('td');
        lixeira.innerHTML = `<td'>${'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e20712"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'}</td>`;

        lixeira.classList.add('lixeira');
        lixeira.addEventListener('click', () => {
            let preco = parseFloat(opcaoSelecionada.dataset.preco);
            total.innerText = (parseFloat(total.innerText.replace(',', '.')) - preco).toFixed(2);
            listaDeOpcoes.removeChild(div);
            
            opcaoSelecionada.disabled = false;
        })

        div.appendChild(lixeira);
        
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

      const fieldsToValidate = Array.from(form.querySelectorAll('input, select')).filter(field => 
        field.id !== 'palestraMinicurso' && field.id !== 'opcoes'
      );

      fieldsToValidate.forEach(field => {
        if (!field.checkValidity()) {
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
          field.classList.add('is-valid');
        }
      });

      form.classList.add('was-validated')
    }, false)
  })
})()


// Função para formatar o CPF
function formatarCPF(cpf) {
    // Remove tudo que não for número
    cpf = cpf.replace(/\D/g, '');

    // Limita o CPF a 11 dígitos
    if (cpf.length <= 3) {
        return cpf;
    } else if (cpf.length <= 6) {
        return cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cpf.length <= 9) {
        return cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
}

// Função para validar o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove tudo que não for número

    // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    // Validação do primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;
    
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

/
document.getElementById('cpf').addEventListener('input', function() {
    const cpfInput = document.getElementById('cpf');
    cpfInput.value = formatarCPF(cpfInput.value);
});


document.getElementById('formulario').addEventListener('submit', function(event) {
    const cpf = document.getElementById('cpf').value.replace(/\D/g, ''); 

    if (cpf.length !== 11) {
        event.preventDefault();
        alert("O CPF deve conter exatamente 11 números.");
        return;
    }

    if (!validarCPF(cpf)) {
        event.preventDefault();
        alert("Por favor, insira um CPF válido.");
    }
});

document.getElementById('cpf').addEventListener('input', function(e) {
    let cpf = e.target.value.replace(/\D/g, ''); 

    
    if (cpf.length > 11) {
        cpf = cpf.substring(0, 11);
    }

    
    if (cpf.length > 6) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    } else if (cpf.length > 3) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{1})/, '$1.$2.$3');
    } else {
        cpf = cpf.replace(/(\d{3})(\d{1})/, '$1.$2');
    }

    e.target.value = cpf; 
})

document.getElementById('formulario').addEventListener('submit', function(event) {
    const cpf = document.getElementById('cpf').value.replace(/\D/g, ''); 

    if (cpf.length !== 11) {
        event.preventDefault();
        alert("O CPF deve conter exatamente 11 números.");
        return;
    }

    if (!validarCPF(cpf)) {
        event.preventDefault();
        alert("Por favor, insira um CPF válido.");
    }
});


function validarCPF(cpf) {
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; 
    }

    let soma = 0;
    let resto;

   
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;
    
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false; 
    }

    return true; 
}



 
