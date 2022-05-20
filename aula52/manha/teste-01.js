const calcular = () => {

    let numero_1 = document.getElementById("numero_1").value
    let numero_2 = document.getElementById("numero_2").value

    numero_1 = Number(numero_1)
    numero_2 = Number(numero_2)

    const operacao = document.getElementById("operacao").value

    obterResultado(numero_1,numero_2,operacao)

}

const obterResultado = (n1,n2,op) => {

    let resultado;

    switch (op) {
        case '+':
            resultado = n1 + n2
            break;
        case '-':
            resultado = n1 - n2
            break;
        case '*':
            resultado = n1 * n2
            break;
        case '/':
            resultado = n1 / n2
            break;
    
        default:
            console.log("Opção inválida")
            break;
    }

    console.log("Resultado:",resultado)

}