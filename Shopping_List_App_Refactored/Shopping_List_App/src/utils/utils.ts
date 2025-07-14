// src/utils/domUtils.ts

export function getElementByIdOrThrow<T extends HTMLElement>(
  id: string
): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with ID "${id}" not found in the DOM.`);
  }
  return element as T;
}
