import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./CloudCarousel.css";

// Función para obtener el ancho de la ventana
const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
};

const Reflection = ({ imageRef, options }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas || !image.complete) return;

    const drawReflection = () => {
      const { width, height } = image;
      const reflHeight = options.reflHeight;
      const opacity = options.reflOpacity;

      canvas.width = width;
      canvas.height = reflHeight;

      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.translate(0, height - 1);
      ctx.scale(1, -1);
      ctx.drawImage(image, 0, 0, width, height);
      ctx.restore();
      ctx.globalCompositeOperation = "destination-out";

      const gradient = ctx.createLinearGradient(0, 0, 0, reflHeight);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - opacity})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, reflHeight);
    };

    if (image.complete) {
      drawReflection();
    } else {
      image.onload = drawReflection;
    }
  }, [imageRef, options]);

  return <canvas ref={canvasRef} className="reflection" />;
};

const CloudCarousel = ({
  options: userOptions,
  containerClassName = "cloud-carousel-container",
}) => {
  const [width] = useWindowSize();

  // Opciones y tamaños dinámicos basados en el ancho de la pantalla
  const { imageSize, carouselOptions } = useMemo(() => {
    if (width < 480) { // Móvil
      return {
        imageSize: 200,
        carouselOptions: { xRadius: 120, yRadius: 40 },
      };
    }
    if (width < 768) { // Tableta
      return {
        imageSize: 350,
        carouselOptions: { xRadius: 180, yRadius: 60 },
      };
    }
    // Escritorio
    return {
      imageSize: 500,
      carouselOptions: { xRadius: 250, yRadius: 80 },
    };
  }, [width]);

  const images = useMemo(() => [
    { src: "images/carrusel/carrusel1.png", size: imageSize, alt: "Café en grano" },
    { src: "images/carrusel/carrusel2.png", size: imageSize, alt: "Taza de café" },
    { src: "images/carrusel/carrusel3.png", size: imageSize, alt: "Café latte art" },
    { src: "images/carrusel/carrusel4.png", size: imageSize, alt: "Café espresso" },
    { src: "images/carrusel/carrusel5.png", size: imageSize, alt: "Plantación de café" },
    { src: "images/carrusel/carrusel6.png", size: imageSize, alt: "Café preparándose" },
    { src: "images/carrusel/carrusel7.png", size: imageSize, alt: "Granos de café" },
    { src: "images/carrusel/carrusel8.png", size: imageSize, alt: "Café especial" },
    { src: "images/carrusel/carrusel9.png", size: imageSize, alt: "Barista trabajando" },
    { src: "images/carrusel/carrusel10.png", size: imageSize, alt: "Café molido" }
  ], [imageSize]);

  const defaults = {
    reflHeight: 50,
    reflOpacity: 0.5,
    reflGap: 4,
    minScale: 0.5,
    ...carouselOptions, // Aplicamos radios dinámicos
    FPS: 30,
    autoRotate: "left",
    autoRotateDelay: 3000,
    speed: 0.1,
    bringToFront: true,
    showNavButtons: false,
  };

  const options = { ...defaults, ...userOptions };

  const [frontIndex, setFrontIndex] = useState(0);
  const [rotation, setRotation] = useState(Math.PI / 2);
  const [destRotation, setDestRotation] = useState(Math.PI / 2);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const autoRotateTimer = useRef(null);
  const isMouseOver = useRef(false);

  useEffect(() => {
    // Re-calcula los items cuando las imágenes (y su tamaño) cambian
    const loadedItems = images.map((img, index) => {
      const imageElement = new Image();
      imageElement.src = img.src;
      return {
        ...img,
        id: `item-${index}`,
        element: imageElement,
        ref: React.createRef(),
        orgWidth: 0,
        orgHeight: 0,
      };
    });

    let loadedCount = 0;
    loadedItems.forEach((item) => {
      item.element.onload = () => {
        if (item.size) {
          const aspectRatio = item.element.height / item.element.width;
          item.orgWidth = item.size;
          item.orgHeight = item.size * aspectRatio;
        } else {
          item.orgWidth = item.width || item.element.width;
          item.orgHeight = item.height || item.element.height;
        }
        loadedCount++;
        if (loadedCount === loadedItems.length) {
          setItems([...loadedItems]);
          setIsLoaded(true);
        }
      };
      
      item.element.onerror = () => {
        console.error(`Error loading image: ${item.src}`);
        loadedCount++;
        if (loadedCount === loadedItems.length) {
          setItems([...loadedItems]);
          setIsLoaded(true);
        }
      };
    });
  }, [images]);

  const rotate = useCallback(
    (direction) => {
      if (images.length <= 1) return;
      setFrontIndex((prev) => (prev - direction + images.length) % images.length);
      setDestRotation((prev) => prev + (Math.PI / images.length) * (2 * direction));
    },
    [images.length]
  );

  useEffect(() => {
    const updateAll = () => {
      const change = destRotation - rotation;
      if (Math.abs(change) < 0.001) {
        setRotation(destRotation);
        cancelAnimationFrame(animationFrameId.current);
        return;
      }
      const newRotation = rotation + change * options.speed;
      setRotation(newRotation);
      animationFrameId.current = requestAnimationFrame(updateAll);
    };
    if (rotation !== destRotation) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = requestAnimationFrame(updateAll);
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [rotation, destRotation, options.speed]);

  useEffect(() => {
    if (options.autoRotate === "no" || !isLoaded) return;
    const autoRotate = () => {
      if (!isMouseOver.current) {
        const dir = options.autoRotate === "right" ? 1 : -1;
        rotate(dir);
      }
    };
    const timer = setInterval(autoRotate, options.autoRotateDelay);
    return () => clearInterval(timer);
  }, [options.autoRotate, options.autoRotateDelay, rotate, isLoaded]);

  const handleItemClick = (index) => {
    if (options.bringToFront) {
      const diff = (index - frontIndex + images.length) % images.length;
      const shortest = Math.abs(diff) > images.length / 2
        ? diff - (diff > 0 ? images.length : -images.length)
        : diff;
      rotate(-shortest);
    }
  };

  const handleMouseEnter = () => isMouseOver.current = true;
  const handleMouseLeave = () => isMouseOver.current = false;

  const spacing = (Math.PI / items.length) * 2;
  let currentAngle = rotation;

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="carousel-wrapper"
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
      >
        {items.map((item, i) => {
          const sinVal = Math.sin(currentAngle);
          const scale = (sinVal + 1) * 0.5 * (1 - options.minScale) + options.minScale;
          const x = Math.cos(currentAngle) * options.xRadius - item.orgWidth * 0.5 * scale;
          const y = sinVal * options.yRadius * scale;

          const itemStyle = {
            left: `50%`,
            top: `50%`,
            transform: `translate(${x}px, ${y}px)`,
            width: `${item.orgWidth * scale}px`,
            height: `${item.orgHeight * scale}px`,
            zIndex: Math.floor(scale * 100),
            opacity: scale,
          };

          const reflectionStyle = {
            left: `50%`,
            top: `50%`,
            transform: `translate(${x}px, ${y + item.orgHeight * scale + options.reflGap * scale}px)`,
            width: `${item.orgWidth * scale}px`,
            opacity: scale,
          };

          currentAngle += spacing;

          return (
            <div
              key={item.id}
              className="carousel-item"
              style={{ ...itemStyle, position: "absolute" }}
            >
              <img
                ref={item.ref}
                src={item.src}
                alt={item.alt}
                title={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onClick={() => handleItemClick(i)}
              />
              {options.reflHeight > 0 && (
                <div style={{ ...reflectionStyle, position: "absolute" }}>
                  <Reflection imageRef={item.ref} options={options} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CloudCarousel;