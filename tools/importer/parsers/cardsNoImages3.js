/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Cards block
  const cells = [['Cards']];
  // Each card is a direct child div (a flex-horizontal)
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Expect last <p> in the card is the description (text for this card)
    const paragraphs = cardDiv.querySelectorAll('p');
    if (paragraphs.length) {
      const para = paragraphs[paragraphs.length - 1];
      cells.push([para]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
