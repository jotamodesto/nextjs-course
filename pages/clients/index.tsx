import Link from "next/link";

function ClientsPage() {
  const clients = [
    { id: "john", name: "Johnatan" },
    { id: "mod", name: "Modesto" },
  ];

  return (
    <div>
      <h1>Clients page</h1>
      <ul>
        {clients.map(cli => (
          <li key={cli.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: cli.id },
              }}
            >
              {cli.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
