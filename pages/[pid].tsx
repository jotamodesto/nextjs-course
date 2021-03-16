import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import fs from "fs/promises";

export interface ProductDetailProps {
  product: { id: string; title: string; description: string };
}

function ProductDetailPage({ product }: ProductDetailProps) {
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export default ProductDetailPage;

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath, { encoding: "utf8" });
  const data = JSON.parse(jsonData);

  return data;
}

export const getStaticProps: GetStaticProps<ProductDetailProps> = async context => {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();
  const product = data.products.find(product => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map(product => product.id);
  const pathsWithParams = ids.map(id => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};
