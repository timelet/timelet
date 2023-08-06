type PageProps = {
  markdown: string;
};

export function Page({ markdown }: PageProps) {
  return (
    <>
      <section dangerouslySetInnerHTML={{ __html: markdown }}></section>
    </>
  );
}
