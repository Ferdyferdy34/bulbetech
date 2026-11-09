(function(){
  const cfg=window.BULBE_CONFIG||{};
  const ready=Boolean(cfg.cloudEnabled&&cfg.supabaseUrl&&cfg.supabaseAnonKey);
  let client=null;
  window.BulbeCloud={enabled:ready, async init(){
    if(!ready) return null;
    if(!window.supabase){await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');}
    client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
    wireAuth();
    const {data}=await client.auth.getSession();
    if(!data.session){showAuth(true); return null;}
    showAuth(false);
    const {data:row,error}=await client.from('shop_data').select('payload').eq('user_id',data.session.user.id).maybeSingle();
    if(error) throw error;
    client.channel('shop-data').on('postgres_changes',{event:'UPDATE',schema:'public',table:'shop_data',filter:`user_id=eq.${data.session.user.id}`},p=>{if(p.new?.payload){localStorage.setItem('bulbe-tech-data-v1',JSON.stringify(p.new.payload)); location.reload();}}).subscribe();
    return row?.payload||null;
  }, async save(payload){if(!client)return;const {data}=await client.auth.getSession();if(!data.session)return;await client.from('shop_data').upsert({user_id:data.session.user.id,payload,updated_at:new Date().toISOString()});}, async logout(){if(client)await client.auth.signOut(); showAuth(true);}};
  function loadScript(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)})}
  function showAuth(show){const g=document.getElementById('authGate');if(g)g.classList.toggle('hidden',!show)}
  function msg(t){const e=document.getElementById('authMessage');if(e)e.textContent=t||''}
  function wireAuth(){
    if(document.body.dataset.authWired)return; document.body.dataset.authWired='1';
    const login=document.getElementById('loginForm'), signup=document.getElementById('signupForm');
    document.getElementById('showSignup')?.addEventListener('click',()=>{document.getElementById('authModeLogin').classList.add('hidden');document.getElementById('authModeSignup').classList.remove('hidden');msg('')});
    document.getElementById('showLogin')?.addEventListener('click',()=>{document.getElementById('authModeSignup').classList.add('hidden');document.getElementById('authModeLogin').classList.remove('hidden');msg('')});
    login?.addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(e.target);msg('Connexion…');const {error}=await client.auth.signInWithPassword({email:f.get('email'),password:f.get('password')});if(error){msg(error.message);return} location.reload()});
    signup?.addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(e.target);msg('Création…');const {error}=await client.auth.signUp({email:f.get('email'),password:f.get('password')});if(error){msg(error.message);return}msg('Compte créé. Vérifiez votre email si la confirmation est activée.');});
  }
})();
