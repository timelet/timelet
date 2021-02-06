import { Subscription } from 'rxjs';

/* eslint-disable import/prefer-default-export */
export const createSubscriptionEffect = (subscribe: () => Subscription | undefined) => () => {
  const subscription = subscribe();

  return function cleanUp() {
    subscription?.unsubscribe();
  };
};
