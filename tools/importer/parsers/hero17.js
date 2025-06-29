/* global WebImporter */
export default function parse(element, { document }) {
  // 1. HEADER ROW: Block name.
  const headerRow = ['Hero (hero17)'];

  // 2. BACKGROUND IMAGE ROW: look for the main hero image. 
  // Look for an <img> with class 'cover-image' in any descendant div
  let bgImg = element.querySelector('img.cover-image');
  // Fallback: first <img> in the element (if exists)
  if (!bgImg) bgImg = element.querySelector('img');
  const backgroundRow = [bgImg ? bgImg : ''];

  // 3. CONTENT ROW: Headline, subheading, CTA(s)
  // Get all grid cells (direct child divs within the main grid)
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = '';
  if (grid) {
    // Usually, text and CTAs are in the 2nd child div of the grid
    const gridDivs = grid.querySelectorAll(':scope > div');
    if (gridDivs.length > 1) {
      const textDiv = gridDivs[1];
      // Grab all direct children of this textDiv
      const items = [];
      // Find headline (h1-h6)
      let heading = textDiv.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) items.push(heading);
      // Find potential subheading (search for another heading after the main heading)
      // (Not present in this sample, but future-proof)
      const headingSiblings = Array.from(textDiv.querySelectorAll('h2, h3, h4, h5, h6'));
      if (headingSiblings.length > 0 && !(heading && heading.nodeName === headingSiblings[0].nodeName && heading.textContent === headingSiblings[0].textContent)) {
        items.push(...headingSiblings);
      }
      // Find CTA (buttons/links)
      let ctaGroup = textDiv.querySelector('.button-group');
      if (ctaGroup) {
        items.push(ctaGroup);
      } else {
        // Fallback: direct <a> children
        const links = Array.from(textDiv.querySelectorAll('a'));
        if (links.length > 0) items.push(...links);
      }
      // Fallback: If no items found, keep the whole textDiv
      if (items.length === 0) {
        items.push(textDiv);
      }
      contentCell = items.length === 1 ? items[0] : items;
    } else {
      // Fallback: no grid or not enough children, use all inside main element
      contentCell = element;
    }
  } else {
    // If no grid (structure change), use the element itself for content
    contentCell = element;
  }
  const contentRow = [contentCell];

  // Compose the block table cells
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
