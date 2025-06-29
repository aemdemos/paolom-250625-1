/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns15)']; // Single cell header
  // Get all direct child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, put the div itself as the cell content
  const contentRow = columnDivs;
  // Compose table: header (1 col), content row (n cols)
  const tableCells = [
    headerRow, // Header row: exactly one cell
    contentRow // Second row: n cells for columns
  ];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
