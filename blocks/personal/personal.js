export default function decorate(block) {
  const [quoteWrapper] = block.children;

  console.log([quoteWrapper]);
  console.log("inside personal");
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quoteWrapper.textContent.trim();
  quoteWrapper.replaceChildren(blockquote);
}