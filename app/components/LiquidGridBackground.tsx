"use client";

import { useEffect, useRef } from "react";

interface LiquidGridProps {
  className?: string;
}

export default function LiquidGridBackground({ className = "" }: LiquidGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; radius: number }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    radius: 220,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.parentElement?.offsetHeight || 800;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }
      mouseRef.current.targetX = clientX - rect.left;
      mouseRef.current.targetY = clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove as EventListener);
    window.addEventListener("touchmove", handleMouseMove as EventListener);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Параметры сетки
    const CELL_SIZE = 48; // Размер ячейки сетки

    const render = () => {
      time += 0.012;

      // Плавное следование курсора (easing)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Фон с глубоким градиентом
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#081712");
      bgGrad.addColorStop(0.6, "#051f16");
      bgGrad.addColorStop(1, "#081712");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Мягкое центральное изумрудное пятно
      const radGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        0,
        width / 2,
        height * 0.45,
        Math.max(width, height) * 0.6
      );
      radGrad.addColorStop(0, "rgba(22, 163, 74, 0.12)");
      radGrad.addColorStop(0.5, "rgba(6, 78, 59, 0.06)");
      radGrad.addColorStop(1, "transparent");
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / CELL_SIZE) + 2;
      const rows = Math.ceil(height / CELL_SIZE) + 2;

      // Матрица деформированных вершин
      const grid: { x: number; y: number; intensity: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = (c - 1) * CELL_SIZE;
          const baseY = (r - 1) * CELL_SIZE;

          // Волновые синусоидальные гармоники (liquid flow)
          const wave1 = Math.sin(baseX * 0.006 + time * 1.2) * Math.cos(baseY * 0.006 + time * 0.9);
          const wave2 = Math.sin((baseX + baseY) * 0.004 - time * 0.7);
          const waveDeform = (wave1 * 14 + wave2 * 10);

          // Взаимодействие с курсором (интерактивная деформация)
          let mouseDeformX = 0;
          let mouseDeformY = 0;
          let mouseIntensity = 0;

          if (mouse.x > -500) {
            const dx = baseX - mouse.x;
            const dy = baseY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const factor = Math.cos((dist / mouse.radius) * (Math.PI / 2));
              mouseDeformX = (dx / (dist || 1)) * factor * 26;
              mouseDeformY = (dy / (dist || 1)) * factor * 26;
              mouseIntensity = factor;
            }
          }

          grid[r][c] = {
            x: baseX + mouseDeformX,
            y: baseY + waveDeform + mouseDeformY,
            intensity: mouseIntensity,
          };
        }
      }

      // 1. Отрисовка горизонтальных линий сетки
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];
          if (c === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            const prev = grid[r][c - 1];
            const cx = (prev.x + pt.x) / 2;
            const cy = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
          }
        }
        ctx.strokeStyle = "rgba(34, 197, 94, 0.09)";
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 2. Отрисовка вертикальных линий сетки
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = grid[r][c];
          if (r === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            const prev = grid[r - 1][c];
            const cx = (prev.x + pt.x) / 2;
            const cy = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
          }
        }
        ctx.strokeStyle = "rgba(34, 197, 94, 0.09)";
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 3. Отрисовка светящихся узловых точек сетки
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const pt = grid[r][c];
          const hasMouse = pt.intensity > 0.1;

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, hasMouse ? 2.8 : 1.4, 0, Math.PI * 2);

          if (hasMouse) {
            ctx.fillStyle = `rgba(74, 222, 128, ${0.4 + pt.intensity * 0.6})`;
            ctx.shadowColor = "#4ade80";
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = "rgba(34, 197, 94, 0.22)";
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove as EventListener);
      window.removeEventListener("touchmove", handleMouseMove as EventListener);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-100 transition-opacity duration-1000"
      />
      {/* Мягкий нижний растворяющийся градиент */}
      <div
        className="absolute bottom-0 inset-x-0 h-36 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #081712 100%)",
        }}
      />
    </div>
  );
}
