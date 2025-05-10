import globalState from '@/globalstate/page';

export function increaseLoader() {
  globalState.activeApiCount += 1;
  globalState.isLoader = true;
}

export function decreaseLoader() {
  globalState.activeApiCount = Math.max(globalState.activeApiCount - 1, 0);
  if (globalState.activeApiCount === 0) {
    globalState.isLoader = false;
  }
}