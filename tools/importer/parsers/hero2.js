/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all images that are direct or indirect children of image wrappers
  const imageWrappers = element.querySelectorAll('.custom-hero-to-place-wrapper');
  const images = [];
  imageWrappers.forEach(wrapper => {
    const img = wrapper.querySelector('img');
    if (img) images.push(img);
  });

  // Build table: 1 column, 3 rows, as in the example
  // Row 1: header exactly as in example
  // Row 2: images (can be empty)
  // Row 3: heading/cta etc (none present in supplied html, so blank)
  const table = [
    ['Hero'],
    [images.length > 0 ? images : ''],
    ['']
  ];

  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
