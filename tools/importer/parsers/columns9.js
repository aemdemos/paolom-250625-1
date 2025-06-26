/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The block header row must match exactly: 'Columns (columns9)'
  const headerRow = ['Columns (columns9)'];

  // The requirements specify that the header row is a single cell,
  // and the next row contains multiple columns/cells (one per logical column)
  // For the footer, this is correct: header row is one cell, next row is N cells (columns)
  const contentRow = columns;

  // Compose the table
  const rows = [headerRow, contentRow];

  // Create the block table using the WebImporter helper
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
