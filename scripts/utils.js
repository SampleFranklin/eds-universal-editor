export function getContent(block, selector) {
  const element = block.querySelector(selector);
  return element ? element.innerHTML : '';
}

export function isInternalLink(href) {
  return !/^https?:\/\//i.test(href);
}

export function sanitizeHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.innerHTML;
}