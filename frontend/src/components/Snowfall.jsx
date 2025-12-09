import React, { useRef, useEffect } from 'react';

const Snowfall = () => {
  const canvasRef = useRef(null);

  // --- RUTA DE IMAGEN ---
  const IMAGE_PATH = '/images/tematicos/copo.png'; 
  const SNOWFLAKE_COUNT = 60; 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakeImg = new Image();
    snowflakeImg.src = IMAGE_PATH; 
    
    let imageReady = false;
    snowflakeImg.onload = () => {
        imageReady = true;
        render(); 
    };

    const snowflakes = [];

    class Snowflake {
      constructor() {
        this.reset(true);
      }

      reset(isInitial = false) {
        // 1. Detectamos si es móvil (ancho menor a 768px)
        const isMobile = width < 768;

        // 2. Definimos tamaños según el dispositivo
        // Móvil: entre 5px y 18px | Escritorio: entre 10px y 35px
        const minSize = isMobile ? 5 : 10;
        const maxSize = isMobile ? 18 : 35;

        this.x = Math.random() * width;
        this.y = isInitial ? Math.random() * height : -maxSize;
        
        // 3. Generamos el tamaño usando los límites calculados arriba
        this.size = Math.random() * (maxSize - minSize) + minSize;
        
        // La velocidad depende del tamaño relativo (para mantener efecto 3D en ambos)
        this.speed = (this.size / maxSize) * 1.5 + 0.5; 
        
        this.wind = Math.random() * 2 - 1;
        this.angle = Math.random() * 360;
        this.spin = (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.1);
      }

      update() {
        this.y += this.speed;
        this.x += this.wind;
        this.angle += this.spin;

        if (this.y > height + this.size) {
          this.reset();
        }
        
        if (this.x > width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = width + this.size;
      }

      draw() {
        if (!imageReady) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        
        // Ajustamos la transparencia un poco
        // (dividir por 35 fija la opacidad máxima basada en el tamaño 'ideal' de escritorio)
        ctx.globalAlpha = Math.min(this.size / 35, 1); 

        ctx.drawImage(snowflakeImg, -this.size / 2, -this.size / 2, this.size, this.size);
        
        ctx.restore();
      }
    }

    for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
      snowflakes.push(new Snowflake());
    }

    let animationFrameId;
    
    const render = () => {
      if (!imageReady) return;

      ctx.clearRect(0, 0, width, height);
      snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
      });
      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Nota: Los copos se ajustarán de tamaño gradualmente 
      // conforme salgan de la pantalla y se llamen a reset()
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Snowfall;