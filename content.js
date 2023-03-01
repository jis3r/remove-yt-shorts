// Define a function that removes "SHORTS" spans from the page
function removeShortsSpans() {
    console.log("ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ")
    const spans = document.querySelectorAll('span#text');
    spans.forEach((span) => {
        if (span.textContent.trim() === 'SHORTS') {
            console.log('SHORTS');
            span.remove();
      }
    });
  }
  
  // Observe changes to the page's DOM using a mutation observer
  const observer = new MutationObserver(() => {
    removeShortsSpans();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  