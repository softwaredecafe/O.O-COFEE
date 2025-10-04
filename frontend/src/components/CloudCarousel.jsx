import React, { useState, useEffect, useRef, useCallback } from "react";
import "./CloudCarousel.css";

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
  images,
  options: userOptions,
  containerClassName = "cloud-carousel-container",
}) => {
  const defaults = {
    reflHeight: 50,
    reflOpacity: 0.5,
    reflGap: 4,
    minScale: 0.5,
    xRadius: 250,
    yRadius: 80,
    FPS: 30,
    autoRotate: "no",
    autoRotateDelay: 1500,
    speed: 0.1,
    bringToFront: true,
    showNavButtons: true,
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

  // const centerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
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
          // if (containerRef.current) {
          //    centerPos.current = {
          //         x: containerRef.current.offsetWidth / 2,
          //         y: containerRef.current.offsetHeight / 3
          //     };
          // }
          setIsLoaded(true);
        }
      };
    });
  }, [images]);

  const rotate = useCallback(
    (direction) => {
      if (images.length <= 1) return;
      const newFrontIndex =
        (frontIndex - direction + images.length) % images.length;
      setFrontIndex(newFrontIndex);
      const newDestRotation =
        destRotation + (Math.PI / images.length) * (2 * direction);
      setDestRotation(newDestRotation);
    },
    [frontIndex, destRotation, images.length]
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
      if (isMouseOver.current) return;
      const dir = options.autoRotate === "right" ? 1 : -1;
      rotate(dir);
    };

    clearInterval(autoRotateTimer.current);
    autoRotateTimer.current = setInterval(autoRotate, options.autoRotateDelay);

    return () => clearInterval(autoRotateTimer.current);
  }, [
    options.autoRotate,
    options.autoRotateDelay,
    rotate,
    isLoaded,
    isMouseOver.current,
  ]);

  const handleItemClick = (index) => {
    if (options.bringToFront) {
      const diff = (index - frontIndex + images.length) % images.length;
      const shortest =
        Math.abs(diff) > images.length / 2
          ? diff - (diff > 0 ? images.length : -images.length)
          : diff;
      rotate(-shortest);
    }
  };

  const handleMouseEnter = () => {
    isMouseOver.current = true;
  };
  const handleMouseLeave = () => {
    isMouseOver.current = false;
  };

  const spacing = (Math.PI / items.length) * 2;
  let currentAngle = rotation;

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ visibility: isLoaded ? "visible" : "hidden" }}
    >
      <div className="carousel-wrapper">
        {items.map((item, i) => {
          const sinVal = Math.sin(currentAngle);
          const scale =
            (sinVal + 1) * 0.5 * (1 - options.minScale) + options.minScale;

          const x =
            Math.cos(currentAngle) * options.xRadius -
            item.orgWidth * 0.5 * scale;
          const y = sinVal * options.yRadius * scale - 300;

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
            transform: `translate(${x}px, ${
              y + item.orgHeight * scale + options.reflGap * scale
            }px)`,
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
                style={{ width: "100%", height: "100%" }}
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
      {options.showNavButtons && (
        <>
          <button className="nav-button prev" onClick={() => rotate(1)}>
            ‹
          </button>
          <button className="nav-button next" onClick={() => rotate(-1)}>
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default CloudCarousel;
