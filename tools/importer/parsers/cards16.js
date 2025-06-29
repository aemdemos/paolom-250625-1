/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards16)'];
  // Get each card (direct children <a> of the grid)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map((card) => {
    // Find the image (mandatory, first img descendant)
    const img = card.querySelector('img');
    // Find the card content container (after the image, but gets all text content)
    // The image and the grid with text are siblings in the inner grid
    const innerGrid = card.querySelector(':scope > div');
    if (!img || !innerGrid) {
      // Robustness: skip cards missing mandatory parts
      return null;
    }
    // The grid usually contains: [img, <div>text content<div>]
    // But we already got img, so get the text content div
    // Sometimes it's the only div after img, sometimes more; pick the div after the img
    const textCandidates = Array.from(innerGrid.children).filter(node => node.tagName === 'DIV');
    let textContentDiv = null;
    if (textCandidates.length === 1) {
      textContentDiv = textCandidates[0];
    } else {
      // fallback, get last div (usually the text block)
      textContentDiv = textCandidates[textCandidates.length - 1];
    }
    // If above doesn't work, fallback to innerGrid
    const textBlock = textContentDiv || innerGrid;
    return [img, textBlock];
  }).filter(Boolean); // Remove any null rows
  if (rows.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
