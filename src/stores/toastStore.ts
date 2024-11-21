import { atom } from "nanostores";
import { v4 as uuid } from "uuid";

// Define the structure for toasts
export interface Toast {
  id: string;
  message: string;
  type: string;
}

// Create the atom store for toasts
export const $toastStore = atom<Toast[]>([]);

// Add a toast with automatic removal
export const addToast = (message: string, type: string, duration = 5000) => {
  const id = uuid();
  const newToast = { id, message, type };

  // Update the store with the new toast
  $toastStore.set([...$toastStore.get(), newToast]);

  // Automatically remove the toast after the duration
  setTimeout(() => {
    removeToast(id);
  }, duration);
};

// Remove a specific toast by its ID
export const removeToast = (id: string) => {
  $toastStore.set($toastStore.get().filter((toast) => toast.id !== id));
};

// Clear all toasts
export const clearToasts = () => {
  $toastStore.set([]);
};

export default $toastStore;
