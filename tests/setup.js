import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import { ref } from 'vue';

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
    languages: ref([]),
    loading: ref(false),
    error: ref(null),
  }),
}));

