import Image from "next/image";

export const metadata = { title: "About Us | Siddhartha Suva Trade Link" };

const team = [
  { name: "Sindhu Adhikari", role: "Color Consultant", photo: "/team/sindhu.svg" },
  { name: "Utkrista Adhikari", role: "Paint Specialist", photo: "/team/utkrista.svg" },
  { name: "Aryan Adhikari", role: "General Facilitator", photo: "/team/aryan.svg" },
];

const story = [
  { title: "Prepare", text: "Every good finish begins with the wall underneath.", img: "/textures/peeling-wall.jpg" },
  { title: "Choose", text: "Swatches, light and a patient conversation.", img: "/textures/room-swatches.jpg" },
  { title: "Finish", text: "The room you imagined, on the wall.", img: "/rooms/room-4.jpg" },
];

export default function AboutPage() {
  return (
    <div className="pb-32 pt-32">
      {/* Founder spotlight */}
      <section className="mx-auto grid max-w-7xl grid-cols-12 items-end gap-6 px-6">
        <div className="group relative col-span-12 md:col-span-7">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal" style={{ clipPath: "polygon(0 0, 100% 0, 100% 86%, 82% 100%, 0 100%)" }}>
            <Image src="/team/ujjwal.svg" alt="Portrait placeholder for Ujjwal Adhikari" fill priority sizes="(min-width:768px) 58vw, 100vw" className="object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:saturate-150" />
          </div>
          <h1 className="serif-display pointer-events-none absolute -bottom-6 left-4 z-10 text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.8] text-charcoal drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] md:-right-10 md:left-auto md:text-white/95">
            Ujjwal<br />Adhikari
          </h1>
        </div>
        <div className="col-span-12 pb-6 md:col-span-4 md:col-start-9">
          <p className="text-sm font-semibold">Store Founder</p>
          <p className="serif-display mt-5 text-3xl leading-[1.05] md:text-4xl">Colour is a decision you live with every day.</p>
          <p className="mt-5 text-sm leading-relaxed text-black/65">
            Siddhartha Suva Trade Link was built around a simple idea: a customer should leave with the right paint, not the most expensive one. We stock the flagship ranges from Berger and Asian Paints and help you match finish, colour and surface before you spend.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto mt-40 max-w-7xl px-6">
        <h2 className="serif-display text-[clamp(2.4rem,6vw,5rem)]">The people behind the counter</h2>
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {team.map((m, i) => (
            <article key={m.name} className={`group ${i === 1 ? "md:mt-20" : i === 2 ? "md:mt-8" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                <Image src={m.photo} alt={`Portrait placeholder for ${m.name}`} fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              </div>
              <h3 className="serif-display mt-4 text-3xl">{m.name}</h3>
              <p className="text-sm text-black/60">{m.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Storyboard */}
      <section className="mt-40 bg-charcoal py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="serif-display text-[clamp(3rem,9vw,8.5rem)]">Every Wall Tells a Story</h2>
          <div className="mt-14 flex h-[70vh] min-h-[420px] flex-col gap-3 md:flex-row">
            {story.map((s) => (
              <article key={s.title} tabIndex={0} className="group relative flex-1 overflow-hidden transition-[flex] duration-700 ease-out hover:flex-[2.4] focus-visible:flex-[2.4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0 group-focus-visible:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="serif-display text-4xl">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/75 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
