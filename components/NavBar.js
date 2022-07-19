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
      <img src="/vercel.svg" />
      <div>
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : ""}>Home</a>
        </Link>
        <Link href="/about">
          <a className={router.pathname === "/about" ? "active" : ""}>About</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.5) 0px 30px 70px -15px,
            rgba(0, 0, 0, 0.3) 0px 30px 50px -20px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
