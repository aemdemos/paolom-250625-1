/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards3)'];

  // Get all immediate child card links
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build a table row for each card: [image, text content]
  const rows = cards.map(card => {
    // Get the image element (first img descendant of .utility-aspect-3x2)
    let image = null;
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    if (imgContainer) {
      image = imgContainer.querySelector('img');
    }

    // Text content: assemble all relevant pieces in order, preserve HTML semantics, reference existing elements
    const textContent = card.querySelector('.utility-padding-all-1rem');
    const textParts = [];
    if (textContent) {
      // Tag (optional)
      const tagGroup = textContent.querySelector('.tag-group');
      if (tagGroup) {
        textParts.push(tagGroup);
      }
      // Heading (optional)
      const heading = textContent.querySelector('h3');
      if (heading) {
        textParts.push(heading);
      }
      // Description (optional)
      const desc = textContent.querySelector('p');
      if (desc) {
        textParts.push(desc);
      }
    }
    // Return a row with [image, text array]
    return [image, textParts];
  });

  // Compose the complete table cells
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
