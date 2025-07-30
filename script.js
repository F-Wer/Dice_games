(function() {
  const lang = 'de';
  const t = key => (translations[lang] && translations[lang][key]) || key;

  document.title = t('appTitle');
  document.getElementById('app-title').textContent = t('appTitle');

  const gameSelect = document.getElementById('game-select');
  const scorekeeperDiv = document.getElementById('scorekeeper');
  const imposterDiv = document.getElementById('imposter-game');
  const scorekeeperHelp = document.getElementById('scorekeeper-help');
  const imposterHelp = document.getElementById('imposter-help');

  scorekeeperHelp.textContent = '?';
  imposterHelp.textContent = '?';
  scorekeeperHelp.title = t('rules');
  imposterHelp.title = t('rules');

  gameSelect.querySelector('option[value="scorekeeper"]').textContent = t('scorekeeper');
  gameSelect.querySelector('option[value="imposter"]').textContent = t('imposter');

  function switchGame(mode) {
    scorekeeperDiv.style.display = mode === 'scorekeeper' ? 'block' : 'none';
    imposterDiv.style.display = mode === 'imposter' ? 'block' : 'none';
  }

  gameSelect.addEventListener('change', () => switchGame(gameSelect.value));

  scorekeeperHelp.addEventListener('click', () => alert(t('scorekeeperRules')));
  imposterHelp.addEventListener('click', () => alert(t('imposterRules')));

  switchGame(gameSelect.value);

  // ----- Scorekeeper -----
  const playersList = document.getElementById('players');
  const addPlayerBtn = document.getElementById('add-player');
  const playerNameInput = document.getElementById('player-name');
  const resetBtn = document.getElementById('reset');

  addPlayerBtn.textContent = t('addPlayer');
  playerNameInput.placeholder = t('playerName');
  resetBtn.textContent = t('resetGame');

  let players = JSON.parse(localStorage.getItem('skPlayers') || '[]');

  function save() {
    localStorage.setItem('skPlayers', JSON.stringify(players));
  }

  function render() {
    playersList.innerHTML = '';
    players.forEach((player, index) => {
      const li = document.createElement('li');
      li.className = 'player';

      const span = document.createElement('span');
      span.textContent = `${player.name}: ${player.score}`;
      span.className = 'player-name';

      const input = document.createElement('input');
      input.type = 'number';
      input.placeholder = t('scoreAmount');

      const addBtn = document.createElement('button');
      addBtn.textContent = t('updateScore');
      addBtn.addEventListener('click', () => {
        const val = parseInt(input.value, 10);
        if (!isNaN(val)) {
          updateScore(index, val);
          input.value = '';
        }
      });

      li.appendChild(span);
      li.appendChild(input);
      li.appendChild(addBtn);
      playersList.appendChild(li);
    });
  }

  function updateScore(index, delta) {
    players[index].score += delta;
    save();
    render();
  }

  addPlayerBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (name) {
      players.push({ name, score: 0 });
      playerNameInput.value = '';
      save();
      render();
    }
  });

  resetBtn.addEventListener('click', () => {
    if (confirm(t('resetGame') + '?')) {
      players = [];
      save();
      render();
    }
  });

  render();

  // ----- Imposter game -----
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

  let impPlayers = JSON.parse(localStorage.getItem('imposterPlayers') || '[]');
  let round = null; // {pair, impIndex, idx}

  // Imposter word database is provided in imposter-data.js
  function randomPair() {
    return window.imposterData.randomPair();
  }

  function saveImp() {
    localStorage.setItem('imposterPlayers', JSON.stringify(impPlayers));
  }

  function renderImpPlayers() {
    impPlayersList.innerHTML = '';
    impPlayers.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p.name;
      impPlayersList.appendChild(li);
    });
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
    round = { pair, impIndex, idx: 0 };
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
    const current = impPlayers[round.idx];
    impCurrent.textContent = current.name;
    impCategory.textContent = round.pair.category;
    impWord.textContent = round.idx === round.impIndex ? 'IMPOSTER' : round.pair.word;
    round.idx++;
  }

  impNextBtn.addEventListener('click', showNext);

  renderImpPlayers();
})();