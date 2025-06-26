/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Accordion block
  const headerRow = ['Accordion'];

  // Find all accordions (direct children with .accordion class)
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Build the rows for the block table
  const rows = accordions.map((accordion) => {
    // Get title: it's the .paragraph-lg inside .w-dropdown-toggle
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      title = toggle.querySelector('.paragraph-lg') || toggle;
    }
    // Get content: first .w-richtext inside nav.w-dropdown-list
    const contentNav = accordion.querySelector('nav.w-dropdown-list');
    let content = null;
    if (contentNav) {
      content = contentNav.querySelector('.w-richtext') || contentNav;
    }
    return [title, content];
  });

  // Build the table data
  const tableData = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
