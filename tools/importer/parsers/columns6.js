/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns6)'];

  // Get the first grid with the split content (left: headline; right: text/buttons)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  const mainChildren = mainGrid.querySelectorAll(':scope > div');
  const leftCol = mainChildren[0];
  const rightCol = mainChildren[1];

  // Compose left column: eyebrow + heading
  const leftContent = [];
  if (leftCol) {
    leftCol.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && (node.matches('.eyebrow') || node.matches('h1'))) {
        leftContent.push(node);
      }
    });
  }

  // Compose right column: description paragraph, author info, and read more button
  const rightContent = [];
  if (rightCol) {
    const desc = rightCol.querySelector('.rich-text');
    if (desc) rightContent.push(desc);
    const infoGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
    if (infoGrid) {
      // Author row (avatar + author block)
      const authorRow = infoGrid.querySelector('.flex-horizontal.y-center');
      if (authorRow) rightContent.push(authorRow);
      // Read more button
      const btn = infoGrid.querySelector('a.button');
      if (btn) rightContent.push(btn);
    }
  }

  // Get the lower image grid (2 cells)
  const bottomGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let bottomImages = [null, null];
  if (bottomGrid) {
    const imgs = bottomGrid.querySelectorAll(':scope > .utility-aspect-1x1 > img');
    if (imgs.length > 0) {
      imgs.forEach((img, idx) => {
        if (idx < 2) bottomImages[idx] = img;
      });
    }
  }

  // Only create the second row if we have both columns
  const secondRow = [leftContent, rightContent];
  // Only create the third row if we have at least one image
  let cells = [headerRow, secondRow];
  if (bottomImages.filter(Boolean).length) {
    cells.push(bottomImages);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
