import { ref } from 'vue';
// No need to import useRuntimeConfig here anymore for PAT, it's used in the API route

export function useGithubLanguages(username) {
  const languages = ref([]);
  const loading = ref(true);
  const error = ref(null);
  // Removed direct PAT access

  const fetchLanguages = async () => {
    loading.value = true;
    error.value = null;
    try {
      // Call the local API route
      const response = await $fetch(`/api/github-languages?username=${username}`);

      languages.value = response;

    } catch (e) {
      error.value = e.message;
      console.error('Error fetching GitHub languages:', e);
      // Fallback in case API route fails
      languages.value = [
        { name: 'Error', altitude: 50 },
        { name: 'Loading', altitude: 30 }
      ];
    } finally {
      loading.value = false;
    }
  };

  fetchLanguages(); // Execute on composable creation

  return { languages, loading, error, fetchLanguages };
}