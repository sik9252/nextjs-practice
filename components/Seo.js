import Head from "next/head";

function Seo({ title }) {
  return (
    <Head>
      <title>{`${title} | Next Movies`}</title>
    </Head>
  );
}

export default Seo;
