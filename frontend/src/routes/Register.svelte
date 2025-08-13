<script>
  import { navigate } from "svelte-routing";
  import { Link } from "svelte-routing";
  import api from "../utils/api";
  import { login } from "../stores/user";
  
  let username = "";
  let email = "";
  let password = "";
  let error = "";
  let loading = false;
  
  async function handleRegister(event) {
    event.preventDefault();
    error = "";
    loading = true;
    
    try {
      const userData = await api.auth.register({ username, email, password });
      login(userData, userData.token);
      navigate("/dashboard");
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="register">
  <div class="container">
    <div class="card register-card">
      <h1>Create Your Link</h1>
      <p>Register to get your unique link for receiving anonymous images</p>
      
      {#if error}
        <div class="error">{error}</div>
      {/if}
      
      <form on:submit|preventDefault={handleRegister}>
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            bind:value={username} 
            required 
            placeholder="Choose a username"
          />
        </div>
        
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
            placeholder="Create a password"
            minlength="6"
          />
        </div>
        
        <button type="submit" class="btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
      <p class="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
</div>

<style>
  /* Your existing styles remain the same */
</style>