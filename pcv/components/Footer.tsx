import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return(
        <footer className="bg-red-950 text-white relative bottom-0 left-0 right-0 p-8 shadow-md z-20 px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Image src="/logo_169.png" alt="logo" width={200} height={100} />
          <p>La mejor pintureria del pais</p>
        </div>
        <ul>
          <li className="border-b border-zinc-300 pb-1">
            <h4>enlaces rapidos</h4>
          </li>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/products">Productos</Link>
          </li>
          <li>
            <Link href="/contact">Contacto</Link>
          </li>
          <li>
            <Link href="/aboutUs">Sobre Nosotros</Link>
          </li>
          <li>
            <Link href="/FAQ">Preguntas Frecuentes</Link>
          </li>
          <li>
            <Link href="/terms">Terminos y Condiciones</Link>
          </li>
        </ul>
        <div>
          <h4 className="border-b border-zinc-300 pb-1">Contacto</h4>
          <p>Email: info@pintureriacascoviejo.com</p>
          <p>Telefono: 123-456-7890</p>
          <p>Direccion: Calle Falsa 123, Ciudad, País</p>
        </div>
      </footer>
    )
}