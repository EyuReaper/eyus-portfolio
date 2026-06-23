export default defineCachedEventHandler(
  async (event) => {
    const { username } = getQuery(event);

    if (!username || typeof username !== 'string') {
      throw createError({ statusCode: 400, statusMessage: 'Missing username' });
    }

    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'eyus-portfolio',
    };

    if (process.env.NUXT_GITHUB_PAT) {
      headers.Authorization = `Bearer ${config.githubPat}`;
    }

    const repos = await $fetch(`https://api.github.com/users/${username}/repos`, {
      query: { per_page: 100, sort: 'updated' },
      headers,
      timeout: 6000,
    });

    const topRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => (b.size || 0) - (a.size || 0))
      .slice(0, 20);

    const languageMaps = await Promise.all(
      topRepos.map((repo) =>
        $fetch(repo.languages_url, {
          headers,
          timeout: 6000,
        }).catch(() => ({})),
      ),
    );

    const totals = {};
    for (const langMap of languageMaps) {
      for (const [name, bytes] of Object.entries(langMap)) {
        totals[name] = (totals[name] || 0) + bytes;
      }
    }

    const grandTotal = Object.values(totals).reduce((sum, value) => sum + value, 0);
    if (!grandTotal) return [];

    return Object.entries(totals)
      .map(([name, bytes]) => ({
        name,
        altitude: Math.round((bytes / grandTotal) * 100),
        bytes,
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8)
      .map(({ name, altitude }) => ({ name, altitude }));
  },
  {
    maxAge: 60 * 30,
    staleMaxAge: 60 * 60 * 4,
  },
);
