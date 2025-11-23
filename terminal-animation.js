
// --- Terminal typing animation ---
(function () {
  const sequence = [
    {
      prompt: 'ilyes@bts-ciel',
      cwd: '~',
      cmd: 'qui suis-je?',
      out: 'Joy Boy et un Étudiant BTS CIEL — Cybersécurité & Réseaux'
    },
    {
      prompt: 'ilyes@bts-ciel',
      cwd: '~',
      cmd: 'Ce que je cherche',
      out: 'Alternance technicien informatique / cybersécurité (3j entreprise)'
    },
    {
      prompt: 'ilyes@bts-ciel',
      cwd: '~',
      cmd: 'Mes qualités',
      out: 'Organisation • Communication • Initiative • Travail d’équipe'
    }
  ];

  const config = {
    typeSpeed: 38,     // vitesse d’écriture (ms par caractère)
    startDelay: 38,   // délai avant la première ligne
    betweenLines: 38, // délai avant la sortie
    loop: true        // true pour relancer en boucle
  };

  const body = document.getElementById('terminalBody');

  function createCmdLine(item) {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML =
      `<span class="prompt">${item.prompt}</span>:<span class="cwd">${item.cwd}</span>$ ` +
      `<span class="typed"></span><span class="cursor" aria-hidden="true"></span>`;
    return line;
  }

  function createEnterLine() {
    const enter = document.createElement('div');
    enter.className = 'line enter';
    enter.textContent = '↵';
    return enter;
  }

  function createOutLine(text) {
    const out = document.createElement('div');
    out.className = 'line output';
    out.textContent = text;
    return out;
  }

  function typeText(el, text, speed) {
    return new Promise(resolve => {
      let i = 0;
      const cursor = el.parentElement.querySelector('.cursor');
      const timer = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(timer);
          setTimeout(() => {
            cursor.classList.add('idle');
            resolve();
          }, 120);
        }
      }, speed);
    });
  }

  async function runSequence() {
    body.innerHTML = '';

    for (let idx = 0; idx < sequence.length; idx++) {
      const item = sequence[idx];

      const cmdLine = createCmdLine(item);
      body.appendChild(cmdLine);

      const typed = cmdLine.querySelector('.typed');
      await new Promise(r => setTimeout(r, idx === 0 ? config.startDelay : 220));
      await typeText(typed, item.cmd, config.typeSpeed);

      // Simuler Entrée
      const enterLine = createEnterLine();
      body.appendChild(enterLine);
      await new Promise(r => setTimeout(r, 300));

      // Afficher la sortie
      const outLine = createOutLine(item.out);
      body.appendChild(outLine);
      requestAnimationFrame(() => outLine.classList.add('show'));

      await new Promise(r => setTimeout(r, config.betweenLines));
    }

    if (config.loop) {
      await new Promise(r => setTimeout(r, 1600));
      runSequence();
    }
  }

  runSequence();

  // Relancer au clic
  const terminal = body.closest('.terminal');
  if (terminal) {
    terminal.addEventListener('click', () => {
      if (!config.loop) runSequence();
    });
  }
})();
