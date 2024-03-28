export function Page({ is404 }: { is404: boolean }) {
  if (is404) {
    return (
      <section>
        <h1>404 Page Not Found</h1>
        <p>This page could not be found.</p>
      </section>
    );
  } else {
    return (
      <section>
        <h1>500 Internal Server Error</h1>
        <p>Something went wrong.</p>
      </section>
    );
  }
}
