<script>
  import { Link } from "svelte-routing";
  import { user, logout } from '../stores/user';
  import { navigate } from 'svelte-routing';
  import ThemeToggle from './ThemeToggle.svelte';
  
  function handleLogout() {
    logout();
    navigate('/');
  }
</script>

<nav class="navbar">
  <div class="container nav-container">
    <Link to="/" class="logo">PicShare</Link>
    
    <div class="nav-controls">
      <ThemeToggle />
      
      <div class="nav-links">
        {#if $user}
          <Link to="/dashboard">Dashboard</Link>
          <button class="logout-btn" on:click={handleLogout}>Logout</button>
        {:else}
          <Link to="/login">Login</Link>
          <Link to="/register" class="register-btn">Get Started</Link>
        {/if}
      </div>
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: var(--bg-secondary);
    box-shadow: 0 2px 10px var(--shadow-color);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-controls {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(45deg, var(--accent-secondary), var(--accent-primary));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  .nav-links :global(a) {
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .nav-links :global(a:hover) {
    color: var(--accent-primary);
  }
  
  .register-btn {
    background: linear-gradient(45deg, var(--accent-secondary), var(--accent-primary));
    color: white !important;
    padding: 8px 16px;
    border-radius: 50px;
    font-weight: 500;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .register-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
  }
  
  .logout-btn {
    background: transparent;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .logout-btn:hover {
    color: var(--accent-secondary);
  }
  
  @media (max-width: 768px) {
    .nav-controls {
      gap: 10px;
    }
    
    .nav-links {
      gap: 10px;
    }
  }
</style>