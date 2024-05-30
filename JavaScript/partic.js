document.getElementById('anim').addEventListener('click', function() {
    Swal.fire({
        title: "Hello world XD !!! ",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#141212",
        backdrop: `
            rgba(0, 0, 0)
            url("./Imagenes/cat.gif")
            left top
            no-repeat
        `
    });
});

document.getElementById('submenuBtn').addEventListener('click', function() {
    var submenu = document.getElementById('submenu');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});

document.getElementById('circles').addEventListener('click', function() {
    accentColor = document.getElementById('colorPicker').value;
    initParticles('circles');
    startRendering('circles');
});

document.getElementById('triangles').addEventListener('click', function() {
    accentColor = document.getElementById('colorPicker').value;
    initParticles('triangles');
    startRendering('triangles');
});

document.getElementById('colorPicker').addEventListener('input', function(event) {
    accentColor = event.target.value;
});

function loadScript(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}

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

let accentColor = 'rgb(0,255, 235)';
let animationId; 

function initParticles(type) {
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

function drawCircle(pos, radius, color) {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
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

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function renderParticles(type) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accentColorRgb = hexToRgb(accentColor);

    particles.forEach(particle => {
        particle.pos = lerp(particle.pos, particle.target_pos, 0.016 * (particle.speed / 60));
        particle.rotate += 0.016;

        if (particle.pos.y > screen_size.y) {
            particle.pos.x = Math.random() * screen_size.x;
            particle.pos.y = Math.random() * 15; 
            particle.rotate = 0;
        }

        const size = particle.size;

        if (type === 'circles') {
            for (let j = 1; j <= 10; j++) {
                const factor = 1.0 + j * 0.4;
                const alpha = 40 / j;
                const color = `rgba(${accentColorRgb.r}, ${accentColorRgb.g}, ${accentColorRgb.b}, ${alpha / 255})`;

                drawCircle(particle.pos, size * factor, color);
            }
            drawCircle(particle.pos, size, `rgb(${accentColorRgb.r}, ${accentColorRgb.g}, ${accentColorRgb.b})`);
        } else if (type === 'triangles') {
            const p1 = { x: particle.pos.x - size, y: particle.pos.y + size };
            const p2 = { x: particle.pos.x + size, y: particle.pos.y + size };
            const p3 = { x: particle.pos.x, y: particle.pos.y - size };

            for (let j = 1; j <= 10; j++) {
                const factor = 1.0 + j * 1.0;
                const alpha = 50 / j;
                const color = `rgba(${accentColorRgb.r}, ${accentColorRgb.g}, ${accentColorRgb.b}, ${alpha / 255})`;

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
            drawTriangle(p1, p2, p3, `rgb(${accentColorRgb.r}, ${accentColorRgb.g}, ${accentColorRgb.b})`);
        }
    });

    animationId = requestAnimationFrame(() => renderParticles(type));
}

function startRendering(type) {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    renderParticles(type);
}
