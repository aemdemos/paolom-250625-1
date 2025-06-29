/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we are extracting from the correct structure
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each "slide" is a child of the grid
  const imageWrappers = Array.from(grid.children);
  // Each image is inside its wrapper (can be nested a bit)
  const rows = imageWrappers.map((wrapper) => {
    // Find the first <img> in this wrapper
    const img = wrapper.querySelector('img');
    // Carousel block: 2 columns: [image, (optional) text]
    // In this HTML there is only the image, so the second cell is blank
    return [img, ''];
  });

  // Header row matches the example: "Carousel"
  const headerRow = ['Carousel'];
  // Table structure: header + all slides
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
