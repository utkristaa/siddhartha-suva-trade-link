import VideoReel from "@/components/VideoReel";
import TextureCarousel from "@/components/TextureCarousel";

export const metadata = { title: "Portfolio | Siddhartha Suva Trade Link" };

export default function PortfolioPage() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-charcoal px-6 pb-16 pt-28 text-white">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <h1 className="serif-display text-[clamp(3.6rem,11vw,10rem)]">Port&shy;folio</h1>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">A walk through painted rooms: bedroom, living room, dining and kitchen. Hover the reel for controls.</p>
          </div>
          <div className="md:col-span-6 md:pr-4">
            <VideoReel className="max-w-[560px]" />
          </div>
        </div>
      </section>

      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="serif-display text-[clamp(2.6rem,6.5vw,6rem)]">Finishes you can feel</h2>
          <p className="mt-4 mb-12 max-w-md text-sm text-black/65">Move your pointer across each surface to move the light and see how the finish responds.</p>
          <TextureCarousel />
        </div>
      </section>
    </>
  );
}
