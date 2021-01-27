console.log('Patrick Rodrigues - Flappy Bird')

let frames = 0;
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

            if(fazColisao(flappyBird, globais.chao)){
                console.log("Faz colisão");
                som_hit.play();
                mudaDeTela(Telas.game_over);
                    
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            console.log(flappyBird.velocidade)
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            {spriteX: 0, spriteY:0, },
            {spriteX: 0, spriteY:26, },
            {spriteX: 0, spriteY:52, },
        ],
        frameAtual:0,
        atualizarOFrameAtual(){

            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            if(passouOIntervalo){

                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }

        },

        desenha(){

            // Para colocar as imagens na tela é necessário saber suas posições dentro do sprite, para isso, será utilizada a sintaxe conforme descrito no MDN web Docs, um guia explicativo da função draw.Image().
            flappyBird.atualizarOFrameAtual();
            const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];
            context.drawImage(

                sprites, // A imagem referenciada é o sprite
                spriteX, spriteY, // Posição x e y iniciais do recorte 
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

const mensagemGameOver = {

    spriteX: 132,
    spriteY: 154,
    largura: 228,
    altura: 200,
    x: (canvas.width/2) - (228/2),
    y:50,

    desenha(){

        context.drawImage(

            sprites,
            mensagemGameOver.spriteX, mensagemGameOver.spriteY,
            mensagemGameOver.largura, mensagemGameOver.altura,
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.largura, mensagemGameOver.altura,

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

            const movimentoDoChao = 1;
            const repeteEm = chao.largura/2;
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm;

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

    return chao;
}

function criaCanos(){

    const canos = {

        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha(){

            canos.pares.forEach(function(par){

                const yRandom = par.y;
                const espacamentoEntreCanos = 120;
                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                //Cano do Céu
                context.drawImage(

                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,    
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,

                )
                // Cano do Chão
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos +yRandom;
                context.drawImage(

                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
                
                par.canoCeu =  {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }

                

            })
        },

        temColisaoComOFlappyBird(par){
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if((globais.flappyBird.x + globais.flappyBird.largura - 5) >= par.x){

                if(cabecaDoFlappy <= par.canoCeu.y){
                    return true;
                }

                if(peDoFlappy >= par.canoChao.y){
                    return true;
                }
                return false;
            }
        },
        pares: [],
        atualiza(){

            const passou100Frames = frames % 100 === 0;
            if (passou100Frames){

                canos.pares.push({x: canvas.width,y: -220*(Math.random() +1)});
            }

            canos.pares.forEach(function(par){

                par.x = par.x -2;

                if(canos.temColisaoComOFlappyBird(par)){
                    console.log("perdeu")
                    som_hit.play();
                    mudaDeTela(Telas.game_over);
                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }

            });
        }
    }
    return canos;
}

function criaPlacar(){

    const placar = {
        pontuacao: 0,
        desenha(){
            context.font = '35px VT323, serif';
            context.textAlign = 'right';
            context.fillStyle = 'white';
            context.fillText(`Pontuação: ${placar.pontuacao}`, canvas.width-35, 35);
        },
        atualiza(){
            const intervaloDeFrames = 40;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
        
            if(passouOIntervalo){
                placar.pontuacao++
            }

        }
    }

    return placar;
}    

// Telas

const globais = {}; 
let telaAtiva = {};
function mudaDeTela(novaTela){
    telaAtiva = novaTela;
    //
    if (telaAtiva.inicializa()){

        inicializa();   
    }

}

const Telas = {

    inicio: {
        inicializa(){
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
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
        inicializa(){
            
            globais.placar = criaPlacar();

        },
        desenha(){

            planoDeFundo.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            globais.placar.desenha();
        },
        click(){

            globais.flappyBird.pula();
        },
        atualiza(){
            globais.canos.atualiza();
            globais.chao.atualiza();
            globais.flappyBird.atualiza();
            globais.placar.atualiza();
        } 

    },
    
    game_over: {
        inicializa(){

        },
        desenha(){
            mensagemGameOver.desenha();
        },
        atualiza(){

        },
        click(){
            mudaDeTela(Telas.inicio);
        }
    }


}





function loop(){

    telaAtiva.desenha();
    telaAtiva.atualiza(); 
    frames++;
    requestAnimationFrame(loop);
    
}

window.addEventListener('click', function(){

    if (telaAtiva.click){
        telaAtiva.click();
    }

});


mudaDeTela(Telas.game_over);
 loop();


