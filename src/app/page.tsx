import PageShell from "@/components/PageShell";
import HeroReveal from "@/components/sections/HeroReveal";
import WideImage from "@/components/sections/WideImage";
import About from "@/components/sections/About";
import ImagePair from "@/components/sections/ImagePair";
import PhotoMarquee from "@/components/sections/PhotoMarquee";
import Skills from "@/components/sections/Skills";
import SectionTitle from "@/components/SectionTitle";
import SectionHeading from "@/components/SectionHeading";
import ThemeSection from "@/components/ThemeSection";
import Timeline from "@/components/Timeline";
import HobbyPanels from "@/components/HobbyPanels";
import { company, hobbies, offWorkStatement } from "@/content/site";

export default function Home() {
  return (
    <PageShell>
      <HeroReveal />
      <About />
      <WideImage />

      <ThemeSection id="work">
        <SectionTitle title="Work" intro={`Die Teams, in denen ich bei ${company} gearbeitet habe — und was ich dort gemacht habe.`} />
        <div className="px-4 py-16 md:px-8">
          <SectionHeading title="Meine Stationen" />
          <Timeline />
        </div>
        <Skills />
      </ThemeSection>

      <section id="off-work">
        <SectionTitle title="Off Work" intro="Was ich mache, wenn ich nicht gerade arbeite." />
        <HobbyPanels items={hobbies} />
        <About statement={offWorkStatement} />
        <ImagePair />
        <PhotoMarquee />
      </section>
    </PageShell>
  );
}
