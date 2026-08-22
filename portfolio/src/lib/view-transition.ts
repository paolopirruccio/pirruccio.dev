type Listener = (active: boolean) => void;
const listeners = new Set<Listener>();

export function onTransitionChange(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function announceTransition(active: boolean) {
  listeners.forEach((listener) => listener(active));
}
