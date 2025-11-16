"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Sonic Waveform Canvas Component
const SonicWaveformCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const lineCount = 60;
      const segmentCount = 80;
      const height = canvas.height / 2;

      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        const progress = i / lineCount;
        const colorIntensity = Math.sin(progress * Math.PI);
        
        // تغيير اللون إلى الأبيض
        ctx.strokeStyle = `rgba(255, 255, 255, ${colorIntensity * 0.7})`;
        ctx.lineWidth = 1.5;

        for (let j = 0; j < segmentCount + 1; j++) {
          const x = (j / segmentCount) * canvas.width;
          
          // Mouse influence
          const distToMouse = Math.hypot(x - mouse.x, (height) - mouse.y);
          const mouseEffect = Math.max(0, 1 - distToMouse / 400);

          // Wave calculation
          const noise = Math.sin(j * 0.1 + time + i * 0.2) * 20;
          const spike = Math.cos(j * 0.2 + time + i * 0.1) * Math.sin(j * 0.05 + time) * 50;
          const y = height + noise + spike * (1 + mouseEffect * 2);

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[5] w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen' }} />;
};

// The main hero component
const SonicWaveformHero = ({ children }: { children?: React.ReactNode }) => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.8,
        ease: "easeInOut" as const,
      },
    }),
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: '#2D4763' }}>
      {/* White Transparent Grid Pattern Background */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <SonicWaveformCanvas />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[15]"></div>

      {/* Overlay HTML Content */}
      <div className="relative z-20 text-center px-6 py-8 flex flex-col items-center gap-8">
        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-b from-white via-white via-gray-200 via-gray-400 to-gray-600"
          style={{
            letterSpacing: '0.1em',
            lineHeight: '1.2'
          }}
        >
          Voice Assistant
        </motion.h1>
        
        {/* Button Container */}
        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          {children}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        custom={3}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-6 left-0 right-0 z-20 text-center"
      >
        <p className="text-xs text-gray-400/70 tracking-wider font-light">
          POWERED BY ORNINA GROUP
        </p>
      </motion.div>
    </div>
  );
};

export default SonicWaveformHero;
