
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.getElementById('toggleSidebar');

// Toggle au clic
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Ouverture au survol
sidebar.addEventListener('mouseenter', () => {
  sidebar.classList.add('open');
});
sidebar.addEventListener('mouseleave', () => {
  sidebar.classList.remove('open');
});
