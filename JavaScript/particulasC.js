const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const screen_size = { x: canvas.width, y: canvas.height };
const particles = Array.from({ length: 20 }, () => ({ // NUMERO DE PARTICULAS GENERADAS
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
            particle.speed = 1 + Math.random() * 30; // VELOCIDAD DE PARTICULAS
            particle.radius = Math.random() * 4;
            particle.size = Math.random() * 5;

            particle.target_pos.x = Math.random() * screen_size.x;
            particle.target_pos.y = screen_size.y * 2;
        }
    });
}

function lerp(a, b, t) {
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function drawCircle(pos, radius, color) {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accent_color = 'rgb(204, 0, 255)';
    const accent_color_rgb = { r: 204, g: 0, b: 255 };
    particles.forEach(particle => {
        particle.pos = lerp(particle.pos, particle.target_pos, 0.016 * (particle.speed / 60));
        particle.rotate += 0.016;

        if (particle.pos.y > screen_size.y) {
            particle.pos.x = Math.random() * screen_size.x;
            particle.pos.y = Math.random() * 15;
            particle.rotate = 0;
        }

        const size = particle.size;


        for (let j = 1; j <= 30; j++) {
            const factor = 1.0 + j * 0.1;
            const alpha = 50 / j;
            const color = `rgba(${accent_color_rgb.r}, ${accent_color_rgb.g}, ${accent_color_rgb.b}, ${alpha / 255})`;

            drawCircle(particle.pos, size * factor, color);
        }

        drawCircle(particle.pos, size, accent_color);
    });

    requestAnimationFrame(renderParticles);
}

initParticles();
renderParticles();
