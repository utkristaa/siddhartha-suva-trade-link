import VideoReel from "@/components/VideoReel";
import TextureCarousel from "@/components/TextureCarousel";

export const metadata = { title: "Portfolio | Siddhartha Suva Trade Link" };

export default function PortfolioPage() {
  return (
    <>
      <section className="overflow-hidden bg-charcoal px-6 pb-16 pt-32 text-white md:py-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:min-h-[calc(100svh-14rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
          <div className="max-w-lg">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#d9a441]">Paint in real rooms</p>
            <h1 className="serif-display text-6xl leading-[0.84] sm:text-7xl lg:text-8xl">Portfolio</h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">A closer look at the colours and finishes in our room showcases.</p>
            <a href="#finishes" className="mt-8 inline-flex text-sm font-medium text-white underline underline-offset-4">Explore the finishes</a>
          </div>
          <div className="flex justify-center lg:justify-end">
            <VideoReel className="max-w-[min(100%,520px)] sm:max-w-[min(50vw,520px)] lg:mx-0 lg:max-w-[min(36vw,54svh)]" />
          </div>
        </div>
      </section>

      <section id="finishes" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="serif-display text-[clamp(2.6rem,6.5vw,6rem)]">Finishes you can feel</h2>
          <p className="mt-4 mb-12 max-w-md text-sm text-black/65">Three finishes, each with its own way of catching the light.</p>
          <TextureCarousel />
        </div>
      </section>
    </>
  );
}
