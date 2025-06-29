/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract all hero7 background images (all <img> in the 3-column grid)
  let backgroundCellContent = '';
  const imageGrid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (imageGrid) {
    const imageDivs = imageGrid.querySelectorAll(':scope > div');
    // Only reference existing <img> elements (do not clone)
    const images = [];
    imageDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) images.push(img);
    });
    if (images.length > 0) {
      // Place all images inside one container (will be one cell)
      const imgContainer = document.createElement('div');
      imgContainer.className = 'hero7-background-collage';
      images.forEach(img => imgContainer.appendChild(img));
      backgroundCellContent = imgContainer;
    }
  }

  // 2. Extract hero7 text content (headline, subheading, call-to-action buttons)
  let heroContentCellContent = '';
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Reuse the existing <h1>, <p>, and all <a> (buttons) in a wrapper
    const contentNodes = [];
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentNodes.push(h1);
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentNodes.push(subheading);
    // Add all call-to-action buttons
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      buttonGroup.querySelectorAll('a').forEach(a => contentNodes.push(a));
    }
    if (contentNodes.length) {
      const contentDiv = document.createElement('div');
      contentNodes.forEach(node => contentDiv.appendChild(node));
      heroContentCellContent = contentDiv;
    }
  }

  // 3. Compose the table rows (1 col, 3 rows)
  const cells = [
    ['Hero (hero7)'],
    [backgroundCellContent],
    [heroContentCellContent]
  ];

  // 4. Create and replace block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
