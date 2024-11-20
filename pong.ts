
type gameRulesType = {
    paddleDimensions: [number, number],
    ballSize: number,
    ballSpeed: number,
    paddleSpeed: number
};

const X = 0;
const Y = 1;

window.onload = () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const canvasContext: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!canvasContext) {
        return;
    }

    let gameRules:gameRulesType = {
        paddleDimensions: [100, 10],
        ballSize: 10,
        ballSpeed: 5,
        paddleSpeed: 5
    }


    let ballPos: [number, number] = [0, 0];
    let paddlePos: [number, number] = [canvas.width/2 - gameRules.paddleDimensions[X]/2, canvas.height - canvas.height/4];

    let keyPressed: boolean = false;
    let keyDirection: string = '';
    const fps: number = 10;

    window.addEventListener('keydown', (event) => {
        if(!keyPressed){
            if (event.key === 'ArrowLeft'){
                keyDirection = 'ArrowLeft';
            } else if (event.key === 'ArrowRight'){
                keyDirection = 'ArrowRight';
            }
            keyPressed = true;
        }
    });

    window.addEventListener('keyup', (event) => {
        keyPressed  = false;
        keyDirection = '';
    });
    setInterval(() => {
        paddlePos[X] = movePaddle(keyDirection, paddlePos, gameRules.paddleSpeed);
        drawEverything(canvasContext, gameRules, ballPos, paddlePos);
    }, 1000/fps);
    



}

function drawEverything(
        context: CanvasRenderingContext2D,
        gameRules: gameRulesType,
        ballPos: [number, number],
        paddlePos: [number, number]
    ) {
    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = 'white';
    context.fillRect(paddlePos[X], paddlePos[Y], gameRules.paddleDimensions[0], gameRules.paddleDimensions[1]);
}


function movePaddle(event: string, paddlePos: [number, number], speed: number) {
    if (event === 'ArrowLeft') {
        return paddlePos[X] - speed;
    } else if (event === 'ArrowRight') {
        return paddlePos[X] + speed;
    } else return paddlePos[X];
}