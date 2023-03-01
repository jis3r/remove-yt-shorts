const PARENTS = 12;
function removeShortsSpans() {
    document.querySelectorAll('span#text').forEach((span) => {
      if (span.textContent.trim() === 'SHORTS') {
        console.log('SHORTS');
        let el = span.parentElement;
        for (let i = 0; i < PARENTS && el; i++) {
          el = el.parentElement;
        }
        if (el) {
          el.remove();
        }
      }
    });
  }
  
  const observer = new MutationObserver(() => {
    removeShortsSpans();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  