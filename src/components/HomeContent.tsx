"use client";

import HeroReveal from "@/components/sections/HeroReveal";
import PhotoMarquee from "@/components/sections/PhotoMarquee";
import Skills from "@/components/sections/Skills";
import SportApp from "@/components/sections/SportApp";
import SectionTitle from "@/components/SectionTitle";
import SectionHeading from "@/components/SectionHeading";
import ThemeSection from "@/components/ThemeSection";
import Timeline from "@/components/Timeline";
import HobbyList from "@/components/HobbyList";
import { LangRemount, useContent } from "@/components/LangProvider";

function Sections() {
  const { work, offWork, hobbies } = useContent();
  return (
    <>
      <HeroReveal />

      {/* Themes: hero light → work dark → hobbies light → photo band and footer dark */}
      <ThemeSection id="work" start="top 30%">
        <SectionTitle title="Work" intro={work.intro} />
        <div className="px-4 py-16 md:px-8">
          <SectionHeading title={work.stations} />
          <Timeline />
        </div>
        <SportApp />
        <Skills />
      </ThemeSection>

      <section id="off-work">
        <SectionTitle title="Off Work" intro={offWork.intro} />
        <HobbyList items={hobbies} />
        <ThemeSection>
          <PhotoMarquee />
        </ThemeSection>
      </section>
    </>
  );
}

export default function HomeContent() {
  return (
    <LangRemount>
      <Sections />
    </LangRemount>
  );
}
