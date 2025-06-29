/* global WebImporter */
export default function parse(element, { document }) {
  // Get all tab link elements (direct children)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Each tab row: label (text) in the first cell, empty string for content (since content not present in this navigation-only HTML)
  const rows = tabLinks.map(a => {
    let label = '';
    // Prefer inner div's text, fallback to link text
    const div = a.querySelector('div');
    if (div && div.textContent) {
      label = div.textContent.trim();
    } else {
      label = a.textContent.trim();
    }
    return [label, ''];
  });

  // Compose the table cells: header is a single cell, content rows have two cells
  const cells = [
    ['Tabs (tabs13)'], // header row: single column
    ...rows // data rows: two columns (label, content)
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
