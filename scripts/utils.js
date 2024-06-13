export function getContent(block, selector) {
    const element = block.querySelector(selector);
    return element ? element.innerHTML : '';
};
