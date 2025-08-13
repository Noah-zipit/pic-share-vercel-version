<script>
  import { Router, Route } from "svelte-routing";
  import { onMount } from 'svelte';
  import { theme } from './stores/theme';
  import Navbar from "./components/Navbar.svelte";
  import Home from "./routes/Home.svelte";
  import Register from "./routes/Register.svelte";
  import Login from "./routes/Login.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  import SendImage from "./routes/SendImage.svelte";
  
  export let url = "";
  
  onMount(() => {
    // Apply theme on initial load
    if ($theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    }
  });
</script>

<Router {url}>
  <Navbar />
  
  <main>
    <Route path="/" component={Home} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/send/:linkId" component={SendImage} />
  </main>
  
  <footer>
    <div class="container">
      <p>&copy; {new Date().getFullYear()} PicShare. Anonymous Image Sharing.</p>
    </div>
  </footer>
</Router>

<style>
  main {
    min-height: calc(100vh - 140px);
  }
  
  footer {
    text-align: center;
    padding: 20px 0;
    background-color: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    margin-top: 40px;
  }
  
  footer p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
</style>