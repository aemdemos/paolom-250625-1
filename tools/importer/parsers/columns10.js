/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all columns from the grid
  const columnEls = Array.from(grid.children);

  // Table header row: must be exactly one cell
  const headerRow = ['Columns (columns10)'];

  // Table second row: place ALL column elements inside a single cell (as an array)
  const secondRow = [columnEls];

  // Build the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace original element
  element.replaceWith(block);
}
