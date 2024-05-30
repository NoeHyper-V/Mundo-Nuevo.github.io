const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const screen_size = { x: canvas.width, y: canvas.height };

const particles = Array.from({ length: 12 }, () => ({ // NUMERO DE PARTICULAS 
    pos: { x: 0, y: 0 },
    target_pos: { x: 0, y: 0 },
    speed: 0,
    size: 0,
    radius: 0,
    rotate: 0
}));

function initParticles() {
    particles.forEach(particle => {
        if (particle.pos.x === 0 || particle.pos.y === 0) {
            particle.pos.x = Math.random() * screen_size.x;
            particle.pos.y = Math.random() * 15;
            particle.speed = 1 + Math.random() * 10;  // VELOCIDAD DE INICIO
            particle.radius = Math.random() * 4;
            particle.size = Math.random() * 6;

            particle.target_pos.x = Math.random() * screen_size.x;
            particle.target_pos.y = screen_size.y * 2;
        }
    });
}

function lerp(a, b, t) {
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function drawTriangle(p1, p2, p3, color) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accent_color = 'rgb(204, 0, 255)'; 
    particles.forEach(particle => {
        particle.pos = lerp(particle.pos, particle.target_pos, 0.016 * (particle.speed / 60));
        particle.rotate += 0.016;

        if (particle.pos.y > screen_size.y) {
            particle.pos.x = Math.random() * screen_size.x;
            particle.pos.y = Math.random() * 15; 
            particle.rotate = 0;
        }

        const size = particle.size;


        const p1 = { x: particle.pos.x - size, y: particle.pos.y + size };
        const p2 = { x: particle.pos.x + size, y: particle.pos.y + size };
        const p3 = { x: particle.pos.x, y: particle.pos.y - size };


        for (let j = 1; j <= 10; j++) {
            const factor = 1.0 + j * 1.5;
            const alpha = 70 / j;
            const color = `rgba(204, 0, 255, ${alpha / 255})`;

            ctx.beginPath();
            ctx.arc(p1.x, p1.y, size * factor * 0.2, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p2.x, p2.y, size * factor * 0.2, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p3.x, p3.y, size * factor * 0.2, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }

        drawTriangle(p1, p2, p3, accent_color);
    });

    requestAnimationFrame(renderParticles);
}

initParticles();
renderParticles();
