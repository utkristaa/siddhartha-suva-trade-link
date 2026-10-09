import VideoReel from "@/components/VideoReel";
import TextureCarousel from "@/components/TextureCarousel";

export const metadata = { title: "Portfolio | Siddhartha Suva Trade Link" };

export default function PortfolioPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-charcoal px-6 pb-16 pt-32 text-white sm:pb-20 md:items-center">
        <VideoReel background />
        <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
        <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-black/15" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <h1 className="serif-display max-w-4xl text-[clamp(3.6rem,11vw,10rem)]">Portfolio</h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">Room colour and finishes, seen in the spaces they were made for.</p>
        </div>
      </section>

      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="serif-display text-[clamp(2.6rem,6.5vw,6rem)]">Finishes you can feel</h2>
          <p className="mt-4 mb-12 max-w-md text-sm text-black/65">Three finishes, each with its own way of catching the light.</p>
          <TextureCarousel />
        </div>
      </section>
    </>
  );
}
