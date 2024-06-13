export function getContent(block, selector) {
  const element = block.querySelector(selector);
  return element ? element.innerHTML : '';
}

export function isInternalLink(href) {
  return !/^https?:\/\//i.test(href);
}
