import gsap from 'gsap';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
};

export function useTechInputAnimation() {
  let ctx: gsap.Context | null = null;
  let hoverTarget: HTMLElement | null = null;
  let focusTarget: HTMLInputElement | null = null;
  let particleFrame: number | null = null;
  let glowCanvas: HTMLCanvasElement | null = null;
  let particlesActive = false;

  const particles: Particle[] = [];
  const colors: string[] = [
    '#81FFAB',
    '#58A770',
    '#A8FFC4',
    '#34D875',
    '#ffffff',
  ];

  const spawnParticle = (w: number, h: number): void => {
    const edge = Math.floor(Math.random() * 4);
    let x = 0;
    let y = 0;

    if (edge === 0) {
      x = Math.random() * w;
      y = 0;
    } else if (edge === 1) {
      x = w;
      y = Math.random() * h;
    } else if (edge === 2) {
      x = Math.random() * w;
      y = h;
    } else {
      x = 0;
      y = Math.random() * h;
    }

    const angle = Math.atan2(h / 2 - y, w / 2 - x);
    const speed = 0.3 + Math.random() * 0.7;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1 + Math.random() * 2.5,
      alpha: 0,
      life: 0,
      maxLife: 80 + Math.random() * 120,
      color: colors[Math.floor(Math.random() * colors.length)]!,
    });
  };

  const renderParticles = (): void => {
    if (!glowCanvas) return;

    const w = (glowCanvas.width = glowCanvas.offsetWidth);
    const h = (glowCanvas.height = glowCanvas.offsetHeight);
    const ctx2d = glowCanvas.getContext('2d') as CanvasRenderingContext2D;

    ctx2d.clearRect(0, 0, w, h);

    if (particlesActive && Math.random() < 0.4) {
      spawnParticle(w, h);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (!p) continue;
      
      p.life++;
      p.x += p.vx;
      p.y += p.vy;

      const t = p.life / p.maxLife;
      p.alpha =
        t < 0.2 ? t / 0.2 : t > 0.7 ? (1 - t) / 0.3 : 1;

      const gradient = ctx2d.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, p.r * 6
      );
      
      gradient.addColorStop(0.0, p.color);
      gradient.addColorStop(0.2, p.color);
      gradient.addColorStop(0.5, p.color + '80');
      gradient.addColorStop(1.0, 'transparent');

      ctx2d.save();
      ctx2d.globalAlpha = p.alpha * 0.8;
      ctx2d.beginPath();
      ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx2d.fillStyle = gradient;
      ctx2d.fill();
      ctx2d.restore();

      if (p.life >= p.maxLife) {
        particles.splice(i, 1);
      }
    }

    particleFrame = requestAnimationFrame(renderParticles);
  };

  const initAnimations = (
    container: HTMLElement,
    shell: HTMLElement,
    input: HTMLInputElement
  ): void => {
    hoverTarget = shell;
    focusTarget = input;

    glowCanvas = document.createElement('canvas');
    Object.assign(glowCanvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.5s ease',
      zIndex: '0',
    } as CSSStyleDeclaration);

    shell.style.position = 'relative';
    shell.prepend(glowCanvas);

    particleFrame = requestAnimationFrame(renderParticles);

    const activate = (): void => {
      particlesActive = true;
      if (glowCanvas) glowCanvas.style.opacity = '1';
    };

    const deactivate = (): void => {
      particlesActive = false;
      if (glowCanvas) glowCanvas.style.opacity = '0';
    };

    const onEnter = (): void => activate();
    const onLeave = (): void => {
      if (document.activeElement !== input) deactivate();
    };
    const onFocus = (): void => activate();
    const onBlur = (): void => {
      if (!shell.matches(':hover')) deactivate();
    };

    hoverTarget.addEventListener('mouseenter', onEnter);
    hoverTarget.addEventListener('mouseleave', onLeave);
    focusTarget.addEventListener('focus', onFocus);
    focusTarget.addEventListener('blur', onBlur);

    ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { opacity: 0, scale: 0.88, filter: 'blur(16px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'back.out(1.6)',
        }
      );
    }, container);

    cleanupListeners = () => {
      hoverTarget?.removeEventListener('mouseenter', onEnter);
      hoverTarget?.removeEventListener('mouseleave', onLeave);
      focusTarget?.removeEventListener('focus', onFocus);
      focusTarget?.removeEventListener('blur', onBlur);
    };
  };

  let cleanupListeners: (() => void) | null = null;

  const cleanup = (): void => {
    cleanupListeners?.();
    cleanupListeners = null;

    if (particleFrame !== null) {
      cancelAnimationFrame(particleFrame);
      particleFrame = null;
    }

    glowCanvas?.remove();
    glowCanvas = null;

    ctx?.revert();
    ctx = null;
  };

  return { initAnimations, cleanup };
}