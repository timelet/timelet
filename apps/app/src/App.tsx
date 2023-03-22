import { Button, Logo } from "@timelet/ui";
import { DefaultLayout } from "./layouts/DefaultLayout";

function App() {
  return (
    <DefaultLayout>
      <Logo />
      <Button>Joho</Button>
    </DefaultLayout>
  );
}

export default App;
