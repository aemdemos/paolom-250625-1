/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must have exactly one cell
  const headerRow = ['Tabs (tabs20)'];
  // Each tab row must have two cells: [label, content]
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));
  const tabRows = tabLinks.map(tabLink => {
    let labelElem = tabLink.querySelector('div');
    let label = labelElem ? labelElem.textContent.trim() : tabLink.textContent.trim();
    // Content is unavailable in this menu bar, so keep blank string
    return [label, ''];
  });
  // Build the full array: header row (1 cell), then N rows (2 cells)
  const tableRows = [headerRow, ...tabRows];
  // Use createTable to build table, will make header row with 1 cell, others with 2
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
