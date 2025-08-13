<script>
  import { createEventDispatcher } from 'svelte';
  
  export let preview = null;
  
  const dispatch = createEventDispatcher();
  
  function handleFileSelect(event) {
    const file = event.target.files[0];
    
    if (file && file.type.startsWith('image/')) {
      // Create preview URL
      const reader = new FileReader();
      reader.onload = e => {
        preview = e.target.result;
      };
      reader.readAsDataURL(file);
      
      // Dispatch event to parent
      dispatch('fileselected', { file });
    }
  }
  
  function triggerFileInput() {
    document.getElementById('file-upload').click();
  }
</script>

<div class="file-upload">
  <input 
    type="file" 
    id="file-upload" 
    accept="image/*" 
    on:change={handleFileSelect} 
    style="display: none;" 
  />
  
  {#if preview}
    <div class="preview-container">
      <img src={preview} alt="Preview" class="image-preview" />
      <button type="button" class="change-btn" on:click={triggerFileInput}>
        Change Image
      </button>
    </div>
  {:else}
    <button type="button" class="upload-btn" on:click={triggerFileInput}>
      <div class="upload-icon">📷</div>
      <div>Click to select an image</div>
    </button>
  {/if}
</div>

<style>
  .file-upload {
    margin-bottom: 20px;
  }
  
  .upload-btn {
    display: block;
    width: 100%;
    background: transparent;
    border: 2px dashed #ddd;
    border-radius: 12px;
    padding: 40px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .upload-btn:hover {
    border-color: #8c52ff;
    background-color: #f9f5ff;
  }
  
  .upload-icon {
    font-size: 3rem;
    margin-bottom: 10px;
  }
  
  .preview-container {
    position: relative;
    margin-bottom: 20px;
  }
  
  .image-preview {
    max-width: 100%;
    max-height: 300px;
    border-radius: 12px;
    display: block;
    margin: 0 auto;
  }
  
  .change-btn {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 50px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 0.8rem;
  }
</style>