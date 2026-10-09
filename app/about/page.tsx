import Image from "next/image";

export const metadata = { title: "About Us | Siddhartha Suva Trade Link" };

const team = [
  { name: "Sindhu Adhikari", role: "Colour Consultant", photo: "/team/sindhu-adhikari.jpg", position: "50% 42%" },
  { name: "Utkrista Adhikari", role: "Paint Specialist", photo: "/team/utkrista-adhikari.jpg", position: "72% center" },
  { name: "Aryan Adhikari", role: "Store Assistant", photo: "/team/aryan-adhikari.jpg", position: "50% 38%" },
];

const story = [
  { title: "Prepare", text: "A little care before painting helps the finish last.", img: "/textures/peeling-wall.jpg" },
  { title: "Choose", text: "Compare samples in the light of your own room.", img: "/textures/room-swatches.jpg" },
  { title: "Finish", text: "Bring the colour together with the rest of the room.", img: "/rooms/room-4.jpg" },
];

export default function AboutPage() {
  return (
    <div className="pb-32 pt-32">
      {/* Founder spotlight */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:gap-10 lg:gap-16">
        <div className="group relative mx-auto w-full max-w-[640px] md:mx-0 md:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal" style={{ clipPath: "polygon(0 0, 100% 0, 100% 86%, 82% 100%, 0 100%)" }}>
            <Image src="/team/ujjwal-adhikari.jpg" alt="Portrait of Ujjwal Adhikari" fill priority sizes="(min-width:1024px) 48vw, (min-width:640px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" style={{ objectPosition: "66% center" }} />
          </div>
        </div>
        <div className="pb-6 md:py-10">
          <p className="text-sm font-semibold">Store Founder</p>
          <h1 className="serif-display mt-3 text-5xl leading-[0.82] text-charcoal sm:text-6xl lg:text-8xl">Ujjwal<br />Adhikari</h1>
          <p className="serif-display mt-6 text-3xl leading-[1.05] md:text-4xl">The right colour should feel good at home.</p>
          <p className="mt-5 text-sm leading-relaxed text-black/65">
            We started with a straightforward aim: help people choose the right paint for their home, not the most expensive one. Our team can talk through colour, finish and the surface you are painting before you decide.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto mt-24 max-w-7xl px-6 lg:mt-40">
        <h2 className="serif-display text-[clamp(2.4rem,6vw,5rem)]">The people behind the counter</h2>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <article key={m.name} className={`group ${i === 1 ? "lg:mt-20" : i === 2 ? "lg:mt-8" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                <Image src={m.photo} alt={`Portrait of ${m.name}`} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" style={{ objectPosition: m.position }} />
              </div>
              <h3 className="serif-display mt-4 text-3xl">{m.name}</h3>
              <p className="text-sm text-black/60">{m.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Storyboard */}
      <section className="mt-24 bg-charcoal py-20 text-white lg:mt-40 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="serif-display text-[clamp(3rem,9vw,8.5rem)]">From prep to final coat</h2>
          <div className="mt-10 flex min-h-[480px] flex-col gap-3 md:mt-14 lg:h-[70vh] lg:min-h-[420px] lg:flex-row">
            {story.map((s) => (
              <article key={s.title} tabIndex={0} className="group relative flex-1 overflow-hidden transition-[flex] duration-700 ease-out hover:flex-[2.4] focus-visible:flex-[2.4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0 group-focus-visible:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="serif-display text-4xl">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/75 opacity-100 transition duration-500 lg:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
