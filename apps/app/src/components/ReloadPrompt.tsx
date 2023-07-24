import { Button, Dialog, Text, useDisclosure } from "@timelet/ui";
import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const [opened, { open: openDialog, close: closeDialog }] = useDisclosure(false);

  const close = () => {
    setNeedRefresh(false);
    closeDialog();
  };

  useEffect(() => {
    if (!needRefresh) {
      openDialog();
    }
  }, [needRefresh]);

  return (
    <Dialog opened={opened}>
      <Text>A new version of Timelet is available.</Text>
      {needRefresh && <Button onClick={() => updateServiceWorker(true)}>Update</Button>}
      <Button onClick={() => close()}>Ignore</Button>
    </Dialog>
  );
}
