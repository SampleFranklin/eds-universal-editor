import { sanitizeHtml } from '../../scripts/utils.js';

export class CTA {
  constructor(linkEl,textEl,targetEl,className) {
    this.linkEl = linkEl;
    this.textEl = textEl;
    this.targetEl = targetEl;
    this.className= className;
    this.getLink();
  }

  getLink() {
    let link = this.linkEl?.querySelector('.button-container a');
    console.log(link)
    const target = this.targetEl?.textContent?.trim() || '_self';
    console.log(target)
    link?.setAttribute('target', target);
    return this.getLinkText(link);
    }

  getLinkText(link){
    const text = this.textEl?.textContent?.trim() || '';
    link?.classList.add(this.className);
    if(link){
    link.innerHTML = '';
    link.insertAdjacentHTML('beforeend', sanitizeHtml(text));
    }
    return link;
  }
}
