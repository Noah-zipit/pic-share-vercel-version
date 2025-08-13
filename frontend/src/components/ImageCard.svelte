<script>
  import { formatDate } from '../utils/helpers';
  
  export let image;
  
  // Make sure URL is absolute by adding backend URL if needed
  $: imageUrl = image.url.startsWith('http') 
    ? image.url 
    : `http://localhost:5001${image.url}`;
</script>

<div class="image-card">
  <div class="image-container">
    <img src={imageUrl} alt="Anonymous" loading="lazy" />
  </div>
  
  <div class="image-content">
    {#if image.caption}
      <p class="caption">{image.caption}</p>
    {/if}
    
    <p class="date">Received on {formatDate(image.createdAt)}</p>
  </div>
</div>

<style>
  .image-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 10px var(--shadow-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .image-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--shadow-color);
  }
  
  .image-container {
    height: 250px;
    overflow: hidden;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  
  .image-card:hover img {
    transform: scale(1.05);
  }
  
  .image-content {
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .caption {
    color: var(--text-primary);
    margin: 0 0 12px 0;
    font-size: 0.95rem;
    flex-grow: 1;
  }
  
  .date {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-style: italic;
  }
</style>