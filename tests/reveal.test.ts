/**
 * Unit tests for the reveal observer utilities.
 */

// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  getRevealTargets,
  initReveal,
  revealElements,
  REVEAL_SELECTOR,
  REVEAL_VISIBLE_CLASS
} from '../src/lib/reveal';

interface MockEntry {
  isIntersecting: boolean;
  target: Element;
}

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  trigger(entries: MockEntry[]): void {
    this.callback(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
  }
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('getRevealTargets', () => {
  it('collects targets with the reveal selector', () => {
    document.body.innerHTML = `
      <section data-reveal></section>
      <div></div>
      <article data-reveal></article>
    `;

    const targets = getRevealTargets();

    expect(targets).toHaveLength(2);
    targets.forEach((target) => {
      expect(target.matches(REVEAL_SELECTOR)).toBe(true);
    });
  });
});

describe('revealElements', () => {
  it('adds the visible class to each target', () => {
    document.body.innerHTML = `
      <section data-reveal></section>
      <article data-reveal></article>
    `;

    const targets = getRevealTargets();
    revealElements(targets);

    targets.forEach((target) => {
      expect(target.classList.contains(REVEAL_VISIBLE_CLASS)).toBe(true);
    });
  });
});

describe('initReveal', () => {
  it('observes targets and reveals them on intersection', () => {
    document.body.innerHTML = `
      <section data-reveal></section>
      <article data-reveal></article>
    `;

    const observerFactory = vi.fn(
      (callback: IntersectionObserverCallback) =>
        new MockIntersectionObserver(callback) as unknown as IntersectionObserver
    );

    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: MockIntersectionObserver
    });

    const observer = initReveal({}, observerFactory);

    expect(observerFactory).toHaveBeenCalledTimes(1);
    expect(observer).not.toBeNull();

    const [firstResult] = observerFactory.mock.results;
    if (!firstResult) {
      throw new Error('Observer factory did not return a result.');
    }
    const createdObserver = firstResult.value as unknown as MockIntersectionObserver;
    const targets = getRevealTargets();

    targets.forEach((target) => {
      expect(createdObserver.observe).toHaveBeenCalledWith(target);
    });

    createdObserver.trigger(
      targets.map((target) => ({
        isIntersecting: true,
        target
      }))
    );

    targets.forEach((target) => {
      expect(target.classList.contains(REVEAL_VISIBLE_CLASS)).toBe(true);
      expect(createdObserver.unobserve).toHaveBeenCalledWith(target);
    });
  });

  it('reveals all targets when IntersectionObserver is unavailable', () => {
    document.body.innerHTML = `
      <section data-reveal></section>
      <article data-reveal></article>
    `;

    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: undefined
    });

    initReveal();

    const targets = getRevealTargets();
    targets.forEach((target) => {
      expect(target.classList.contains(REVEAL_VISIBLE_CLASS)).toBe(true);
    });
  });
});
