// INICIALIZAÇÃO EMAILJS (Substitua pela sua chave)
(function () {
  emailjs.init("vnR_T0uhvyaABuu-v");
})();

const questions = [
  "Fico constrangido quando tenho de enfrentar alguém para resolver um problema.",
  "Eu perco a paciência com facilidade, pois sou do tipo 'pavio curto'.",
  "Quando alguém é irônico e sarcástico comigo, eu reajo da mesma forma com ele.",
  "Prefiro que as pessoas percebam o que eu desejo ou preciso do que eu ter de dizer a elas.",
  "É importante para mim obter o que preciso e desejo, nem que com isso possa magoar outra pessoa.",
  "Não me incomodo em admitir meu erro perante os outros.",
  "Expresso minha discordância das opiniões das pessoas, em geral, sem dificuldade.",
  "Quando preciso me impor junto a outra pessoa, a forma que normalmente uso é aumentar o tom de voz e olhar penetrante.",
  "Quando algo sai errado, acho um bode expiatório.",
  "Para mim, é importante conquistar a simpatia das pessoas, mesmo que para isso eu tenha que fazer coisas que normalmente não faria.",
  "Tenho habilidade em resolver satisfatoriamente a maioria dos conflitos com outras pessoas.",
  "Tenho dificuldade em dizer não aos pedidos que as pessoas me fazem, e me sinto culpado quando digo.",
  "Quando necessário, sou duro e inflexível e não dou explicações sobre minhas decisões.",
  "Sou objetivo e sempre falo a verdade, doa a quem doer.",
  "Prefiro ficar quieto e não expressar minhas opiniões.",
  "Quando preciso, sinto-me à vontade para pedir ajuda do outro.",
  "Quando alguém faz uma crítica, prefiro ficar quieto para não gerar conflito.",
  "Eu fico constrangido quando alguém me dá um presente.",
  "Quando eu falo algo é porque tenho certeza. Por isso fico irritado com a pessoa que discorda de mim.",
  "Expresso meus sentimentos franca e honestamente, sem constrangimento.",
  "Gosto de pedir feedback para saber se o outro concorda ou discorda do meu ponto de vista.",
  "Quando tenho dúvidas, evito fazer perguntas por medo de parecer ridículo.",
  "Percebo que, frequentemente, as pessoas tiram vantagens de mim.",
  "Gosto de iniciar conversas com desconhecidos.",
  "Quando alguém é agressivo, fico chocado e não consigo reagir.",
  "Eu me sinto uma pessoa importante, competente e querida.",
  "Sou espontâneo e afetuoso com as pessoas de que gosto.",
  "Quando vejo que um vendedor se esforçou em mostrar suas mercadorias, sinto dificuldade de dizer 'Não quero nenhuma', se for o caso.",
  "Quando faço algo que considero bom, faço com que as pessoas saibam disso.",
  "Se alguém fala a terceiros algo a meu respeito que não me agrada, procuro-o logo para conversar sobre o assunto e mostrar minha insatisfação.",
  "Quando alguém faz uma crítica, procuro rapidamente mudar meu comportamento para adequar-me à situação.",
  "Percebo que as pessoas levam em conta minhas opiniões.",
  "Eu me envolvo facilmente com os problemas dos outros e assumo a responsabilidade em ajudá-los na solução.",
  "Sinto-me mais confortável em ajudar os outros do que ser ajudado.",
  "Tenho mais facilidade para criticar do que elogiar.",
  "Quando alguém me elogia, fico constrangido e digo que não fiz mais do que minha obrigação.",
];

const scoring = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [3, 2, 1],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [3, 2, 1],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [3, 2, 1],
  [3, 2, 1],
  [1, 2, 3],
  [1, 2, 3],
  [3, 2, 1],
  [1, 2, 3],
  [3, 2, 1],
  [3, 2, 1],
  [1, 2, 3],
  [3, 2, 1],
  [3, 2, 1],
  [1, 2, 3],
  [3, 2, 1],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];
const answers = new Array(36).fill(null);

const qList = document.getElementById("questions-list");
const calcBtn = document.getElementById("calc-btn");

function init() {
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question-card";
    div.innerHTML = `
            <div class="q-header"><div class="q-num">${i + 1}</div><p>${q}</p></div>
            <div class="options">
                <button onclick="setAns(${i},0)" id="b-${i}-0" class="opt-btn">Quase Sempre</button>
                <button onclick="setAns(${i},1)" id="b-${i}-1" class="opt-btn">Com Frequência</button>
                <button onclick="setAns(${i},2)" id="b-${i}-2" class="opt-btn">Raramente</button>
            </div>`;
    qList.appendChild(div);
  });
}

window.setAns = (q, a) => {
  answers[q] = a;
  const cls = ["selected-qs", "selected-cf", "selected-ra"];
  [0, 1, 2].forEach(
    (i) =>
      (document.getElementById(`b-${q}-${i}`).className =
        "opt-btn" + (i === a ? " " + cls[i] : "")),
  );

  const done = answers.filter((x) => x !== null).length;
  document.getElementById("progress-text").innerText =
    `${done} de 36 respondidas`;
  document.getElementById("progress-fill").style.width =
    `${(done / 36) * 100}%`;
};

calcBtn.onclick = () => {
  const email = document.getElementById("user_email").value;
  if (!email || answers.includes(null)) {
    document.getElementById("error-msg").style.display = "block";
    return;
  }

  const total = answers.reduce((s, a, i) => s + scoring[i][a], 0);
  let level = "";
  if (total <= 36) level = "Baixa Assertividade";
  else if (total <= 72) level = "Média Assertividade";
  else if (total <= 85) level = "Boa Assertividade";
  else level = "Excelente Assertividade";

  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("result-panel").style.display = "block";
  document.getElementById("result-container").innerHTML = `
        <div class="score-circle">${total}</div>
        <h2>${level}</h2>
        <p style="margin: 20px 0; color: var(--muted)">Obrigado por participar! Um relatório foi enviado para seu e-mail.</p>`;

  // ENVIO DE E-MAIL (Substitua os IDs)
  emailjs
    .send("service_njtss3e", "template_8az22nj", {
      to_email: email,
      score: total,
      level: level,
    })
    .then(
      function (response) {
        console.log("Sucesso!", response.status, response.text);
      },
      function (error) {
        console.log("Falha...", error);
      },
    );
};

init();
