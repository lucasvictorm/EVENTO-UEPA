

document.getElementById('formulario').addEventListener('submit', async event => {
    event.preventDefault();
    let formulario = document.getElementById('formulario')

    fetch('http://localhost:8080/evento-uepa/gerenciarEvento/cadastrar.php',{
        method: 'POST',
        body: new FormData(formulario)
    }
    ).then(response => response.json())
    .then(data => console.log(data))

})