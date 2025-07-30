(function() {
  const playersList = document.getElementById('players');
  const addPlayerBtn = document.getElementById('add-player');
  const playerNameInput = document.getElementById('player-name');
  const resetBtn = document.getElementById('reset');
  const diceToggle = document.getElementById('dice-toggle');
  const diceOverlay = document.getElementById('dice-overlay');
  const dice = document.getElementById('dice');
  const diceResult = document.getElementById('dice-result');

  function applyTexts() {
    addPlayerBtn.textContent = t('addPlayer');
    playerNameInput.placeholder = t('playerName');
    resetBtn.textContent = t('resetGame');
    if (diceToggle) diceToggle.textContent = t('dice');
    render();
  }
  window.scorekeeperTexts = applyTexts;

  let players = utils.load('skPlayers', []);
  players.forEach(p => { if (!p.history) p.history = []; });

  applyTexts();

  function save() {
    utils.save('skPlayers', players);
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

      const removeBtn = document.createElement('button');
      removeBtn.textContent = t('remove');
      removeBtn.addEventListener('click', () => removePlayer(index));
      li.appendChild(span);
      li.appendChild(input);
      li.appendChild(addBtn);
      li.appendChild(removeBtn);

      playersList.appendChild(li);
    });
    renderHistory();
  }

  function renderHistory() {
    const container = document.getElementById('history-container');
    const maxRounds = players.reduce((m, p) => Math.max(m, p.history.length), 0);
    if (maxRounds === 0) {
      container.innerHTML = '';
      return;
    }
    const table = document.createElement('table');
    table.id = 'history-table';
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    const firstTh = document.createElement('th');
    firstTh.textContent = t('round');
    headRow.appendChild(firstTh);
    players.forEach(p => {
      const th = document.createElement('th');
      th.textContent = p.name;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let i = 0; i < maxRounds; i++) {
      const tr = document.createElement('tr');
      const roundTd = document.createElement('td');
      roundTd.textContent = i + 1;
      tr.appendChild(roundTd);
      players.forEach(p => {
        const td = document.createElement('td');
        const val = p.history[i];
        td.textContent = val === undefined ? '' : (val > 0 ? '+' + val : val);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    const tfoot = document.createElement('tfoot');
    const footRow = document.createElement('tr');
    const sumTh = document.createElement('th');
    sumTh.textContent = t('total');
    footRow.appendChild(sumTh);
    players.forEach(p => {
      const th = document.createElement('th');
      th.textContent = p.score;
      footRow.appendChild(th);
    });
    tfoot.appendChild(footRow);
    table.appendChild(tfoot);

    container.innerHTML = '';
    const title = document.createElement('p');
    title.textContent = t('history');
    container.appendChild(title);
    container.appendChild(table);
  }

  function updateScore(index, delta) {
    players[index].score += delta;
    players[index].history.push(delta);
    save();
    render();
  }

  function removePlayer(index) {
    players.splice(index, 1);
    save();
    render();
  }

  addPlayerBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (name) {
      players.push({ name, score: 0, history: [] });
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

  function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = result;
    const rotations = [
      'rotateX(0deg) rotateY(0deg)',
      'rotateX(-90deg) rotateY(0deg)',
      'rotateY(90deg) rotateX(0deg)',
      'rotateY(-90deg) rotateX(0deg)',
      'rotateX(90deg) rotateY(0deg)',
      'rotateX(180deg) rotateY(0deg)'
    ];
    dice.style.transform = rotations[result - 1];
  }

  if (diceToggle) {
    diceToggle.addEventListener('click', () => {
      diceOverlay.style.display = 'flex';
      rollDice();
    });
    diceOverlay.addEventListener('click', () => {
      diceOverlay.style.display = 'none';
    });
    dice.addEventListener('click', rollDice);
  }

  render();
})();
