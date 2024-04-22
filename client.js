const axios = require("axios");

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}

const result = {
    username: "viniciusrf2",
    "resposta": -1,
}

function build_answer(resposta, slug, token){
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios
        .post(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, resposta, config)
        .then((response) => response.data.sucesso);
}

function soma(a, b, token){
    sum = a+b;
    result.resposta = sum;
    return build_answer(result, 'soma', token)
}

function tamanhoString(string, token){
    tamanho = string.length;
    result.resposta = tamanho;
    return build_answer(result, 'tamanho-string', token);
}

function nomeDoUsuario(email, token){
    username = ''
    let ad_found = false;
    let i = 0;
    while(!ad_found){
        if(email[i] != '@'){
            username += email[i];
        } else{
            ad_found = true;
        }
        i++;
    }
    result.resposta = username;
    return build_answer(result, 'nome-do-usuario', token);
}

function jacaWars(v, theta, token){
    let d = Math.pow(v, 2)*Math.sin(2*Math.PI*theta/180)/9.8;
    let resposta = -1;

    if(d > 100){
        resposta = 1;
    } else if(d == 100){
        resposta = 0;
    }

    result.resposta = resposta
    return build_answer(result, 'jaca-wars', token);
}

function anoBissexto(ano, token){
    let ehBissexto = (ano%4 == 0) && (ano%100 != 0 || ano%400==0)

    result.resposta = ehBissexto;
    return build_answer(result, 'ano-bissexto', token);
}

function volumeDaPizza(z, a, token){
    const pi = Math.PI;
    let volume = Math.round(pi*z*z*a);

    result.resposta = volume;
    return build_answer(result, 'volume-da-pizza', token);
}

function mru(s0, v, t, token){
    let s = s0 + v*t;

    result.resposta = s;
    return build_answer(result, 'mru', token);
}

function inverteString(string, token){
    invertexto = '';
    for(let i = string.length-1; i>=0; i--){
        invertexto += string[i];
    }

    result.resposta = invertexto;
    return build_answer(result, 'inverte-string', token);
}

function somaValores(objeto, token){
    let values = Object.values(objeto);
    let sum = 0;
    for(let i=0; i<values.length; i++){
        sum+=values[i];
    }

    result.resposta = sum;
    return build_answer(result, 'soma-valores', token);
}

function nEsimoPrimo(n, token){
    let counter = 0;
    let i = 2;
    while(counter < n){
        let ehPrimo = true;
        let j = 1;
        while(j <= Math.sqrt(i) && ehPrimo){
            let a = i;
            let b = j;
            while(b > 0){
                let t = a%b;
                a = b;
                b = t;
            }
            
            if(a != 1){
                ehPrimo = false;
            }
            j++;
        }

        if(ehPrimo){
            counter++;
        } else{
            ehPrimo = true;
        }
        i++;
    }

    result.resposta = i-1;
    return build_answer(result, 'n-esimo-primo', token);
}

function maiorPrefixoComum(strings, token){
    let maiorPrefixo = '';
    for(let i=0; i<strings.length; i++){
        for(let j=i+1; j<strings.length; j++){
            let k = 0;
            let prefixo = '';
            while((strings[j][k] == strings[i][k]) && k<Math.min(strings[j].length, strings[i].length)){
                prefixo += strings[j][k];
                k++;
            }

            if(prefixo.length > maiorPrefixo.length){
                maiorPrefixo = prefixo;
            }
        }
    }

    result.resposta = maiorPrefixo;
    return build_answer(result, 'maior-prefixo-comum', token);
}

function somaSegundoMaiorEMenorNumeros(numeros, token){
    let maior = 0;
    let segundoMaior = 0;
    let menor = numeros[0];
    let segundoMenor = menor;

    for(let i=0; i< numeros.length; i++){
        if(numeros[i] > maior){
            segundoMaior = maior;
            maior = numeros[i];
        } else if(numeros[i] > segundoMaior){
            segundoMaior = numeros[i]
        }
        
        if(numeros[i] < menor){
            segundoMenor = menor;
            menor = numeros[i];
        } else if(numeros[i] < segundoMenor){
            segundoMenor = numeros[i]
        }
    }

    sum = segundoMaior+segundoMenor;
    result.resposta = sum;
    return build_answer(result, 'soma-segundo-maior-e-menor-numeros', token);
}

function contaPalindromos(palavras, token){
    let palindromos = 0;
    for(let i=0; i<palavras.length; i++){
        let k=0;
        let ehPalindromo = true;
        let tamanho = palavras[i].length;
        while(ehPalindromo && k < tamanho){
            if(palavras[i][k] != palavras[i][tamanho-k-1]){
                ehPalindromo = false;
            }
            k++;
        }
        if(ehPalindromo){
            palindromos += 1;
        }
    }

    result.resposta = palindromos;
    return build_answer(result, 'conta-palindromos', token);
}

function somaDeStringsDeInts(strings, token){
    let numeros = strings.map((x) => parseInt(x));
    let resultado = numeros.reduce(
        (acc, cur) => acc+cur,
        0,
    );

    result.resposta = resultado;
    return build_answer(result, 'soma-de-strings-de-ints', token);
}

async function somaComRequisicoes(endpoints, token){
    let numeros = [];
    config.headers["Authorization"] = `Bearer ${token}`;

    for(let i=0; i<endpoints.length; i++){
        let value = axios
            .get(endpoints[i], config)
            .then((response) => response.data);
        numeros.push(value);
    }

    numeros = await Promise.all(numeros);

    let resultado = numeros.reduce(
        (acc, cur) => acc+cur,
        0,
    );

    result.resposta = resultado;
    return build_answer(result, 'soma-com-requisicoes', token);
}

async function cacaAoTesouro(inicio, token){
    config.headers["Authorization"] = `Bearer ${token}`;
    let value = await axios
        .get(inicio, config)
        .then((response) => response.data);

    if(typeof value == "string"){
        return cacaAoTesouro(value, token);
    }

    result.resposta = value;
    return build_answer(result, 'caca-ao-tesouro', token);
}

async function get_token(){
    return axios
        .post('https://tecweb-js.insper-comp.com.br/token', {username: "viniciusrf2"}, config)
        .then((response) => response.data.accessToken);
}

async function get_exercicios(token){
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", config)
        .then((response) => response.data);
}

async function main(){
    let token = await get_token();
    let exercicios = await get_exercicios(token);
    console.log(exercicios);
    
    let ans_soma = await soma(exercicios.soma.entrada.a, exercicios.soma.entrada.b, token);
    console.log(ans_soma)
    console.log(soma && "OK" || "ERRO")
    let ans_tamanhoString = await tamanhoString(exercicios['tamanho-string'].entrada.string, token);
    console.log(ans_tamanhoString)
    let ans_nomeDoUsuario = await nomeDoUsuario(exercicios['nome-do-usuario'].entrada.email, token);
    console.log(ans_nomeDoUsuario)
    let ans_jacaWars = await jacaWars(exercicios['jaca-wars'].entrada.v, exercicios['jaca-wars'].entrada.theta, token);
    console.log(ans_jacaWars);
    let ans_anoBissexto = await anoBissexto(exercicios['ano-bissexto'].entrada.ano, token);
    console.log(ans_anoBissexto)
    let ans_volumeDaPizza = await volumeDaPizza(exercicios['volume-da-pizza'].entrada.z, exercicios['volume-da-pizza'].entrada.a,token);
    console.log(ans_volumeDaPizza)
    let ans_mru = await mru(exercicios.mru.entrada.s0, exercicios.mru.entrada.v, exercicios.mru.entrada.t, token);
    console.log(ans_mru);
    let ans_inverteString = await inverteString(exercicios['inverte-string'].entrada.string, token);
    console.log(ans_inverteString);
    let ans_somaValores = await somaValores(exercicios['soma-valores'].entrada.objeto, token);
    console.log(ans_somaValores);
    let ans_nEsimoPrimo = await nEsimoPrimo(exercicios['n-esimo-primo'].entrada.n, token);
    console.log(ans_nEsimoPrimo);
    let ans_maiorPrefixoComum = await maiorPrefixoComum(exercicios['maior-prefixo-comum'].entrada.strings, token);
    console.log(ans_maiorPrefixoComum);
    let ans_somaSegundoMaiorEMenorNumeros = await somaSegundoMaiorEMenorNumeros(exercicios['soma-segundo-maior-e-menor-numeros'].entrada.numeros, token);
    console.log(ans_somaSegundoMaiorEMenorNumeros)
    let ans_contaPalindromos = await contaPalindromos(exercicios['conta-palindromos'].entrada.palavras, token);
    console.log(ans_contaPalindromos);
    let ans_somaDeStringsDeInts = await somaDeStringsDeInts(exercicios['soma-de-strings-de-ints'].entrada.strings, token);
    console.log(ans_somaDeStringsDeInts);
    let ans_somaComRequisicoes = await somaComRequisicoes(exercicios['soma-com-requisicoes'].entrada.endpoints, token);
    console.log(ans_somaComRequisicoes);
    // let ans_cacaAoTesouro = await cacaAoTesouro(exercicios['caca-ao-tesouro'].entrada.inicio, token);
    // console.log(ans_cacaAoTesouro);
    
}

main();

// axios
//     .get("https://catfact.ninja/fact")
//     .then((response) => console.log(response.data.fact));
  