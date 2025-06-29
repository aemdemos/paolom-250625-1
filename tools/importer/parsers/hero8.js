/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane (either .w--tab-active or default to first)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  let activePane = tabPanes[0];
  for (const pane of tabPanes) {
    if (pane.classList.contains('w--tab-active')) {
      activePane = pane;
      break;
    }
  }

  // The content is inside the grid layout within the tab
  const grid = activePane.querySelector('.w-layout-grid');

  // Defensive: If no grid, fallback to all content in activePane
  const contentParent = grid || activePane;
  const children = Array.from(contentParent.children);

  // Separate all images from other content
  const images = children.filter(el => el.tagName && el.tagName.toLowerCase() === 'img');
  const nonImages = children.filter(el => !el.tagName || el.tagName.toLowerCase() !== 'img');

  // Combine all non-image content as a single cell (preserving structure)
  // If there is no non-image content, cell will be empty string
  const nonImageCell = nonImages.length === 1 ? nonImages[0] : (nonImages.length > 1 ? nonImages : '');
  // Images as an array if more than one, or element, or empty string
  const imageCell = images.length === 1 ? images[0] : (images.length > 1 ? images : '');

  const rows = [
    ['Hero (hero8)'],
    [imageCell],
    [nonImageCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
