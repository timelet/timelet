import { Subscription } from 'rxjs';

/* eslint-disable import/prefer-default-export */
export const createSubscriptionEffect = (subscribe: () => Promise<Subscription | undefined> | Subscription | undefined) => {
  let subscription: Subscription | undefined;

  Promise.resolve(subscribe()).then((sub) => {
    subscription = sub;
  });

  return function cleanUp() {
    subscription?.unsubscribe();
  };
};
