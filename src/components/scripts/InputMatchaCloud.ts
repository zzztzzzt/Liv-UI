import gsap from 'gsap';

export function useCloudInputAnimation() {
  let ctx: gsap.Context | null = null;
  let idleTl: gsap.core.Timeline | null = null;
  let hoverTarget: HTMLElement | null = null;
  let focusTarget: HTMLInputElement | null = null;
  let cleanupListeners: (() => void) | null = null;

  const initAnimations = (
    container: HTMLElement,
    shell: HTMLElement,
    input: HTMLInputElement,
    clouds: HTMLElement[]
  ): void => {
    hoverTarget = shell;
    focusTarget = input;

    const cloudBodies = clouds
      .map((cloud) => cloud.firstElementChild)
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    // It only moves when interacting
    idleTl = gsap.timeline({ paused: true });
    clouds.forEach((cloud, i) => {
      const amp = i === 1 ? 5 : 8;
      idleTl!.to(cloud, {
        y: `-=${amp}`,
        duration: 1.5 + i * 0.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }, 0); // All executions begin at time 0, achieving synchronization but staggered timing
    });

    const activate = (): void => {
      idleTl?.play();

      gsap.to(shell, {
        height: 100,
        filter: 'brightness(1.05) saturate(1.08)',
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      gsap.to(clouds, {
        x: (i) => (i === 1 ? -6 : 6),
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.05,
        overwrite: 'auto',
      });

      gsap.to(cloudBodies, {
        backgroundColor: '#FFFFFF',
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(input, {
        letterSpacing: '0.04em',
        color: '#6f6f6f',
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const deactivate = (): void => {
      idleTl?.pause();
      
      gsap.to(shell, {
        height: 64,
        boxShadow: '0 0 0 0px rgba(0,0,0,0)',
        filter: 'brightness(1) saturate(1)',
        duration: 0.7,
        ease: 'power3.inOut',
        overwrite: 'auto',
      });

      gsap.to(clouds, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: 0.04,
        overwrite: 'auto',
      });

      gsap.to(cloudBodies, {
        backgroundColor: '#FFFFFF',
        filter: 'none',
        duration: 0.6,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });

      gsap.to(input, {
        letterSpacing: '0em',
        color: '#AAAAAA',
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    };

    const onEnter = () => activate();
    const onLeave = () => {
      if (document.activeElement !== input) deactivate();
    };
    const onFocus = () => activate();
    const onBlur = () => {
      if (!shell.matches(':hover')) deactivate();
    };

    hoverTarget.addEventListener('mouseenter', onEnter);
    hoverTarget.addEventListener('mouseleave', onLeave);
    focusTarget.addEventListener('focus', onFocus);
    focusTarget.addEventListener('blur', onBlur);

    cleanupListeners = () => {
      hoverTarget?.removeEventListener('mouseenter', onEnter);
      hoverTarget?.removeEventListener('mouseleave', onLeave);
      focusTarget?.removeEventListener('focus', onFocus);
      focusTarget?.removeEventListener('blur', onBlur);
    };

    ctx = gsap.context(() => {
      // entrance animation during initial page load
      gsap.set(clouds, { transformOrigin: '50% 50%' });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        container,
        { opacity: 0, y: 26, scale: 0.9, filter: 'blur(14px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.05 }
      )
      .fromTo(
        clouds,
        { opacity: 0, y: 16, scale: 0.8, rotate: (i) => (i === 1 ? -8 : 8) },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.95,
          stagger: 0.09,
          ease: 'back.out(1.5)',
        },
        '-=0.78'
      );
    }, container);
  };

  const cleanup = (): void => {
    cleanupListeners?.();
    idleTl?.kill(); // Ensure resource release
    ctx?.revert();
  };

  return { initAnimations, cleanup };
}