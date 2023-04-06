import { Subscription } from "rxjs";

type SubscriptionHandler = Subscription | undefined;

export const createSubscriptionHandler = (subscribe: () => Promise<SubscriptionHandler> | SubscriptionHandler) => {
  let subscription: SubscriptionHandler;

  Promise.resolve(subscribe()).then((sub) => {
    subscription = sub;
  });

  return function cleanUp() {
    subscription?.unsubscribe();
  };
};
