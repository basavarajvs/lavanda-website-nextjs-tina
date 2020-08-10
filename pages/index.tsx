import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { GetStaticProps } from "next";
import { usePlugin } from "tinacms";
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from "react-tinacms-github";
import {
  InlineForm,
  InlineTextField,
  InlineTextarea,
} from "react-tinacms-inline";
import { InlineWysiwyg } from "react-tinacms-editor";
import ReactMarkdown from "react-markdown";

export default function Home({ file }) {
  const formOptions = {
    label: "Home Page",
    fields: [
      { name: "title", component: "text" },
      { name: "description", component: "textarea" },
    ],
  };

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);

  useGithubToolbarPlugins();

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InlineForm form={form}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <InlineTextField name="title" />
          </h1>

          <InlineWysiwyg name="description" format="html">
            <ReactMarkdown source={data.description} />
          </InlineWysiwyg>
        </main>
      </InlineForm>
      <footer className={styles.footer}>
        <p>Footer</p>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/home.json",
        data: (await import("../content/home.json")).default,
      },
    },
  };
};
