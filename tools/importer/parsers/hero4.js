/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row, must exactly match the example
  const headerRow = ['Hero (hero4)'];

  // 2. Background image row: get the <img> with class 'cover-image' (used for hero background)
  let bgImg = element.querySelector('img.cover-image');
  // If missing, cell must still exist but be empty
  const imageRow = [bgImg || ''];

  // 3. Content row: Heading, paragraph, CTA
  // Approach:
  // - Find the main grid containing text (the .container)
  // - Within that, find the h1, paragraph(s), and CTA button(s)

  // Find all grid children
  const mainGrids = element.querySelectorAll(':scope > div > div');
  // Find the one with class 'container'
  let textContainer = null;
  for (const div of mainGrids) {
    if (div.classList.contains('container')) {
      textContainer = div;
      break;
    }
  }
  // Defensive fallback (should not occur in this example)
  if (!textContainer) {
    textContainer = mainGrids[mainGrids.length - 1];
  }

  // In the .container, the heading is an h1, text is a paragraph, CTA is a link with class button
  let contentCell = [];
  if (textContainer) {
    // Get h1 (title)
    const heading = textContainer.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Get the first paragraph (subheading/description)
    const paragraph = textContainer.querySelector('p');
    if (paragraph) contentCell.push(paragraph);
    // Get a CTA button (link)
    const cta = textContainer.querySelector('a.button, a.w-button, button');
    if (cta) contentCell.push(cta);
  }
  // If no content found, cell must still exist
  if (contentCell.length === 0) contentCell = [''];

  // Build the table as per the spec: 1col x 3rows
  const cells = [
    headerRow,
    imageRow,
    [contentCell]
  ];

  // Create the block table using the WebImporter helper
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
