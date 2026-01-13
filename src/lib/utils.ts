/**
 * Decode HTML entities in text
 * Converts entities like &#39; to their actual characters
 * Works in both server-side and client-side contexts
 */
export function decodeHtmlEntities(text: string): string {
  // Common HTML entities map
  const entityMap: Record<string, string> = {
    '&#39;': "'",
    '&apos;': "'",
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
  };

  let decoded = text;
  
  // Replace numeric entities (&#39;, &#8217;, etc.)
  decoded = decoded.replace(/&#(\d+);/g, (match, code) => {
    return String.fromCharCode(parseInt(code, 10));
  });
  
  // Replace named entities (&apos;, &quot;, etc.)
  Object.entries(entityMap).forEach(([entity, char]) => {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  });
  
  return decoded;
}
