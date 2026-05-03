// src/components/ui/ParticlesBackground.jsx
import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Detect theme
    function getTheme() {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Watch for theme changes
    const themeObserver = new MutationObserver(() => {
      // Reinitialize particles with new theme colors
      init();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;

        const theme = getTheme();
        if (theme === 'light') {
          this.opacity = Math.random() * 0.25 + 0.05;
          // Soft violet and rose tones for light mode
          this.color = Math.random() > 0.5 ? '109, 40, 217' : '225, 29, 114';
        } else {
          this.opacity = Math.random() * 0.4 + 0.1;
          // Neon blue and neon red for dark mode
          this.color = Math.random() > 0.5 ? '0, 242, 255' : '255, 0, 85';
        }
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      }
    }

    const init = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 20000);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connecting lines with color gradient
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            const r = (parseInt(particles[i].color.split(',')[0]) + parseInt(particles[j].color.split(',')[0])) / 2;
            const g = (parseInt(particles[i].color.split(',')[1]) + parseInt(particles[j].color.split(',')[1])) / 2;
            const b = (parseInt(particles[i].color.split(',')[2]) + parseInt(particles[j].color.split(',')[2])) / 2;
            
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.1 * (1 - distance/150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
    };
  }, []);

  // Dynamic background based on theme via CSS
  return (
    <canvas
      ref={canvasRef}
      className="particles-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
