import type { FC, RefObject } from "react";
import SocialLinks from "./SocialLinks";

interface HeroSectionProps {
  heroRef: RefObject<HTMLDivElement | null>;
}

const HeroSection: FC<HeroSectionProps> = ({ heroRef }) => (
  <div>
    <div ref={heroRef}>
      <img
        src="hero_icon.jpg"
        alt="Profile"
        className="w-20 h-20 rounded-full mb-8 transition-transform hover:scale-110 object-cover"
      />
    </div>

    <div className="max-w-xl mb-12">
      <h1>
        麻雀が誰にとっても快適で楽しく遊べる世界を作ることを目指すエンジニア
      </h1>
    </div>
    <SocialLinks />
  </div>
);

export default HeroSection; 