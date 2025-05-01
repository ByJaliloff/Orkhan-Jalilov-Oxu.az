
const desktopMenu = document.getElementById('mobileMenuDesktop');
const menuToggle = document.getElementById('menuToggle');
const menuIcon = document.getElementById('menuIcon');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isHidden = desktopMenu.classList.contains('hidden');

    if (isHidden) {
      desktopMenu.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      setTimeout(() => {
        desktopMenu.classList.remove('scale-y-0');
        desktopMenu.classList.add('scale-y-100');
      }, 10);
      menuIcon.classList.replace('fa-bars', 'fa-times');
    } else {
      desktopMenu.classList.replace('scale-y-100', 'scale-y-0');
      menuIcon.classList.replace('fa-times', 'fa-bars');
      document.body.classList.remove('overflow-hidden');
      setTimeout(() => {
        desktopMenu.classList.add('hidden');
      }, 500);
    }
  });
}


const mobileMenu = document.getElementById('mobileMenuMobile');
const openBtn = document.getElementById('menuToggleOpen');
const closeBtn = document.getElementById('menuToggleClose');
const headerDiv = document.getElementById('menu'); 

if (openBtn) {
openBtn.addEventListener('click', () => {
mobileMenu.classList.remove('hidden');
document.body.classList.add('overflow-hidden');

if (headerDiv) {

  headerDiv.classList.add('hidden'); 
  headerDiv.style.position = 'static'; 
}

setTimeout(() => {
  mobileMenu.classList.replace('scale-y-0', 'scale-y-100');
}, 10);
});
}

if (closeBtn) {
closeBtn.addEventListener('click', () => {
mobileMenu.classList.replace('scale-y-100', 'scale-y-0');
document.body.classList.remove('overflow-hidden');

if (headerDiv) {
  headerDiv.classList.remove('hidden'); 
  headerDiv.style.position = ''; 
}

setTimeout(() => {
  mobileMenu.classList.add('hidden');
}, 500);
});
}