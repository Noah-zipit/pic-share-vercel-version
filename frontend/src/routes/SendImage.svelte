<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import api from "../utils/api";
  import FileUpload from "../components/FileUpload.svelte";
  
  export let linkId;
  
  let recipient = null;
  let file = null;
  let caption = "";
  let preview = null;
  let loading = true;
  let uploading = false;
  let error = "";
  let success = false;
  
  onMount(async () => {
    try {
      recipient = await api.users.getByLink(linkId);
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  });
  
  function handleFileSelected(event) {
    file = event.detail.file;
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    if (!file) return;
    
    uploading = true;
    error = "";
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('caption', caption);
      
      await api.images.upload(linkId, formData);
      success = true;
    } catch (err) {
      error = err.message;
    } finally {
      uploading = false;
    }
  }
  
  function resetForm() {
    file = null;
    preview = null;
    caption = "";
    success = false;
  }
</script>

<div class="send-image">
  <div class="container">
    {#if loading}
      <div class="loading">Loading...</div>
    {:else if error}
      <div class="error-card">
        <h2>Error</h2>
        <p>{error}</p>
        <a href="/" class="btn">Go Back Home</a>
      </div>
    {:else if success}
      <div class="card success-card">
        <div class="success-icon">✅</div>
        <h2>Image Sent!</h2>
        <p>Your image has been sent anonymously to {recipient.username}</p>
        <div class="action-buttons">
          <button class="btn" on:click={resetForm}>Send Another</button>
          <a href="/" class="btn secondary">Go Home</a>
        </div>
      </div>
    {:else}
      <div class="card">
        <div class="recipient-info">
          <h2>Send to {recipient.username}</h2>
          <p>Your image will be sent completely anonymously.</p>
        </div>
        
        <form on:submit={handleSubmit}>
          <FileUpload bind:preview on:fileselected={handleFileSelected} />
          
          <div class="form-group">
            <label for="caption">Caption (optional)</label>
            <textarea 
              id="caption" 
              bind:value={caption} 
              placeholder="Add a message..." 
              rows="3"
            ></textarea>
          </div>
          
          <button type="submit" class="btn send-btn" disabled={!file || uploading}>
            {uploading ? 'Sending...' : 'Send Anonymously'}
          </button>
        </form>
      </div>
    {/if}
  </div>
</div>

<style>
  .send-image {
    padding: 60px 0;
  }
  
  .recipient-info {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .send-btn {
    width: 100%;
    margin-top: 10px;
  }
  
  .success-card {
    text-align: center;
    padding: 40px;
  }
  
  .success-icon {
    font-size: 4rem;
    margin-bottom: 20px;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .btn.secondary {
    background: transparent;
    border: 2px solid #8c52ff;
    color: #8c52ff;
  }
  
  .loading, .error-card {
    text-align: center;
    padding: 40px;
  }
</style>