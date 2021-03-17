import Link from "next/link";

import path from "path";
import fs from "fs/promises";

export interface HomePageProps {
  products: Array<{ id: string; title: string }>;
}

function HomePage({ products }: HomePageProps) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(): Promise<{
  props: HomePageProps;
  revalidate?: number;
}> {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath, { encoding: "utf8" });
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
