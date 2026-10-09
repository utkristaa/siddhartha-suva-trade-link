import HomeHero from "@/components/HomeHero";
import RoomCarousel from "@/components/RoomCarousel";
import PaintWipe from "@/components/PaintWipe";
import { rooms } from "@/lib/rooms";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section id="rooms" className="relative overflow-hidden bg-[linear-gradient(180deg,#f5f1eb_0%,#3e3e3e_18%,#262626_100%)] pb-28 pt-32 text-white">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f5f1eb]/40 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <h2 className="serif-display max-w-3xl text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.9]">YOUR WALLS DESERVE MORE</h2>
          <p className="mt-5 max-w-md text-sm text-white/65">A continuous gallery of rooms, colours and finishes.</p>
        </div>
        <div className="relative mt-12">
          <RoomCarousel rooms={rooms} />
        </div>
      </section>

      <div className="bg-charcoal">
        <PaintWipe />
      </div>
    </>
  );
}
