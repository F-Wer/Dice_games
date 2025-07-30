(function() {
  const impPlayersList = document.getElementById('imposter-players');
  const impAddBtn = document.getElementById('imposter-add-player');
  const impInput = document.getElementById('imposter-player-name');
  const impStartBtn = document.getElementById('imposter-start');
  const impDisplay = document.getElementById('imposter-display');
  const impCategory = document.getElementById('imposter-category');
  const impWord = document.getElementById('imposter-word');
  const impCurrent = document.getElementById('imposter-current');
  const impNextBtn = document.getElementById('imposter-next');

  impAddBtn.textContent = t('addPlayer');
  impInput.placeholder = t('playerName');
  impStartBtn.textContent = t('startGame');
  impNextBtn.textContent = t('nextPlayer');

  let impPlayers = utils.load('imposterPlayers', []);
  let round = null;

  function saveImp() { utils.save('imposterPlayers', impPlayers); }

  function renderImpPlayers() {
    impPlayersList.innerHTML = '';
    impPlayers.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p.name;
      impPlayersList.appendChild(li);
    });
  }

  function randomPair() {
    return window.imposterData.randomPair();
  }

  impAddBtn.addEventListener('click', () => {
    const name = impInput.value.trim();
    if (name) {
      impPlayers.push({ name });
      impInput.value = '';
      saveImp();
      renderImpPlayers();
    }
  });

  impStartBtn.addEventListener('click', () => {
    if (impPlayers.length === 0) return;
    const pair = randomPair();
    const impIndex = Math.floor(Math.random() * impPlayers.length);
    const startIdx = Math.floor(Math.random() * impPlayers.length);
    round = { pair, impIndex, startIdx, idx: 0 };
    impDisplay.style.display = 'block';
    showNext();
  });

  function showNext() {
    if (!round) return;
    if (round.idx >= impPlayers.length) {
      impDisplay.style.display = 'none';
      round = null;
      return;
    }
    const playerIndex = (round.startIdx + round.idx) % impPlayers.length;
    const current = impPlayers[playerIndex];
    impCurrent.textContent = current.name;
    impCategory.textContent = round.pair.category;
    impWord.textContent = playerIndex === round.impIndex ? 'IMPOSTER' : round.pair.word;
    round.idx++;
  }

  impNextBtn.addEventListener('click', showNext);

  renderImpPlayers();
})();
