export default function decorate(block) {
  // Destructure the block children into title, subtitle, tabs container, and other items
  const [titleEl, subtitleEl, dealershipActivitiesTab, ...dealershipActivitiesItemEl] = block.children;

  // Extract title from heading tags if present
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';

  // Extract subtitle text and trim any extra whitespace
  const subtitle = subtitleEl?.textContent?.trim() || '';

  // Function to create and extract dealership activity tabs
  const extractDealershipActivityTabs = (tabContainer) => {
    // Ensure tabContainer is not null and has children
    if (!tabContainer) return [];

    // Extract tab elements from the tab container
    const tabs = tabContainer.children;

    // Map over the tab elements to create an array of tab data
    return Array.from(tabs).map((tabEl, index) => {
      // Extract tab name or use a default value
      const tabName = tabEl?.textContent?.trim() || `Tab ${index + 1}`;
      return {
        index,
        tabName,
        element: tabEl
      };
    });
  }

  // Extract tabs using the function
  const tabsArray = extractDealershipActivityTabs(dealershipActivitiesTab);

  // Optional: Highlight the first tab by default and set up hover effects
  if (tabsArray.length > 0) {
    // Highlight the first tab by default
    tabsArray[0].element.classList.add('highlighted');

    // Add hover effect to highlight tabs
    tabsArray.forEach(tab => {
      tab.element.addEventListener('mouseover', () => {
        tabsArray.forEach(t => t.element.classList.remove('highlighted'));
        tab.element.classList.add('highlighted');
      });
    });
  }

  // You can use tabsArray for further processing or rendering as needed
  console.log(tabsArray);
}
