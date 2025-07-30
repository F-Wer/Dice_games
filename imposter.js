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
  const impResetBtn = document.getElementById('imposter-reset');

  impAddBtn.textContent = t('addPlayer');
  impInput.placeholder = t('playerName');
  impStartBtn.textContent = t('startGame');
  impNextBtn.textContent = t('nextPlayer');
  impResetBtn.textContent = t('resetGame');

  let impPlayers = utils.load('imposterPlayers', []);
  impPlayers.forEach(p => {
    if (!('revealed' in p)) p.revealed = false;
  });
  let round = null;

  function saveImp() { utils.save('imposterPlayers', impPlayers); }

  function renderImpPlayers(highlightIndex = null) {
    impPlayersList.innerHTML = '';
    impPlayers.forEach((p, i) => {
      const li = document.createElement('li');
      li.className = 'player';
      if (highlightIndex === i) li.classList.add('current-player');

      const span = document.createElement('span');
      span.textContent = p.name;
      span.className = 'player-name';

      const removeBtn = document.createElement('button');
      removeBtn.textContent = t('remove');
      removeBtn.addEventListener('click', () => {
        impPlayers.splice(i, 1);
        saveImp();
        renderImpPlayers();
      });

      li.appendChild(span);
      li.appendChild(removeBtn);

      // No extra info below the player name while revealing

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
    impPlayers = impPlayers.map((p, i) => ({
      name: p.name,
      category: pair.category,
      word: i === impIndex ? 'IMPOSTER' : pair.word,
      revealed: false
    }));
    saveImp();
    round = { impIndex, startIdx, idx: 0 };
    impDisplay.style.display = 'block';
    renderImpPlayers();
    showNext();
  });

  function showNext() {
    if (!round) return;
    if (round.idx >= impPlayers.length) {
      impDisplay.style.display = 'none';
      round = null;
      renderImpPlayers();
      return;
    }
    const playerIndex = (round.startIdx + round.idx) % impPlayers.length;
    const current = impPlayers[playerIndex];
    current.revealed = true;
    impCurrent.textContent = current.name;
    impCategory.textContent = current.category;
    impWord.textContent = current.word;
    renderImpPlayers(playerIndex);
    round.idx++;

    if (round.idx >= impPlayers.length) {
      impNextBtn.textContent = t('done');
    } else {
      const nextName = impPlayers[(round.startIdx + round.idx) % impPlayers.length].name;
      impNextBtn.textContent = `${t('nextPlayer')}: ${nextName}`;
    }
  }

  impNextBtn.addEventListener('click', showNext);

  impResetBtn.addEventListener('click', () => {
    if (confirm(t('resetGame') + '?')) {
      impPlayers = [];
      saveImp();
      impDisplay.style.display = 'none';
      round = null;
      renderImpPlayers();
    }
  });

  renderImpPlayers();
})();