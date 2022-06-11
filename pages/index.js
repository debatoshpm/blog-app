import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../components/BlogCard";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl4a02uic1q8x01xuag3o8uv2/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      slug
      coverPhoto {
        id
        url
      }
      content {
        html
      }
      date
      author {
        name
        avatar {
          url
        }
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {posts.map((post) => {
          return (
            <BlogCard
              title={post.title}
              author={post.author}
              coverPhoto={post.coverPhoto}
              key={post.id}
              date={post.date}
              slug={post.slug}
            />
          );
        })}
      </main>
    </div>
  );
}
