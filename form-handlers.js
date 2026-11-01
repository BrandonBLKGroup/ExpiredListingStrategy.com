// SPARTAN 4: Form handlers for ExpiredListingStrategy.com
// Wired to Supabase sellers table and email capture

const SUPABASE_URL = 'https://fzlwkbhpsklsgkinwljt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_CFtMUXYsGLfSb7QT1GEbQg_G_Buhvfx';

// Email capture (for PDF download)
function captureEmail(e) {
  e.preventDefault();
  const form = e.target;
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value;
  
  // Show success message
  const doneMsg = document.getElementById('emaildone');
  if (doneMsg) {
    doneMsg.style.display = 'block';
  }
  
  // Disable form
  form.querySelectorAll('input, button').forEach(el => el.disabled = true);
  
  // Send to Supabase (email_captures table or similar)
  fetch(`${SUPABASE_URL}/rest/v1/sellers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      email: email,
      source: 'ExpiredListingStrategy.com - PDF Download',
      created_at: new Date().toISOString()
    })
  }).catch(err => console.error('Email capture error:', err));
  
  return false;
}

// Lead form (main strategy call form)
function captureLead(e) {
  e.preventDefault();
  const form = e.target;
  
  const name = document.getElementById('f-name').value;
  const phone = document.getElementById('f-phone').value;
  const address = document.getElementById('f-addr').value;
  
  // Show success message
  document.getElementById('leaddone').style.display = 'block';
  
  // Disable form
  form.querySelectorAll('input, button').forEach(el => el.disabled = true);
  
  // Send to Supabase sellers table
  fetch(`${SUPABASE_URL}/rest/v1/sellers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      address: address || 'Not provided',
      source: 'ExpiredListingStrategy.com',
      created_at: new Date().toISOString()
    })
  }).then(response => {
    if (response.ok) {
      console.log('Lead captured successfully');
    }
  }).catch(err => console.error('Lead capture error:', err));
  
  return false;
}

// Exit intent popup
var shown = false;
document.addEventListener('mouseout', function(ev) {
  if (!shown && ev.clientY <= 0 && !ev.relatedTarget) {
    shown = true;
    document.getElementById('exitpop').style.display = 'flex';
  }
});

// Close popup
function closePopup() {
  document.getElementById('exitpop').style.display = 'none';
}
