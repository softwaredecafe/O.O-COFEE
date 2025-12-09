import React, { useRef, useEffect } from 'react';

const Snowfall = () => {
  const canvasRef = useRef(null);

  // --- CORRECCIÓN DE LA RUTA ---
  // En la carpeta public, la ruta empieza después de 'public/'
  const IMAGE_PATH = '/images/tematicos/copo.png'; 
  
  const MIN_SIZE = 10;   
  const MAX_SIZE = 35;   
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

    // Esto es clave: si la ruta está mal, esto nunca se ejecuta
    snowflakeImg.onload = () => {
        imageReady = true;
        render(); 
    };
    
    // (Opcional) Debug para ver si falla la carga en consola
    snowflakeImg.onerror = () => {
        console.error("No se pudo cargar la imagen del copo en: ", IMAGE_PATH);
    };

    const snowflakes = [];

    class Snowflake {
      constructor() {
        this.reset(true);
      }

      reset(isInitial = false) {
        this.x = Math.random() * width;
        this.y = isInitial ? Math.random() * height : -MAX_SIZE;
        this.size = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;
        this.speed = (this.size / MAX_SIZE) * 1.5 + 0.5; 
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
        ctx.globalAlpha = this.size / MAX_SIZE; 

        // Dibujar imagen centrada
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