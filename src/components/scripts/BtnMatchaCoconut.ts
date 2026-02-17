import gsap from 'gsap';

const STRIP_DATA = [
  { class: 'rotate-90 -top-31 left-7',  angle: 90 },
  { class: 'rotate-65 -top-31 -left-8', angle: 65 },
  { class: 'rotate-25 -top-22 -left-21', angle: 25 },
  { class: '-rotate-20 -top-7 -left-26', angle: -20 },
  { class: '-rotate-70 top-8 -left-19',  angle: -70 },
  { class: '-rotate-135 top-15 -left-1', angle: -135 },
];

export function useHeroAnimation() {
  let ctx: gsap.Context;

  const initAnimations = (container: HTMLElement, button: HTMLElement, strips: HTMLElement[]) => {
    ctx = gsap.context(() => {
      
      // Sequential Entrance
      const tl = gsap.timeline();

      tl.fromTo(strips, 
        { opacity: 0, x: (i) => (i < 3 ? -30 : 30), scaleX: 0 },
        { opacity: 1, x: 0, scaleX: 1, stagger: 0.15, duration: 1.5, ease: 'power4.out' }
      )
      .fromTo(button, 
        { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }, 
        "-=0.8" // start animation early
      );

      // Interaction
      const onEnter = () => {
        gsap.to(button, { boxShadow: '0 0 30px rgba(127,255,229,0.3)', duration: 0.6 });
        gsap.to(strips, { scale: 1.1, filter: 'brightness(1.1) saturate(1.2)', duration: 0.8, stagger: 0.05 });
      };

      const onLeave = () => {
        gsap.to(button, { scale: 1, boxShadow: 'none', duration: 0.6 });
        gsap.to(strips, { scale: 1, filter: 'brightness(1) saturate(1)', duration: 0.8 });
      };

      button.addEventListener('mouseenter', onEnter);
      button.addEventListener('mouseleave', onLeave);

    }, container);
  };

  const cleanup = () => {
    if (ctx) ctx.revert();
  };

  return { initAnimations, cleanup, STRIP_DATA };
}
