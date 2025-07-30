(function() {
  const playersList = document.getElementById('players');
  const addPlayerBtn = document.getElementById('add-player');
  const playerNameInput = document.getElementById('player-name');
  const resetBtn = document.getElementById('reset');

  let players = JSON.parse(localStorage.getItem('players') || '[]');

  function save() {
    localStorage.setItem('players', JSON.stringify(players));
  }

  function render() {
    playersList.innerHTML = '';
    players.forEach((player, index) => {
      const li = document.createElement('li');
      li.className = 'player';

      const span = document.createElement('span');
      span.textContent = `${player.name}: ${player.score}`;
      span.className = 'player-name';

      const addBtn = document.createElement('button');
      addBtn.textContent = '+50';
      addBtn.addEventListener('click', () => updateScore(index, 50));

      const subBtn = document.createElement('button');
      subBtn.textContent = '-50';
      subBtn.addEventListener('click', () => updateScore(index, -50));

      li.appendChild(span);
      li.appendChild(addBtn);
      li.appendChild(subBtn);
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
    if (confirm('Spiel wirklich zurücksetzen?')) {
      players = [];
      save();
      render();
    }
  });

  render();
})();
