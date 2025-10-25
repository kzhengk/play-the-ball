class TennisGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 800;
        this.canvas.height = 400;
        
        // Game objects
        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            size: 10,
            dx: 5,
            dy: 5
        };
        
        this.paddleHeight = 80;
        this.paddleWidth = 10;
        
        this.player = {
            y: this.canvas.height / 2 - this.paddleHeight / 2,
            score: 0
        };
        
        this.ai = {
            y: this.canvas.height / 2 - this.paddleHeight / 2,
            score: 0
        };
        
        // Game state
        this.isRunning = false;
        
        // Controls
        this.keys = {
            up: false,
            down: false
        };
        
        // Bind methods
        this.gameLoop = this.gameLoop.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        
        // Event listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        document.getElementById('startBtn').addEventListener('click', () => this.start());
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.gameLoop();
        }
    }
    
    handleKeyDown(e) {
        if (e.key === 'ArrowUp' || e.key === 'w') this.keys.up = true;
        if (e.key === 'ArrowDown' || e.key === 's') this.keys.down = true;
    }
    
    handleKeyUp(e) {
        if (e.key === 'ArrowUp' || e.key === 'w') this.keys.up = false;
        if (e.key === 'ArrowDown' || e.key === 's') this.keys.down = false;
    }
    
    update() {
        // Player paddle movement
        if (this.keys.up && this.player.y > 0) {
            this.player.y -= 7;
        }
        if (this.keys.down && this.player.y < this.canvas.height - this.paddleHeight) {
            this.player.y += 7;
        }
        
        // AI paddle movement
        const aiSpeed = 5;
        const paddleCenter = this.ai.y + this.paddleHeight / 2;
        if (paddleCenter < this.ball.y - 35) {
            this.ai.y += aiSpeed;
        } else if (paddleCenter > this.ball.y + 35) {
            this.ai.y -= aiSpeed;
        }
        
        // Ball movement
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
        
        // Ball collision with top and bottom
        if (this.ball.y <= 0 || this.ball.y >= this.canvas.height) {
            this.ball.dy *= -1;
        }
        
        // Ball collision with paddles
        if (this.ball.dx < 0 && this.ball.x <= this.paddleWidth && 
            this.ball.y >= this.player.y && this.ball.y <= this.player.y + this.paddleHeight) {
            this.ball.dx *= -1;
        }
        
        if (this.ball.dx > 0 && this.ball.x >= this.canvas.width - this.paddleWidth && 
            this.ball.y >= this.ai.y && this.ball.y <= this.ai.y + this.paddleHeight) {
            this.ball.dx *= -1;
        }
        
        // Score points
        if (this.ball.x <= 0) {
            this.ai.score++;
            this.resetBall();
            document.getElementById('aiScore').textContent = this.ai.score;
        } else if (this.ball.x >= this.canvas.width) {
            this.player.score++;
            this.resetBall();
            document.getElementById('playerScore').textContent = this.player.score;
        }
    }
    
    resetBall() {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.dx = -this.ball.dx;
        this.ball.dy = Math.random() * 10 - 5;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw center line
        this.ctx.strokeStyle = '#fff';
        this.ctx.setLineDash([5, 15]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Draw paddles
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, this.player.y, this.paddleWidth, this.paddleHeight);
        this.ctx.fillRect(this.canvas.width - this.paddleWidth, this.ai.y, this.paddleWidth, this.paddleHeight);
        
        // Draw ball
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    gameLoop() {
        if (this.isRunning) {
            this.update();
            this.draw();
            requestAnimationFrame(this.gameLoop);
        }
    }
}

// Start the game when the page loads
window.onload = () => {
    new TennisGame();
};