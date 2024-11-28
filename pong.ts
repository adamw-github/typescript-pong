
type gameRulesType = {
    paddleDimensions: [number, number],
    ballSize: number,
    ballSpeed: number,
    paddleSpeed: number
};

const X = 0;
const Y = 1;

let keyPressed: boolean = false;
let keyDirection: string = '';


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


function drawEverything(
    context: CanvasRenderingContext2D,
    gameRules: gameRulesType,
    ballPos: [number, number],
    paddlePos: [number, number]
) {
    // Reset background
    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    // Draw Paddle
    context.fillStyle = 'white';
    context.fillRect(paddlePos[X], paddlePos[Y], gameRules.paddleDimensions[0], gameRules.paddleDimensions[1]);
    // Draw Ball
    context.beginPath();
    context.arc(ballPos[X], ballPos[Y], gameRules.ballSize, 0, Math.PI*2, true);
    context.fill();
}

function movePaddle(event: string, paddlePos: [number, number], speed: number) {
    if (event === 'ArrowLeft') {
        return paddlePos[X] - speed;
    } else if (event === 'ArrowRight') {
        return paddlePos[X] + speed;
    } else return paddlePos[X];
}

function moveBall(pos: [number, number], direction: number,speed: number): [number, number] {
    if(!direction){
        return [pos[X], pos[Y] + speed];
    } else{
        return [pos[X], pos[Y] - speed];
    }
    
}

function getBallDirection(yPos: number, direction: number, paddleY: number): number {
    if(yPos <= 0){
        return 0;
    } else if(yPos >= paddleY){
        return 1;
    } else{
        return direction;
    }
}

window.onload = () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const canvasContext: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!canvasContext) {
        throw new Error('2d rendering not supported');
    }

    let gameRules:gameRulesType = {
        paddleDimensions: [100, 10],
        ballSize: 10,
        ballSpeed: 5,
        paddleSpeed: 5
    }

    let ballPos: [number, number] = [canvas.width/2 - gameRules.ballSize/2, canvas.height/4];
    let ballDirection: number = 0;
    let paddlePos: [number, number] = [canvas.width/2 - gameRules.paddleDimensions[X]/2, canvas.height - canvas.height/4];

    const fps: number = 10;
    

    setInterval(() => {
        paddlePos[X] = movePaddle(keyDirection, paddlePos, gameRules.paddleSpeed);

        ballDirection = getBallDirection(ballPos[Y], ballDirection, canvas.height - canvas.height/4);
        ballPos = moveBall(ballPos, ballDirection, gameRules.ballSpeed);
        drawEverything(canvasContext, gameRules, ballPos, paddlePos);
    }, 1000/fps);
}

