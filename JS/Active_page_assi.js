const navLinks = document.querySelectorAll('.navbar a');
const currentPage = window.location.pathname.replace(/\/$/, '').toLowerCase();
navLinks.forEach(link => {
  if (link.dataset.page === 'home' && (currentPage === '' || currentPage === '/index.html')) {
    link.classList.add('active');
  } else if (link.href.includes(currentPage)) {
    link.classList.add('active');
  }
});
