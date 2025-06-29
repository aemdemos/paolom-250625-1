/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header
  const rows = [['Cards']];

  // Each card is a direct child div
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // The content is a <p> with the card text
    const p = cardDiv.querySelector('p');
    // Only add if the card has text content
    if (p && p.textContent.trim()) {
      rows.push([p]);
    }
  });

  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
