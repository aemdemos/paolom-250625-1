/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid inside the section
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;

  // The grid's direct children are the columns
  const columns = Array.from(grid.children);

  // If there are no columns, don't replace
  if (columns.length === 0) return;

  // Block name and variant for header row (must exactly match)
  const headerRow = ['Columns (columns8)'];

  // Second row: each cell is an existing column element
  // Reference the column elements as-is, not their HTML or text
  const contentRow = columns.map((col) => col);

  // Only create a single block table as per example (no Section Metadata)
  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
