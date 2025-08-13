<script>
  import { onMount } from "svelte";
  import { navigate, Link } from "svelte-routing";
  import { user } from "../stores/user";
  import api from "../utils/api";
  import ShareLink from "../components/ShareLink.svelte";
  import ImageCard from "../components/ImageCard.svelte";
  
  let images = [];
  let loading = true;
  let error = "";
  
  onMount(async () => {
    if (!$user) {
      return navigate("/login");
    }
    
    try {
      images = await api.images.getReceived();
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  });
</script>

<div class="dashboard">
  <div class="container">
    <div class="dashboard-header">
      <h1>Your Gallery</h1>
      {#if $user}
        <span class="username">@{$user.username}</span>
      {/if}
    </div>
    
    {#if $user}
      <div class="card share-card">
        <ShareLink linkId={$user.linkId} />
      </div>
      
      <div class="gallery-section">
        <h2>Received Images</h2>
        
        {#if loading}
          <div class="loading-container">
            <div class="spinner"></div>
            <p>Loading your images...</p>
          </div>
        {:else if error}
          <div class="error-card">
            <div class="error-icon">⚠️</div>
            <p>{error}</p>
          </div>
        {:else if images.length === 0}
          <div class="empty-gallery card">
            <div class="empty-icon">📷</div>
            <h3>Your gallery is empty</h3>
            <p>Share your link with friends to start receiving anonymous images!</p>
          </div>
        {:else}
          <div class="gallery-grid">
            {#each images as image (image.id)}
              <ImageCard {image} />
            {/each}
          </div>
        {/if}
      </div>
    {:else}
      <div class="card">
        <p>Please login to view your dashboard</p>
        <Link to="/login" class="btn">Login</Link>
      </div>
    {/if}
  </div>
</div>

<style>
  .dashboard {
    padding: 40px 0 60px;
  }
  
  .dashboard-header {
    display: flex;
    align-items: baseline;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  h1 {
    margin: 0;
    font-size: 2.5rem;
    color: var(--primary-color, #8b5cf6);
  }
  
  .username {
    color: var(--text-secondary, #6b7280);
    font-size: 1.2rem;
  }
  
  .share-card {
    margin-bottom: 40px;
  }
  
  .gallery-section {
    margin-top: 30px;
  }
  
  h2 {
    margin-bottom: 25px;
    position: relative;
    display: inline-block;
    padding-bottom: 8px;
  }
  
  h2:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color, #8b5cf6), var(--secondary-color, #ec4899));
    border-radius: 3px;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
  }
  
  .empty-gallery {
    text-align: center;
    padding: 60px 30px;
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.7;
  }
  
  .empty-gallery h3 {
    margin: 0 0 15px 0;
    font-size: 1.5rem;
  }
  
  .empty-gallery p {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(139, 92, 246, 0.3);
    border-radius: 50%;
    border-top-color: var(--primary-color, #8b5cf6);
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .error-card {
    background-color: rgba(239, 68, 68, 0.1);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .error-icon {
    font-size: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
    
    .gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 15px;
    }
  }
</style>