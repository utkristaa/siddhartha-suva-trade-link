import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = { title: "Products | Siddhartha Suva Trade Link" };

const layout = [
  "md:col-span-7",
  "md:col-span-5 md:mt-24",
  "md:col-span-5",
  "md:col-span-7 md:mt-20",
  "md:col-span-6",
  "md:col-span-6 md:mt-16",
];

export default function ProductsPage() {
  return (
    <div className="px-6 pb-32 pt-36">
      <div className="mx-auto max-w-7xl">
        <h1 className="serif-display text-[clamp(3.4rem,11vw,10rem)]">Flagship buckets</h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-black/65">Genuine Berger and Asian Paints, chosen for how they look on the wall and how long they last. Tap a bucket to inquire on WhatsApp.</p>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-12">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} className={layout[i % layout.length]} />
          ))}
        </div>
      </div>
    </div>
  );
}
