import gsap from 'gsap';

export function useBasicButtonAnimation() {
  let ctx: gsap.Context;
  let onEnter: (() => void) | null = null;
  let onLeave: (() => void) | null = null;
  let hoverTarget: HTMLElement | null = null;

  const initAnimations = (
    container: HTMLElement,
    button: HTMLElement,
    label: HTMLElement
  ) => {
    hoverTarget = button;

    ctx = gsap.context(() => {
      gsap.set(label, { clipPath: 'inset(0 100% 0 0)' });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        container,
        { opacity: 0, y: 24, scale: 0.92, filter: 'blur(12px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.1 }
      )
      .fromTo(
        button,
        { opacity: 0, y: 12, scale: 0.88, rotateX: 18 },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          duration: 0.85,
          ease: 'back.out(1.6)',
        },
        '-=0.65'
      )
      .to(
        label,
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.6,
          ease: 'power4.out',
        },
        '-=0.35'
      );

      onEnter = () => {
        gsap.to(button, {
          borderColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.6)',
            '0 0 12px 2px rgba(255,220,190,0.45)',
            '0 4px 20px rgba(180,100,60,0.05)',
          ].join(', '),
          backgroundColor: 'rgba(255,255,255,0.15)',
          duration: 0.65,
          ease: 'power2.out',
        });

        gsap.to(container, {
          filter: 'brightness(1.07) saturate(1.1)',
          duration: 0.65,
          ease: 'power2.out',
        });
      };

      onLeave = () => {
        gsap.to(button, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: 'none',
          backgroundColor: 'rgba(255,255,255,0.08)',
          duration: 0.75,
          ease: 'power2.inOut',
        });

        gsap.to(container, {
          filter: 'brightness(1) saturate(1)',
          duration: 0.75,
          ease: 'power2.inOut',
        });
      };

      button.addEventListener('mouseenter', onEnter);
      button.addEventListener('mouseleave', onLeave);
    }, container);
  };

  const cleanup = () => {
    if (hoverTarget && onEnter && onLeave) {
      hoverTarget.removeEventListener('mouseenter', onEnter);
      hoverTarget.removeEventListener('mouseleave', onLeave);
    }
    if (ctx) ctx.revert();
  };

  return { initAnimations, cleanup };
}