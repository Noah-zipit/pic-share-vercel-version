<script>
  import { copyToClipboard, createShareLinks } from '../utils/helpers';
  
  export let linkId;
  
  let copied = false;
  $: shareLink = `${window.location.origin}/send/${linkId}`;
  $: shareUrls = createShareLinks(shareLink);
  
  function copyLink() {
    copyToClipboard(shareLink);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

<div class="share-link">
  <div class="share-header">
    <h3>Your Anonymous Link</h3>
    <div class="share-badge">Private</div>
  </div>
  
  <p>Share this link with friends to receive anonymous images:</p>
  
  <div class="link-container">
    <input type="text" value={shareLink} readonly aria-label="Your anonymous link" />
    <button class="copy-btn" on:click={copyLink}>
      {#if copied}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      {/if}
    </button>
  </div>
  
  <div class="share-buttons">
    <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" class="share-btn twitter">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
      Twitter
    </a>
    <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" class="share-btn facebook">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
      Facebook
    </a>
    <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" class="share-btn whatsapp">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      WhatsApp
    </a>
  </div>
</div>

<style>
  .share-link {
    width: 100%;
  }
  
  .share-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }
  
  h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
  }
  
  .share-badge {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p {
    margin: 8px 0 16px;
    color: var(--text-secondary);
  }
  
  .link-container {
    display: flex;
    margin: 16px 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px var(--shadow-color);
  }
  
  input {
    flex: 1;
    padding: 14px 16px;
    border: 1px solid var(--border-color);
    border-right: none;
    border-radius: 8px 0 0 8px;
    font-size: 1rem;
    background-color: var(--input-bg);
    color: var(--text-primary);
  }
  
  .copy-btn {
    background: var(--accent-primary);
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .copy-btn:hover {
    background-color: #7c3aed;
  }
  
  .share-buttons {
    display: flex;
    gap: 12px;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  
  .share-btn {
    padding: 10px 16px;
    border-radius: 8px;
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    text-decoration: none;
  }
  
  .twitter { background-color: #1DA1F2; }
  .facebook { background-color: #4267B2; }
  .whatsapp { background-color: #25D366; }
  
  @media (max-width: 768px) {
    .share-buttons {
      justify-content: center;
    }
  }
</style>