import BrushPad from "@/components/BrushPad";
import { PHONES, whatsappLink } from "@/lib/whatsapp";

export const metadata = { title: "Contact | Siddhartha Suva Trade Link" };

const prompts = [
  { label: "Choose paint for an interior", msg: "Hello, I am choosing paint for an interior room. Could you help me compare a few options?" },
  { label: "Arrange a colour consultation", msg: "Hello, could I arrange a colour consultation for my home?" },
  { label: "Protect an exterior wall", msg: "Hello, I need paint for an exterior wall. Could you recommend a weather-resistant option?" },
  { label: "Get a project estimate", msg: "Hello, could I get an estimate for a painting project?" },
];

export default function ContactPage() {
  return (
    <div className="px-6 pb-32 pt-36">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <h1 className="serif-display text-[clamp(3.4rem,9vw,8rem)]">Start a conversation</h1>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-black/55">Primary contact and WhatsApp</dt>
              <dd className="mt-1 font-sans text-2xl font-semibold tabular-nums tracking-normal sm:text-3xl"><a className="break-words" href={whatsappLink()} target="_blank" rel="noopener noreferrer">{PHONES.primary}</a></dd>
            </div>
            <div>
              <dt className="text-black/55">Other phone lines</dt>
              <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-2 font-sans text-xl font-semibold tabular-nums tracking-normal sm:text-2xl">
                {PHONES.secondary.map((p) => (
                  <a key={p} className="break-words" href={`tel:${p}`}>{p}</a>
                ))}
              </dd>
            </div>
          </dl>
          <ul className="mt-10 flex flex-col gap-3">
            {prompts.map((p) => (
              <li key={p.label}>
                <a
                  href={whatsappLink(p.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 border border-charcoal px-5 py-4 text-sm font-medium transition hover:bg-charcoal hover:text-white"
                >
                  <span className="min-w-0">{p.label}</span>
                  <span aria-hidden="true" className="shrink-0 text-xs">WhatsApp</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-7">
          <h2 className="serif-display text-4xl md:text-5xl">Show us your colour idea</h2>
          <p className="mb-6 mt-3 max-w-md text-sm text-black/65">Sketch a few colours, save your palette, and send it to us on WhatsApp.</p>
          <BrushPad />
        </div>
      </div>
    </div>
  );
}
