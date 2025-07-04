import { PALAVRAS_RUINS } from "./palavrasRuins.js";

const botao = document.querySelector('#botao-palavrachave');

botao.addEventListener('click', () => {
  const texto = document.querySelector('#entrada-de-texto').value;
  const resultado = document.querySelector('#resultado-palavrachave');

  const palavras = extrairPalavrasChave(texto);

  if (palavras.length > 0) {
    resultado.textContent = `>>> Palavras-chave encontradas:\n\n${palavras.join("\n")}`;
  } else {
    resultado.textContent = ">>> Nenhuma palavra relevante encontrada.";
  }
});

function extrairPalavrasChave(texto) {
  let palavras = texto.split(/\P{L}+/u).map(p => p.toLowerCase());
  palavras = palavras.filter(p => !PALAVRAS_RUINS.has(p) && p.length > 2);

  const frequencias = {};
  palavras.forEach(p => {
    frequencias[p] = (frequencias[p] || 0) + 1;
  });

  return Object.keys(frequencias)
    .sort((a, b) => frequencias[b] - frequencias[a])
    .slice(0, 10);
}
