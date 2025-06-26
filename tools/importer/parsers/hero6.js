/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active (visible) tab pane
  const activePane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activePane) return;

  // Grab the content grid inside the pane
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get first and second grid cells (image and text-content blocks)
  const gridChildren = Array.from(grid.children);
  let heroImg = null;
  if (gridChildren[0]) {
    heroImg = gridChildren[0].querySelector('img');
  }

  // Gather all text elements and inline content from the second cell
  let textContent = [];
  if (gridChildren[1]) {
    // Collect all direct children (including text and elements)
    const nodes = Array.from(gridChildren[1].childNodes).filter(n => {
      // Element nodes or text nodes with non-whitespace
      return n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    });
    nodes.forEach(n => {
      if (n.nodeType === Node.ELEMENT_NODE) {
        textContent.push(n);
      } else if (n.nodeType === Node.TEXT_NODE) {
        // Wrap text node in <span>
        const span = document.createElement('span');
        span.textContent = n.textContent;
        textContent.push(span);
      }
    });
  }

  // The table must have exactly the same structure as the markdown example: header, image, text
  const tableRows = [
    ['Hero'],
    [heroImg ? heroImg : ''],
    [textContent.length ? textContent : '']
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
