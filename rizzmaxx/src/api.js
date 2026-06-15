const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions';

export async function callClaude({ system, messages }) {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;
  if (!apiKey) throw new Error('Missing REACT_APP_GROQ_API_KEY in .env');

  // Convert Anthropic-style messages to OpenAI-style (Groq is OpenAI-compatible)
  // Image messages need special handling - extract text only for non-vision or use llama-vision
  const hasImage = messages.some(m =>
    Array.isArray(m.content) && m.content.some(c => c.type === 'image')
  );

  const model = hasImage ? 'meta-llama/llama-4-scout-17b-16e-instruct' : 'llama-3.3-70b-versatile';

  const formattedMessages = [
    { role: 'system', content: system },
    ...messages.map(m => {
      if (Array.isArray(m.content)) {
        const parts = m.content.map(c => {
          if (c.type === 'text') return { type: 'text', text: c.text };
          if (c.type === 'image') return {
            type: 'image_url',
            image_url: { url: `data:${c.source.media_type};base64,${c.source.data}` }
          };
          return null;
        }).filter(Boolean);
        return { role: m.role, content: parts };
      }
      return { role: m.role, content: m.content };
    })
  ];

  const res = await fetch(GROQ_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      messages: formattedMessages,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'API error');
  }

  const data = await res.json();
  return data.choices[0]?.message?.content || '';
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
