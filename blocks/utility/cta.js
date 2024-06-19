import { sanitizeHtml } from '../../scripts/utils.js';

class CTA {
  constructor(linkEl, textEl, targetEl, className) {
    this.linkEl = linkEl;
    this.textEl = textEl;
    this.targetEl = targetEl;
    this.className = className;
    this.getLink();
  }

  getLink() {
    const link = this.linkEl?.querySelector('.button-container a');
    const target = this.targetEl?.textContent?.trim() || '_self';
    link?.setAttribute('target', target);
    return this.getLinkText(link);
  }

  getLinkText(link) {
    const text = this.textEl?.textContent?.trim() || '';
    if (link) {
      link.innerHTML = '';
      link.insertAdjacentHTML('beforeend', sanitizeHtml(text));
      if (this.className && link) {
        link.classList.add(this.className);
      }
    }
    return link;
  }
}
export default CTA;
