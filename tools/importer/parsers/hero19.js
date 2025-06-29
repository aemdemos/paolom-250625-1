/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane (the content currently visible)
  const activePane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activePane) return;

  // Grab the grid within the active tab pane
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the image from the grid (first img)
  const img = grid.querySelector('img');

  // Collect all non-image, non-empty elements for text content
  const textElements = Array.from(grid.children).filter(child => {
    // Exclude images
    if (child.tagName.toLowerCase() === 'img') return false;
    // Exclude empty elements
    return child.textContent && child.textContent.trim().length > 0;
  });

  // Always include all text elements as an array in the third cell, even if length === 1
  const textContentCell = textElements.length > 0 ? textElements : '';

  const cells = [
    ['Hero (hero19)'],
    [img ? img : ''],
    [textContentCell],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
