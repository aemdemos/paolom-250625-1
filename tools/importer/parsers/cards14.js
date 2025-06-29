/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards14)'];
  const rows = [];
  // Get all cards (top-level <a> elements)
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach(card => {
    // Find image (first <img> in the first direct child div)
    let img = null;
    const firstDiv = card.querySelector(':scope > div');
    if (firstDiv) {
      img = firstDiv.querySelector('img');
    }
    // Text content: collect tag/date (meta) + heading
    const contentParts = [];
    const metaRow = card.querySelector('.flex-horizontal');
    if (metaRow) contentParts.push(metaRow);
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) contentParts.push(heading);
    // If nothing found, insert empty string
    if (contentParts.length === 0) contentParts.push('');
    rows.push([img || '', contentParts]);
  });
  const tableRows = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
