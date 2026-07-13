export default defineEventHandler(() => {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  return { connected: !!apiKey && apiKey.length > 10 };
});
