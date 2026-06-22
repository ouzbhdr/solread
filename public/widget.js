(function() {
  // Find all elements with data-soljeton-article attribute
  const initSolJeton = () => {
    const elements = document.querySelectorAll('[data-soljeton-article]');
    
    elements.forEach(el => {
      // Avoid initializing multiple times
      if (el.getAttribute('data-soljeton-initialized') === 'true') return;
      
      const articleId = el.getAttribute('data-soljeton-article');
      const price = el.getAttribute('data-soljeton-price') || '0.01';
      const recipient = el.getAttribute('data-soljeton-recipient') || '';
      const token = el.getAttribute('data-soljeton-token') || 'SOL';
      
      // If we are in local development or custom domain
      let domain = el.getAttribute('data-soljeton-domain');
      if (!domain) {
        // Default to current window origin if it's our domain, else fallback to live URL
        const currentOrigin = window.location.origin;
        domain = currentOrigin.includes('localhost') ? 'http://localhost:3000' : 'https://solread.vercel.app';
      }
      const height = el.getAttribute('data-soljeton-height') || '450px';
      
      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = `${domain}/embed/${articleId}?price=${price}&recipient=${recipient}&token=${token}`;
      iframe.style.width = '100%';
      iframe.style.height = height;
      iframe.style.border = 'none';
      iframe.style.borderRadius = '16px';
      iframe.style.backgroundColor = '#020617';
      iframe.style.boxShadow = '0 10px 15px -3px rgba(168, 85, 247, 0.2)';
      iframe.style.overflow = 'hidden';
      iframe.scrolling = 'no';
      iframe.id = `soljeton-iframe-${articleId}`;
      
      el.innerHTML = ''; // Clear container
      el.appendChild(iframe);
      el.setAttribute('data-soljeton-initialized', 'true');
    });
  };

  // Run on load and expose global initializer in case dynamic elements are loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolJeton);
  } else {
    initSolJeton();
  }
  
  window.SolJeton = {
    init: initSolJeton
  };
  
  // Listen for message events
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SOL_JETON_UNLOCKED') {
      const articleId = event.data.articleId;
      const content = event.data.content;
      
      // Find the container element
      const el = document.querySelector(`[data-soljeton-article="${articleId}"]`);
      if (el) {
        // Trigger a custom event in the DOM in case parent scripts want to listen to it
        const customEvent = new CustomEvent('soljeton:unlocked', {
          detail: { articleId, content }
        });
        el.dispatchEvent(customEvent);
        
        // Auto-reveal content if there is a target element specified
        const revealId = el.getAttribute('data-soljeton-reveal-id');
        if (revealId) {
          const targetEl = document.getElementById(revealId);
          if (targetEl) {
            // Hide the widget container
            el.style.display = 'none';
            // Show premium content
            targetEl.style.display = 'block';
          }
        }
      }
    }
  });
})();
