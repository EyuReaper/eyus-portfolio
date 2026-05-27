import { computed } from 'vue';

export function useGithubLanguages(username) {
  const key = `github-languages:${username}`;

  const { data, pending, error, refresh } = useFetch('/api/github-languages', {
    key,
    query: { username },
    default: () => [],
    server: true,
    lazy: false,
    dedupe: 'defer',
    transform: (value) => (Array.isArray(value) ? value : []),
  });

  // Keep existing API shape used by components.
  const languages = computed(() => data.value || []);
  const loading = computed(() => pending.value);
  const normalizedError = computed(() => error.value?.message || null);

  return { languages, loading, error: normalizedError, fetchLanguages: refresh };
}
