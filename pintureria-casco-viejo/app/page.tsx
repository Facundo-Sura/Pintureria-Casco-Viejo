import Image from "next/image";
import Link from "next/link";

const table = [
  {
    text: "Producto"
  },
  {
    text: "Precio"
  },
  {
    text: "Stock"
  },
  {
    text: "Marca"
  },
  {
    text: "Categoria"
  }
]

export default function Home() {
  return (
      <main>
        <table className="w-full">
          <thead>
            <tr>
              {table.map((item) => (
                <th key={item.text} className="bg-gray-50 rounded-md text-sm font-medium p-3">
                  {item.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
            </tr>
          </tbody>
        </table>
      </main>
  );
}
