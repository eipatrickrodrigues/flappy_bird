console.log('Patrick Rodrigues - Flappy Bird')

const som_hit = new Audio();
som_hit.src = 'hit-02.wav';

const sprites = new Image();
sprites.src = "imagens/sprites.png"

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function fazColisao(flappyBird, chao){

    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y

    if (flappyBirdY >= chaoY){
        return true;
    }else{
        return false;
    }


}


function criaFlappyBird(){

        const flappyBird = {

        spriteX: 0,
        spriteY: 0,
        largura: 34,
        altura: 26,
        x:10,
        y:50,
        velocidade: 0,
        gravidade: 0.2,
        pulo: 5,
        
        pula(){
            flappyBird.velocidade = - flappyBird.pulo;
        },

        atualiza(){

            if(fazColisao(flappyBird, chao)){
                console.log("Faz colisão");
                som_hit.play();
                setTimeout(() => {
                    mudaDeTela(Telas.inicio);
                }, 500);
                    
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            console.log(flappyBird.velocidade)
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },

        desenha(){

            // Para colocar as imagens na tela é necessário saber suas posições dentro do sprite, para isso, será utilizada a sintaxe conforme descrito no MDN web Docs, um guia explicativo da função draw.Image().

            context.drawImage(

                sprites, // A imagem referenciada é o sprite
                flappyBird.spriteX, flappyBird.spriteY, // Posição x e y iniciais do recorte 
                flappyBird.largura, flappyBird.altura, // tamanho do recorte no sprite 
                flappyBird.x, flappyBird.y, // localização no canvas
                flappyBird.largura, flappyBird.altura, // tamanho do recorte no canvas
            );
        }
    }

    return flappyBird;
}


const mensagemGetReady = {

    spriteX: 130,
    spriteY: 0,
    largura: 210,
    altura: 190,
    x: (canvas.width/2) - (190/2),
    y:50,

    desenha(){

        context.drawImage(

            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura,

        )

    }

}


const planoDeFundo = {

    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 150,
    x: 0,
    y: canvas.height - 204,

    desenha(){

        context.fillStyle = '#70c5ce'
        context.fillRect(0,0,canvas.width,canvas.height)

        context.drawImage(

            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        context.drawImage(

            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x + planoDeFundo.largura, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );


    }

}


function criaChao() {

    const chao = {

        spriteX: 0,
        spriteY: 610,
        largura: 226,
        altura: 610,
        x:  0,
        y: canvas.height-112,
        atualiza(){

            console.log('Mexer o chão');

        },

        desenha(){

            context.drawImage(

                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            context.drawImage(

                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura -10), chao.y,
                chao.largura, chao.altura,
            );
        }
    }


}

    
// Telas

const globais = {}; 
let telaAtiva = {};
function mudaDeTela(novaTela){
    telaAtiva = novaTela;

    if (telaAtiva.inicializa()){
        inicializa();   
    }

}

const Telas = {

    inicio: {
        inicializa(){
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudaDeTela(Telas.jogo)
        },
        atualiza(){
            globais.chao.atualiza();

        },
    },

    jogo: {

        desenha(){

            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();

        },
        click(){

            globais.flappyBird.pula();
        },
        atualiza(){
            globais.flappyBird.atualiza();

        } 

    }
    



}





function loop(){

    telaAtiva.desenha();
    telaAtiva.atualiza(); 
      
    requestAnimationFrame(loop);
    
}

window.addEventListener('click', function(){

    if (telaAtiva.click){
        telaAtiva.click();
    }

});


mudaDeTela(Telas.inicio);
 loop();


