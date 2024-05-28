export default function decorate(block) {
    const ul = document.createElement('ul');
    [...block.children].forEach((row) => {
        const li = document.createElement('li');
        li.append(row);
        ul.append(li);
    });
    block.innerHTML = '';
    block.append(ul);
}