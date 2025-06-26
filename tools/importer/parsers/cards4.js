/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child links (cards)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Table header
  const cells = [['Cards']];

  // For each card, extract image and text cell contents
  cardLinks.forEach(card => {
    // Find the inner grid (contains img and right-side content)
    const innerGrid = card.querySelector(':scope > .w-layout-grid');
    // Image is always the first img inside the inner grid
    const img = innerGrid ? innerGrid.querySelector('img') : card.querySelector('img');

    // Textual area (div after img inside inner grid)
    let textDiv = null;
    if (innerGrid) {
      // Get direct children
      const children = Array.from(innerGrid.children);
      for (let i = 0; i < children.length; i++) {
        if (children[i].tagName !== 'IMG') {
          textDiv = children[i];
          break;
        }
      }
    }
    // Fallback, just get the first div after img
    if (!textDiv) {
      const imgs = card.querySelectorAll('img');
      const lastImg = imgs[imgs.length - 1];
      if (lastImg) {
        let el = lastImg.nextElementSibling;
        while (el && el.tagName !== 'DIV') el = el.nextElementSibling;
        textDiv = el;
      }
    }

    // Compose text cell by collecting all child nodes of textDiv
    const textCell = [];
    if (textDiv) {
      // Keep only meaningful elements: meta, heading, paragraph, and CTA ("Read")
      // The card meta row (contains tag and read time)
      const meta = textDiv.querySelector('.flex-horizontal');
      if (meta) textCell.push(meta);
      // Heading
      const heading = textDiv.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textCell.push(heading);
      // Description paragraph
      const desc = textDiv.querySelector('p');
      if (desc) textCell.push(desc);
      // CTA (look for element with exact text 'Read')
      let cta = null;
      Array.from(textDiv.children).forEach(child => {
        if (!cta && child.tagName === 'DIV' && child.textContent.trim() === 'Read') {
          cta = child;
        }
      });
      if (cta) textCell.push(cta);
    }

    // Add row to table
    cells.push([
      img,
      textCell
    ]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
