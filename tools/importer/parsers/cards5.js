/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const header = ['Cards (cards5)'];
  const rows = [header];

  // Each direct child div is a card container
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((div) => {
    // Find image for the card (required)
    const img = div.querySelector('img');
    // Each card has only image, no text content in HTML
    // Second column should be empty string
    if (img) {
      rows.push([img, '']);
    }
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
