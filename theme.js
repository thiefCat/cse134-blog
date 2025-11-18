const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
} else {
  toggleBtn.textContent = '🌙';
}

toggleBtn.style.display = 'block';

function updateThemeDOM(isDark) {
  if (isDark) {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    toggleBtn.textContent = '🌙';
  }
}

toggleBtn.addEventListener('click', () => {
  const willBeDark = !body.classList.contains('dark-mode');

  if (!document.startViewTransition) {
    updateThemeDOM(willBeDark);
  } else {
    document.startViewTransition(() => {
      updateThemeDOM(willBeDark);
    });
  }

  localStorage.setItem('theme', willBeDark ? 'dark' : 'light');
});
