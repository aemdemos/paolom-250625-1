/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row as specified in the example
  const headerRow = ['Accordion'];
  const tableRows = [];

  // Find all accordion blocks within the provided element
  const accordionItems = element.querySelectorAll(':scope > .accordion');
  accordionItems.forEach((item) => {
    // Title: look for immediate child .w-dropdown-toggle .paragraph-lg
    let titleElem = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    // If not found, fallback to .w-dropdown-toggle
    if (!titleElem) {
      titleElem = item.querySelector('.w-dropdown-toggle');
    }
    // Content: look for nav.accordion-content
    let contentElem = item.querySelector('nav.accordion-content');
    if (contentElem) {
      // Usually there's a wrapper div with .rich-text; prefer its content
      const richText = contentElem.querySelector('.rich-text');
      if (richText) {
        contentElem = richText;
      }
    } else {
      // If nav not found, fallback to a likely content wrapper
      contentElem = item.querySelector('.accordion-content');
    }
    tableRows.push([titleElem, contentElem]);
  });

  // Only create table if there is at least one accordion item
  if (tableRows.length > 0) {
    const cells = [headerRow, ...tableRows];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
