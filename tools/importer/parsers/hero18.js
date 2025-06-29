/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as specified
  const headerRow = ['Hero (hero18)'];

  // 2nd row: Background image (none in this HTML)
  const backgroundImageRow = [''];

  // 3rd row: Title (Heading), Subheading (paragraph), Call-to-Action (links)
  // Get grid layout
  const grid = element.querySelector('.w-layout-grid');
  const contentFragments = [];
  if (grid) {
    const children = grid.querySelectorAll(':scope > div');
    // The first child: heading and subheading
    if (children[0]) {
      // Reference all children of the first child (should be h2 and p)
      children[0].childNodes.forEach((node) => {
        if (node.nodeType === 1 && node.textContent && node.textContent.trim()) {
          contentFragments.push(node);
        }
      });
    }
    // The second child: buttons/links
    if (children[1]) {
      children[1].childNodes.forEach((node) => {
        if (node.nodeType === 1 && node.textContent && node.textContent.trim()) {
          contentFragments.push(node);
        }
      });
    }
  }

  const contentRow = [contentFragments];

  const cells = [
    headerRow,
    backgroundImageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
