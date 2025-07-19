import { navLinks } from "../../constants/index";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Navbar() {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.to("nav", {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backgroundFilter: "blur(10px)",
      duration: 0.5,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <nav>
      <div>
        <a href="#home" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" />
          <p>Velvet Pour</p>
        </a>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
