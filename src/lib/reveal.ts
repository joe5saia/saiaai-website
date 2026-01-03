/**
 * Utilities to reveal elements on scroll using IntersectionObserver.
 */

export const REVEAL_SELECTOR = '[data-reveal]';
export const REVEAL_VISIBLE_CLASS = 'is-visible';

const DEFAULT_OPTIONS: IntersectionObserverInit = {
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.15
};

export type RevealObserverFactory = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => IntersectionObserver;

/**
 * Collects reveal targets within a root node.
 */
export const getRevealTargets = (root: ParentNode = document): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

/**
 * Forces a set of elements into the visible state.
 */
export const revealElements = (targets: Iterable<HTMLElement>): void => {
  for (const target of targets) {
    target.classList.add(REVEAL_VISIBLE_CLASS);
  }
};

/**
 * Initializes the observer and attaches it to all reveal targets.
 */
export const initReveal = (
  options: IntersectionObserverInit = {},
  observerFactory: RevealObserverFactory =
    (callback, observerOptions) => new IntersectionObserver(callback, observerOptions)
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const targets = getRevealTargets();

  if (targets.length === 0) {
    return null;
  }

  if (typeof window.IntersectionObserver === 'undefined') {
    revealElements(targets);
    return null;
  }

  const observer = observerFactory(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const target = entry.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }

        target.classList.add(REVEAL_VISIBLE_CLASS);
        currentObserver.unobserve(target);
      });
    },
    {
      ...DEFAULT_OPTIONS,
      ...options
    }
  );

  targets.forEach((target) => observer.observe(target));

  return observer;
};
