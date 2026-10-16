type ClientStageEvent = {
  contactId: string;
  strategicServicesStage: string | null;
  updatedAt: string;
};

const subscribers = new Map<string, Set<(event: ClientStageEvent) => void>>();

export function subscribeToClientStageUpdates(contactId: string, onUpdate: (event: ClientStageEvent) => void) {
  const key = String(contactId);
  const listeners = subscribers.get(key) ?? new Set();
  listeners.add(onUpdate);
  subscribers.set(key, listeners);

  return () => {
    const nextListeners = subscribers.get(key);

    if (!nextListeners) {
      return;
    }

    nextListeners.delete(onUpdate);

    if (nextListeners.size === 0) {
      subscribers.delete(key);
    }
  };
}

export function notifyClientStageUpdate(contactId: string, strategicServicesStage: string | null) {
  const key = String(contactId);
  const listeners = subscribers.get(key);

  if (!listeners || listeners.size === 0) {
    return;
  }

  const event: ClientStageEvent = {
    contactId: key,
    strategicServicesStage,
    updatedAt: new Date().toISOString(),
  };

  for (const listener of listeners) {
    listener(event);
  }
}
