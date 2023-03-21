import { Button, Group, Header, Logo } from "@timelet/ui";

export default function DefaultHeader() {
  return (
    <Header height={60} p="xs">
      <Logo />
      <Group>
        <Button>Eins</Button>
      </Group>
    </Header>
  );
}
