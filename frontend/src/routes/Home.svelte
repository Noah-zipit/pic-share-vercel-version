<script>
  import { Link } from "svelte-routing";
  import { user } from '../stores/user';
</script>

<div class="home">
  <div class="container">
    <div class="hero">
      <h1>PicShare</h1>
      <p class="tagline">Receive anonymous images from anyone</p>
      
      <div class="cta-buttons">
        {#if $user}
          <Link to="/dashboard" class="btn primary">Go to Dashboard</Link>
        {:else}
          <Link to="/register" class="btn primary">Create Your Link</Link>
          <Link to="/login" class="btn secondary">Login</Link>
        {/if}
      </div>
    </div>
  </div>
  
  <div class="features-section">
    <div class="container">
      <div class="features">
        <div class="feature-card purple">
          <div class="card-icon-wrapper">
            <div class="card-icon">🔗</div>
          </div>
          <h3>Get Your Link</h3>
          <p>Create an account and get a unique link to share with others</p>
          <div class="card-footer">
            <Link to="/register" class="card-link">Get Started →</Link>
          </div>
        </div>
        
        <div class="feature-card pink">
          <div class="card-icon-wrapper">
            <div class="card-icon">📷</div>
          </div>
          <h3>Receive Images</h3>
          <p>Anyone with your link can send you images anonymously</p>
          <div class="card-footer">
            <Link to="/register" class="card-link">Learn More →</Link>
          </div>
        </div>
        
        <div class="feature-card blue">
          <div class="card-icon-wrapper">
            <div class="card-icon">🔒</div>
          </div>
          <h3>Total Privacy</h3>
          <p>Senders remain 100% anonymous, ensuring complete privacy</p>
          <div class="card-footer">
            <Link to="/register" class="card-link">See How →</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="container">
    <div class="how-it-works card">
      <h2>How It Works</h2>
      
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Sign Up</h3>
          <p>Create an account to get your unique sharing link</p>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <h3>Share Your Link</h3>
          <p>Post your link on social media or share it with friends</p>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <h3>Receive Images</h3>
          <p>Get anonymous pictures from your friends and followers</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .home {
    min-height: 100vh;
  }
  
  .hero {
    text-align: center;
    padding: 60px 0;
  }
  
  h1 {
    font-size: 3.5rem;
    background: linear-gradient(45deg, var(--primary-color, #ff7eb9), var(--secondary-color, #8c52ff));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
  }
  
  .tagline {
    font-size: 1.5rem;
    color: var(--text-secondary, #6b7280);
    margin-bottom: 40px;
  }
  
  .cta-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
  }
  
  .btn.secondary {
    background: transparent;
    border: 2px solid var(--primary-color, #8c52ff);
    color: var(--primary-color, #8c52ff);
  }
  
  /* Features section with background */
  .features-section {
    background-color: #f7f9fc;
    padding: 60px 0;
    margin: 40px 0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05) inset;
  }
  
  :global(.dark-theme) .features-section {
    background-color: #111827;
  }
  
  /* Enhanced Feature Cards */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }
  
  .feature-card {
    background-color: var(--card-background, white);
    border-radius: 16px;
    padding: 30px;
    text-align: center;
    /* Stronger shadow for more visibility */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    /* More visible border */
    border: 1px solid rgba(0, 0, 0, 0.12);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .feature-card.purple {
    background: linear-gradient(135deg, rgba(140, 82, 255, 0.15), rgba(140, 82, 255, 0.05));
  }
  
  .feature-card.pink {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.05));
  }
  
  .feature-card.blue {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05));
  }
  
  :global(.dark-theme) .feature-card {
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
  
  :global(.dark-theme) .feature-card.purple {
    background: linear-gradient(135deg, rgba(140, 82, 255, 0.25), rgba(140, 82, 255, 0.1));
  }
  
  :global(.dark-theme) .feature-card.pink {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.25), rgba(236, 72, 153, 0.1));
  }
  
  :global(.dark-theme) .feature-card.blue {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(59, 130, 246, 0.1));
  }
  
  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  /* Bolder top border */
  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #8c52ff, #ff7eb9);
  }
  
  .feature-card.purple::before {
    background: linear-gradient(90deg, #8c52ff, #a78bfa);
  }
  
  .feature-card.pink::before {
    background: linear-gradient(90deg, #ec4899, #f472b6);
  }
  
  .feature-card.blue::before {
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
  }
  
  /* Add more distinct background to the icon wrapper */
  .card-icon-wrapper {
    margin: 0 auto 20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    /* Add subtle border */
    border: 2px solid rgba(140, 82, 255, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .feature-card.purple .card-icon-wrapper {
    border-color: rgba(140, 82, 255, 0.5);
  }
  
  .feature-card.pink .card-icon-wrapper {
    border-color: rgba(236, 72, 153, 0.5);
  }
  
  .feature-card.blue .card-icon-wrapper {
    border-color: rgba(59, 130, 246, 0.5);
  }
  
  :global(.dark-theme) .card-icon-wrapper {
    background: rgba(30, 41, 59, 0.8);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .card-icon {
    font-size: 2.5rem;
  }
  
  .feature-card h3 {
    margin: 0 0 15px 0;
    font-size: 1.5rem;
    color: var(--text-color, #1f2937);
  }
  
  .feature-card p {
    color: var(--text-secondary, #6b7280);
    line-height: 1.6;
    margin: 0 0 20px 0;
    flex-grow: 1;
  }
  
  .card-footer {
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  :global(.dark-theme) .card-footer {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
  
  .card-link {
    color: var(--primary-color, #8c52ff);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: color 0.2s ease;
  }
  
  .card-link:hover {
    color: var(--secondary-color, #ff7eb9);
    text-decoration: none;
  }
  
  /* How it works section */
  .how-it-works {
    text-align: center;
    padding: 40px;
    margin-bottom: 60px;
  }
  
  .how-it-works h2 {
    font-size: 2rem;
    margin-bottom: 40px;
    position: relative;
    display: inline-block;
    padding-bottom: 10px;
  }
  
  .how-it-works h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color, #8c52ff), var(--secondary-color, #ff7eb9));
    border-radius: 3px;
  }
  
  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }
  
  .step {
    position: relative;
  }
  
  .step-number {
    background: linear-gradient(45deg, var(--primary-color, #8c52ff), var(--secondary-color, #ff7eb9));
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 auto 20px;
    box-shadow: 0 4px 10px rgba(140, 82, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    
    .features {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
</style>