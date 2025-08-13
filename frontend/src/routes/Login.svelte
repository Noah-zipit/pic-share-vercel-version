<script>
  import { navigate } from "svelte-routing";
  import { Link } from "svelte-routing";
  import api from "../utils/api";
  import { login } from "../stores/user";
  
  let email = "";
  let password = "";
  let error = "";
  let loading = false;
  
  async function handleLogin(event) {
    event.preventDefault();
    error = "";
    loading = true;
    
    try {
      const userData = await api.auth.login({ email, password });
      login(userData, userData.token);
      navigate("/dashboard");
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="login">
  <div class="container">
    <div class="card login-card">
      <h1>Login</h1>
      <p>Access your dashboard to view received images</p>
      
      {#if error}
        <div class="error">{error}</div>
      {/if}
      
      <form on:submit|preventDefault={handleLogin}>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            bind:value={email} 
            required 
            placeholder="Your email address"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            bind:value={password} 
            required 
            placeholder="Your password"
          />
        </div>
        
        <button type="submit" class="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p class="register-link">
        Don't have an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  </div>
</div>

<style>
  /* Your existing styles remain the same */
</style>