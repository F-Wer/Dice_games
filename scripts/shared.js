(function() {
  let lang = localStorage.getItem('lang');
  if (!lang) {
    const nav = navigator.language.slice(0, 2).toLowerCase();
    lang = translations[nav] ? nav : 'de';
    localStorage.setItem('lang', lang);
  }

  const gameSelect = document.getElementById('game-select');
  const scorekeeperDiv = document.getElementById('scorekeeper');
  const imposterDiv = document.getElementById('imposter-game');
  const langSelect = document.getElementById('lang-select');

  function t(key) {
    return (translations[lang] && translations[lang][key]) || key;
  }
  window.t = t;

  function applyTexts() {
    document.documentElement.lang = lang;
    document.title = t('appTitle');
    document.getElementById('app-title').textContent = t('appTitle');
    gameSelect.querySelector('option[value="scorekeeper"]').textContent = t('scorekeeper');
    gameSelect.querySelector('option[value="imposter"]').textContent = t('imposter');
    if (window.scorekeeperTexts) window.scorekeeperTexts();
    if (window.imposterTexts) window.imposterTexts();
  }
  window.applyTexts = applyTexts;

  function setLang(newLang) {
    lang = newLang;
    localStorage.setItem('lang', lang);
    applyTexts();
  }
  window.setLang = setLang;

  if (langSelect) {
    langSelect.value = lang;
    langSelect.addEventListener('change', () => setLang(langSelect.value));
  }

  window.switchGame = function(mode) {
    scorekeeperDiv.style.display = mode === 'scorekeeper' ? 'block' : 'none';
    imposterDiv.style.display = mode === 'imposter' ? 'block' : 'none';
  };

  gameSelect.addEventListener('change', () => window.switchGame(gameSelect.value));

  window.utils = {
    save(key, data) { localStorage.setItem(key, JSON.stringify(data)); },
    load(key, fallback) {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }
  };

  applyTexts();
  window.switchGame(gameSelect.value);
})();
