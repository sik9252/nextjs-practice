import Link from "next/link";
import { useState, useEffect } from "react";

import Seo from "../components/Seo";

export default function Home() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    // async가 익명 함수로 작성 되었고(재사용 불가)
    // 익명 함수는 즉시 실행해야 하기 때문에 맨 마지막에 ()가 있는 것 => 바로 호출
    (async () => {
      const { results } = await (await fetch(`api/movies`)).json();
      setMovies(results);
    })();
  }, []);

  return (
    <div className="container">
      <Seo title="Home" />
      {movies?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
