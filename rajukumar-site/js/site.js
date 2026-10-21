    /* Day / night toggle: remembers the choice on this device */
    const root = document.documentElement;
    const themeBtn = document.getElementById('theme-btn');

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      const toLight = theme === 'dark';
      themeBtn.textContent = toLight ? 'Light' : 'Dark';
      themeBtn.setAttribute('aria-label', toLight ? 'Switch to light mode' : 'Switch to dark mode');
    }

    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    applyTheme(saved === 'light' ? 'light' : 'dark');

    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });

    /* Cinematic Motion Canvas: drifting particle & thrust field effect */
    const canvas = document.getElementById('motion-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = -Math.random() * 1.2 - 0.2; // Upward drift motion
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(242, 140, 27, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  
