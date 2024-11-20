
type gameRulesType = {
    paddle_dimensions: [number, number],
    ball_size: number,
    ball_speed: number,
    paddle_speed: number
};
window.onload = () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const canvasContext: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!canvasContext) {
        return;
    }

    let gameRules:gameRulesType = {
        paddle_dimensions: [100, 10],
        ball_size: 10,
        ball_speed: 5,
        paddle_speed: 5
    }


    drawEverything(canvasContext, gameRules);



}

function drawEverything(context: CanvasRenderingContext2D, gameRules: gameRulesType) {
    console.log("drawEverything");
    context.fillStyle = 'white';
    context.fillRect(0, 0, gameRules.paddle_dimensions[0], gameRules.paddle_dimensions[1]);
}