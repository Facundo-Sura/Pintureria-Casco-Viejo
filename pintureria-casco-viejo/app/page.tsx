import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <main>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Producto 1</td>
              <td className="border border-gray-300 px-4 py-2">$100</td>
            </tr>
          </tbody>
        </table>
      </main>
  );
}
