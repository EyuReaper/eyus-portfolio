import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export function useGithubLanguages(username) {
  const languages = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const runtimeConfig = useRuntimeConfig();
  const githubPat = runtimeConfig.public.githubPat;

  const fetchLanguages = async () => {
    loading.value = true;
    error.value = null;
    try {
      if (!githubPat) {
        throw new Error('GitHub PAT not configured. Please set NUXT_GITHUB_PAT in your .env file.');
      }

      // Fetch user's public repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: {
          Authorization: `token ${githubPat}`,
        },
      });

      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.statusText}`);
      }
      const repos = await reposResponse.json();

      const languageCounts = {};
      let totalBytes = 0;

      // Fetch languages for each repository
      for (const repo of repos) {
        if (repo.fork) continue; // Skip forked repositories

        const langResponse = await fetch(repo.languages_url, {
          headers: {
            Authorization: `token ${githubPat}`,
          },
        });
        if (!langResponse.ok) {
          console.warn(`Could not fetch languages for ${repo.name}: ${langResponse.statusText}`);
          continue;
        }
        const repoLanguages = await langResponse.json();

        for (const lang in repoLanguages) {
          if (Object.prototype.hasOwnProperty.call(repoLanguages, lang)) {
            languageCounts[lang] = (languageCounts[lang] || 0) + repoLanguages[lang];
            totalBytes += repoLanguages[lang];
          }
        }
      }

      // Calculate percentages and format for TechAltitude
      const formattedLanguages = Object.entries(languageCounts)
        .map(([name, bytes]) => ({
          name,
          altitude: parseFloat(((bytes / totalBytes) * 100).toFixed(2)),
          bytes,
        }))
        .sort((a, b) => b.altitude - a.altitude); // Sort by highest percentage first

      languages.value = formattedLanguages;

    } catch (e) {
      error.value = e.message;
      console.error('Error fetching GitHub languages:', e);
    } finally {
      loading.value = false;
    }
  };

  fetchLanguages(); // Execute on composable creation

  return { languages, loading, error, fetchLanguages };
}