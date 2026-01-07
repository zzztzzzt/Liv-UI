import gsap from 'gsap';

export function useStackAnimation() {
  let ctx: gsap.Context;

  const initAnimations = (
    container: HTMLElement, 
    topBar: HTMLElement, 
    bottomBar: HTMLElement, 
    button: HTMLElement
  ) => {
    ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance
      tl.fromTo(button, 
        { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }
      )
      .fromTo([topBar, bottomBar], 
        { 
          x: (i) => (i === 0 ? -30 : 30), 
          opacity: 0,
          scaleX: 0.8
        },
        { 
          x: 0, 
          opacity: 1, 
          scaleX: 1, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: 'power3.out' 
        },
        "-=0.8"
      );

      // Rhythmic Idle
      gsap.to(topBar, {
        y: -6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(bottomBar, {
        y: 6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4
      });

      // Interaction
      const onEnter = () => {
        gsap.to(topBar, {
          x: -12, 
          y: -8,
          filter: 'brightness(1.1) saturate(1.1)', 
          duration: 0.5, 
          ease: 'power2.out' 
        });
        gsap.to(bottomBar, { 
          x: 12, 
          y: 8, 
          filter: 'brightness(1.1) saturate(1.1)', 
          duration: 0.5, 
          ease: 'power2.out' 
        });
        gsap.to(button, { 
          scale: 1.02,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          duration: 0.4 
        });
      };

      const onLeave = () => {
        gsap.to([topBar, bottomBar], { x: 0, y: 0, filter: 'brightness(1) saturate(1)', duration: 0.5 });
        gsap.to(button, { 
          scale: 1,
          backgroundColor: 'transparent',
          duration: 0.4 
        });
      };

      button.addEventListener('mouseenter', onEnter);
      button.addEventListener('mouseleave', onLeave);

    }, container);
  };

  const cleanup = () => ctx && ctx.revert();

  return { initAnimations, cleanup };
}