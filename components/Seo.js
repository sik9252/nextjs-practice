import Head from "next/head";

function Seo({ title }) {
  return (
    <div>
      <Head>
        <title>{`${title} | Next Movies`}</title>
      </Head>
    </div>
  );
}

export default Seo;
