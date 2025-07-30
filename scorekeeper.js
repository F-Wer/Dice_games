(function() {
  const playersList = document.getElementById('players');
  const addPlayerBtn = document.getElementById('add-player');
  const playerNameInput = document.getElementById('player-name');
  const resetBtn = document.getElementById('reset');

  addPlayerBtn.textContent = t('addPlayer');
  playerNameInput.placeholder = t('playerName');
  resetBtn.textContent = t('resetGame');

  let players = utils.load('skPlayers', []);
  players.forEach(p => { if (!p.history) p.history = []; });

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

      li.appendChild(span);
      li.appendChild(input);
      li.appendChild(addBtn);

      const hist = document.createElement('ul');
      hist.className = 'history';
      player.history.forEach(h => {
        const item = document.createElement('li');
        item.textContent = (h > 0 ? '+' : '') + h;
        hist.appendChild(item);
      });
      li.appendChild(hist);

      playersList.appendChild(li);
    });
  }

  function updateScore(index, delta) {
    players[index].score += delta;
    players[index].history.push(delta);
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

  render();
})();
