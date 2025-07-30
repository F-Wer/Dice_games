(function() {
  const lang = 'de';
  const t = key => (translations[lang] && translations[lang][key]) || key;
  window.t = t;

  document.title = t('appTitle');
  document.getElementById('app-title').textContent = t('appTitle');

  const gameSelect = document.getElementById('game-select');
  const scorekeeperDiv = document.getElementById('scorekeeper');
  const imposterDiv = document.getElementById('imposter-game');

  gameSelect.querySelector('option[value="scorekeeper"]').textContent = t('scorekeeper');
  gameSelect.querySelector('option[value="imposter"]').textContent = t('imposter');

  window.switchGame = function(mode) {
    scorekeeperDiv.style.display = mode === 'scorekeeper' ? 'block' : 'none';
    imposterDiv.style.display = mode === 'imposter' ? 'block' : 'none';
  };

  gameSelect.addEventListener('change', () => window.switchGame(gameSelect.value));
  window.switchGame(gameSelect.value);

  window.utils = {
    save(key, data) { localStorage.setItem(key, JSON.stringify(data)); },
    load(key, fallback) {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }
  };
})();
