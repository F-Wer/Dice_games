(function() {
  const skBtn = document.getElementById('scorekeeper-help');
  const impBtn = document.getElementById('imposter-help');

  if (skBtn) {
    skBtn.textContent = t('showRules');
    skBtn.addEventListener('click', () => alert(t('rulesScorekeeper')));
  }

  if (impBtn) {
    impBtn.textContent = t('showRules');
    impBtn.addEventListener('click', () => alert(t('rulesImposter')));
  }
})();
