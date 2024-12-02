const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 600); // Convert time from seconds to milliseconds
});

gsap.ticker.lagSmoothing(0);