import Link from "next/link";
import { useRouter } from "next/router";

// import styles from "../styles/NavBar.module.css";

// export default function NavBar() {
//   const router = useRouter();
//   return (
//     <nav>
//       <Link href="/">
//         <a
//           className={`${styles.link} ${router.pathname === "/" ? styles.active:""}`}
//         >
//           Home
//         </a>
//       </Link>
//       <Link href="/about">
//         <a
//           className={[
//             styles.link,
//             router.pathname === "/about" ? styles.active : "",
//           ].join(" ")}
//         >
//           About
//         </a>
//       </Link>
//     </nav>
//   );
// }

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <a className={router.pathname === "/" ? "active" : ""}>Home</a>
      </Link>
      <Link href="/about">
        <a className={router.pathname === "/about" ? "active" : ""}>About</a>
      </Link>

      <style jsx>{`
        nav {
          background-color: #ff6437;
          padding: 5px;
        }
        a {
          margin: 0 5px;
          font-size: 20px;
          text-decoration: none;
        }
        .active {
          color: white;
        }
      `}</style>
    </nav>
  );
}
