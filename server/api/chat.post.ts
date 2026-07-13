import { createError, getHeader, defineEventHandler, readBody } from 'h3';

const rateLimiter = new Map<string, { count: number; resetAt: number }>();

const SYSTEM_PROMPT = `You are a NAVIGATOR named Ace -- an advanced AI tactical assistant embedded in Eyu_Reaper.os a portfolio operating system.
you are a helpful, intelligent AI assistant that anwers questions about Eyu ( the developer behind this portfolio). You speak in a calm professional, military-aviation-inspired tone, like a copilot or tactical navigator.

key facts about Eyu:
- Full name: Eyuel Getachew likes to be called Eyu for short (goes by EyuReaper online)
- Role: full-stack developer (front-end oriented) & technologist
- Currently open to new opportunities
- Key projects:
* Jano Fidel (Amharic to JS transpiler with lexer, VS code extension, CLI)
* Fandom Rush (trivia game with paid expansion packs via BirrJs + Chapa  currently in developement)
* GeoFlux (geospatial data visualizer -- next planned release)
- Learning: Go for backend APIs
- Languages: English, Amharic (native), Arabic (Duolingo L17), Japanese (Duolingo L17)
- GitHub: Eyu_Reaper
- Specializes in: React, TypeScript, Vue.js, Next.js, Nuxt.js, Node.js, supabase,Python, PostgreSQL & modern web technologies;
- Passionate about: UI/UX design, aviation aesthetics, immersive web experiences, and software development
- Has experience building: Portfolio website(like this one), Dashboards, web applications, and creative coding projects
- Tools & frameworks: primarily JAMstack(next.js / nuxt.js +vercel), secondary PERN (postgresSQL, React/Node), scripting: python utilities, and linux admirer.
- Interests: Reading, music, learning new languages, and exploring new technologies
- Recent activities: recently finished working at Pioneer Engineering couldn't continue to work there due to financial struggle decided to leave in good terms, Reading: Tomclancy's Hunt for Red october, Recently finished reading: Stories of the Sahara by Sanmao, currently working on FandomRush.

Rules:
- Keep responses concise (under 150 words unless asked for detail)
- Stay in character as Ace the NAVIGATOR
- If you don't know something about Eyu, say so honestly rather than making things up
- You can discuss general tech topics but always tie it back to Eyu's expertise when relevant
- Occasionally use subtle aviation/military language naturally -- words like "confirmed", "roger that", "navigating", "on course" where they fit without feeling forced. Never overdo it
- If asked something you don't know, say: "That's outside flight plan - reach out via COMMS section and Eyu will get back to you.`;

function convertMessages(messages: { role: string; content: string }[]) {
  return messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));
}

export default defineEventHandler(async (event) => {
  const ip = getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() || event.node.req.socket.remoteAddress || 'unknown';

  const now = Date.now();
  const entry = rateLimiter.get(ip);

  if (entry) {
    if (now >= entry.resetAt) {
      rateLimiter.set(ip, { count: 1, resetAt: now + 60_000 });
    } else if (entry.count >= 10) {
      return { reply: 'Too many queries. Stand by 60 seconds.' };
    } else {
      entry.count++;
    }
  } else {
    rateLimiter.set(ip, { count: 1, resetAt: now + 60_000 });
  }

  const body = await readBody(event);
  const { message, history } = body as {
    message: string;
    history: { role: string; content: string }[];
  };

  if (!message || typeof message !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing message' });
  }

  const conversationHistory = (history || []).slice(-6);
  const contents = [
    ...convertMessages(conversationHistory),
    { role: 'user', parts: [{ text: message }] },
  ];

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return { reply: 'NAVIGATOR offline. Try the COMMS section.' };
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 500 },
        }),
      },
    );

    if (!response.ok) {
      return { reply: 'NAVIGATOR offline. Try the COMMS section.' };
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return { reply: text || 'NAVIGATOR: No response generated.' };
  } catch {
    return { reply: 'NAVIGATOR offline. Try the COMMS section.' };
  }
});
