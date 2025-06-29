/* global WebImporter */
export default function parse(element, { document }) {
  // Get the direct children of the grid: each should be a column
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // The content of each column is the content of its only child (img), or else the div itself
  const row = columns.map((col) => {
    // if the column holds exactly one img as direct child, just use the img
    if (
      col.childElementCount === 1 &&
      col.firstElementChild &&
      col.firstElementChild.tagName === 'IMG'
    ) {
      return col.firstElementChild;
    }
    // fallback: use the div as is
    return col;
  });
  // Table header as per specification
  const header = ['Columns (columns9)'];
  const table = WebImporter.DOMUtils.createTable([
    header,
    row,
  ], document);
  element.replaceWith(table);
}
