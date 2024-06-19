import { sanitizeHtml } from '../../scripts/utils.js';

class CTA {
  static getLink(linkEl, textEl, targetEl, className) {
    const link = linkEl?.querySelector('.button-container a');
    const target = targetEl?.textContent?.trim() || '_self';
    link?.setAttribute('target', target);
    return this.getLinkText(link, textEl, className);
  }

  static getLinkText(link, textEl, className) {
    const text = textEl?.textContent?.trim() || '';
    if (link) {
      link.innerHTML = '';
      link.insertAdjacentHTML('beforeend', sanitizeHtml(text));
      if (className && link) {
        link.classList.add(className);
      }
    }
    return link;
  }
}
export default CTA;
