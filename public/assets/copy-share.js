'use strict';

// Content that acts on tap: a venue's place and address open the system share sheet with “城市 地址 场地” where the browser
// offers one, otherwise copy it; a mini-program code copies. A copy is confirmed in place for 2s. Without the script the
// buttons stay disabled and the text stays selectable.
(() => {
  const canShare = typeof navigator.share === 'function';
  for (const button of document.querySelectorAll('.copy-target')) {
    const share = canShare && 'shareText' in button.dataset;
    const status = button.querySelector('.copy-status');
    button.disabled = false;
    button.classList.add(share ? 'is-share' : 'is-copy');
    button.setAttribute('aria-label', `${share ? '分享' : '复制'}：${button.dataset.copyText}`);
    button.addEventListener('click', async () => {
      if (share) {
        // Dismissing the sheet rejects with AbortError; that is the reader's choice, not a failure.
        await navigator.share({ text: button.dataset.shareText }).catch(error => { if (error.name !== 'AbortError') throw error; });
        return;
      }
      await navigator.clipboard.writeText(button.dataset.copyText);
      status.textContent = '已复制';
      button.classList.add('is-copied');
      setTimeout(() => { status.textContent = ''; button.classList.remove('is-copied'); }, 2000);
    });
  }
})();
