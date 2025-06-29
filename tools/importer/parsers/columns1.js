/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid as columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row must be a single cell with the block name
  const headerRow = ['Columns (columns1)'];
  // The content row has as many cells as there are columns
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
