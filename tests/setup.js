import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import * as Vue from 'vue';

config.global.stubs['font-awesome-icon'] = {
  template: '<span />',
};
config.global.stubs['client-only'] = {
  template: '<span />',
};

// Mock $fetch
global.$fetch = vi.fn(() => Promise.resolve({}));

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

vi.mock('~/composables/useGithubLanguages', () => ({
  useGithubLanguages: () => ({
    languages: Vue.ref([]),
    loading: Vue.ref(false),
    error: Vue.ref(null),
  }),
}));

// Nuxt auto-import mocks for vitest (Nuxt's auto-import plugin isn't active)
globalThis.__useAsyncData = vi.fn(() => ({
  data: Vue.ref({ repos: 10, stars: 42 }),
  pending: Vue.ref(false),
  error: Vue.ref(null),
  refresh: vi.fn(),
}));
globalThis.__computed = Vue.computed;
globalThis.__onUnmounted = Vue.onUnmounted;
globalThis.__$fetch = vi.fn(() => Promise.resolve({}));

