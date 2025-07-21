import type { RefObject } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

export function NavbarAnimation() {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
        scrub: true,
      },
    });

    navTween.to("nav", {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backgroundFilter: "blur(10px)",
      duration: 0.5,
      ease: "power1.inOut",
    });
  }, []);
}

export function HeroAnimation(
  videoRef: RefObject<HTMLVideoElement | null>,
  isMobile: boolean
) {
  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars" });
    const pharagraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    const tl = gsap.timeline();

    tl.from(heroSplit.chars, {
      duration: 1.8,
      yPercent: 100, // transorm: "translateY(100%)",
      ease: "expo.out",
      stagger: 0.05,
    }).from(
      pharagraphSplit.lines,
      {
        duration: 1.8,
        yPercent: 100,
        opacity: 0,
        ease: "expo.out",
        stagger: 0.05,
      },
      "-=1.1"
    );
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(
        ".right-leaf",
        {
          y: 200,
        },
        0
      )
      .to(
        ".left-leaf",
        {
          y: -200,
        },
        0
      )
      .to(".arrow", { y: 100 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        tl2.to(videoRef.current, {
          currentTime: videoRef.current!.duration,
        });
      };
    }
  }, []);
}

export function CocktailsAnimation() {
  useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    parallaxTimeline
      .from("#c-left-leaf", {
        x: -100,
        y: 100,
      })
      .from("#c-right-leaf", {
        x: 100,
        y: 100,
      });
  });
}
