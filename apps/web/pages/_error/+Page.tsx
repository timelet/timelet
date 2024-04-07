import { Title } from "@timelet/ui";

export function Page({ is404 }: { is404: boolean }) {
  if (is404) {
    return (
      <section>
        <Title>404 Page Not Found</Title>
        <p>This page could not be found.</p>
      </section>
    );
  } else {
    return (
      <section>
        <Title>500 Internal Server Error</Title>
        <p>Something went wrong.</p>
      </section>
    );
  }
}
