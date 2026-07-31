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
      headers.Authorization = `Bearer ${process.env.NUXT_GITHUB_PAT}`;
    }

    try {
      const [user, repos] = await Promise.all([
        $fetch(`https://api.github.com/users/${username}`, { headers, timeout: 6000 }),
        $fetch(`https://api.github.com/users/${username}/repos`, {
          query: { per_page: 100 },
          headers,
          timeout: 6000,
        }),
      ]);

      return {
        repos: user.public_repos,
        stars: repos.reduce((acc, repo) => acc + repo.stargazers_count, 0),
      };
    } catch {
      throw createError({ statusCode: 502, statusMessage: 'Failed to fetch GitHub stats' });
    }
  },
  {
    maxAge: 60 * 30,
    staleMaxAge: 60 * 60 * 4,
  },
);
