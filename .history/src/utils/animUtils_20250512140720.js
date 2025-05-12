export function lancerAnimationCriDeGuerreAoE(sourceCardId) {
  const source = document.querySelector(`[data-id='${sourceCardId}']`);
  if (!source) return;

  const sourceRect = source.getBoundingClientRect();

  const aura = document.createElement("div");
  aura.className = "cri-de-guerre-aura";
  aura.style.left = `${sourceRect.left + sourceRect.width / 2}px`;
  aura.style.top = `${sourceRect.top + sourceRect.height / 2}px`;

  document.body.appendChild(aura);

  setTimeout(() => {
    aura.remove();
  }, 800);
}

export function lancerAnimationCriDeGuerreUnique(sourceCardId, targetCardId) {
  const source = document.querySelector(`[data-id='${sourceCardId}']`);
  const target = document.querySelector(`[data-id='${targetCardId}']`);

  if (!source || !target) return;

  // 1. Aura circulaire sur la source
  const sourceRect = source.getBoundingClientRect();
  const aura = document.createElement("div");
  aura.className = "cri-de-guerre-aura";
  aura.style.left = `${sourceRect.left + sourceRect.width / 2}px`;
  aura.style.top = `${sourceRect.top + sourceRect.height / 2}px`;
  document.body.appendChild(aura);

  // Nettoyage de l'aura après 0.6s
  setTimeout(() => {
    aura.remove();
  }, 800);

  // 2. Glow temporaire sur la cible après un petit délai
  setTimeout(() => {
    target.classList.add("cri-de-guerre-glow-target");
    setTimeout(() => {
      target.classList.remove("cri-de-guerre-glow-target");
    }, 600); // durée de l'animation
  }, 400); // délai pour laisser le temps à l’aura d’apparaître
}

export function parseCarteTexte(texte) {
  const elements = [];
  const regex = /(<b>.*?<\/b>|<color=(.*?)>(.*?)<\/color>|<br>)/g;

  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(texte)) !== null) {
    // Texte avant la balise
    if (match.index > lastIndex) {
      elements.push(<span key={key++}>{texte.slice(lastIndex, match.index)}</span>);
    }

    if (match[0].startsWith('<b>')) {
      elements.push(
        <strong key={key++}>{match[0].replace('<b>', '').replace('</b>', '')}</strong>
      );
    } else if (match[0].startsWith('<color=')) {
      const color = match[2];
      const content = match[3];
      elements.push(
        <span key={key++} style={{ color }}>{content}</span>
      );
    } else if (match[0] === '<br>') {
      elements.push(<br key={key++} />);
    }

    lastIndex = regex.lastIndex;
  }

  // Texte après la dernière balise
  if (lastIndex < texte.length) {
    elements.push(<span key={key++}>{texte.slice(lastIndex)}</span>);
  }

  return elements;
}

