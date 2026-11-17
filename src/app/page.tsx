import PageShell from "@/components/PageShell";
import HeroReveal from "@/components/sections/HeroReveal";
import Collage from "@/components/sections/Collage";
import ZoomLinks from "@/components/sections/ZoomLinks";

export default function Home() {
  return (
    <PageShell>
      <HeroReveal />
      <Collage />
      <ZoomLinks />
    </PageShell>
  );
}
