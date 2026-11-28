import { computed } from 'vue';

export function useGithubLanguages(username) {
  const key = `github-languages:${username}`;

  const { data, status, error, refresh } = useFetch('/api/github-languages', {
    key,
    query: { username },
    default: () => [],
    // Browser-only: a slow GitHub must not delay the server-rendered page
    server: false,
    lazy: true,
    dedupe: 'defer',
    transform: (value) => (Array.isArray(value) ? value : []),
  });

  // Keep existing API shape used by components.
  const languages = computed(() => data.value || []);
  // 'idle' covers the server render and the moment before the request starts
  const loading = computed(() => status.value === 'idle' || status.value === 'pending');
  const normalizedError = computed(() => error.value?.message || null);

  return { languages, loading, error: normalizedError, fetchLanguages: refresh };
}
