/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Columns (columns5)'];

  // Get all immediate child <a> elements (each represents one column cell)
  const cols = Array.from(element.querySelectorAll(':scope > a'));
  if (cols.length === 0) return;

  // Gather the content for each cell (prefer the inner <div>, else the <a> itself)
  const cellContents = cols.map(col => {
    const directDiv = col.querySelector(':scope > div');
    return directDiv || col;
  });

  // Split into rows of 2 cells each to match a 2x2 grid
  const rows = [];
  for (let i = 0; i < cellContents.length; i += 2) {
    rows.push([cellContents[i], cellContents[i + 1] || '']);
  }

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
