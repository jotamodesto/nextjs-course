import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Sale {
  id: string;
  username: string;
  volume: number;
}

export interface LastSalesProps {
  sales: Sale[];
}

function LastSalesPage(props: LastSalesProps) {
  const [sales, setSales] = useState<Sale[] | undefined>(props.sales);

  const { data, error } = useSWR(
    "https://nextjs-course-16633-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales: Sale[] = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: +data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     async function fetchSales() {
  //       //   setLoading(true);
  //       const response = await fetch(
  //         "https://nextjs-course-16633-default-rtdb.firebaseio.com/sales.json"
  //       );
  //       const data = await response.json();

  //       const transformedSales: Sale[] = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: +data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setLoading(false);
  //     }

  //     fetchSales();
  //   }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) return <p>Loading...</p>;

  return (
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;

export const getStaticProps: GetStaticProps<LastSalesProps> = async () => {
  const response = await fetch(
    "https://nextjs-course-16633-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales: Sale[] = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: +data[key].volume,
    });
  }

  return { props: { sales: transformedSales } };
};
