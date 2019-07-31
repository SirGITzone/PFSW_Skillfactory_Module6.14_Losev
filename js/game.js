const numDivs = 36;
const maxHits = 10;

let hits = 0;
let slip = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый +++
  $('.col').removeClass("target");
  let divSelector = randomDivId();
 
  $(divSelector).addClass("target"); 
  $(divSelector).text(hits+1);
  // TODO: помечать target текущим номером +++

  // FIXME: тут надо определять при первом клике firstHitTime +++
  // if (hits === 1) {
  //   firstHitTime = firstHitTime + getTimestamp()
  // }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала +++
  $('.row').hide()
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let points = hits - slip;
  $("#total-time-played").text(totalPlayedSeconds);
  $("#slip-header").text(points);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? +++
  $('.target').text("");
  if ($(event.target).hasClass("target")) {
    $(".game-field").removeClass('miss');
    hits = hits + 1;
    round();
  }
  else  {
    $(event.target).addClass("miss")
    slip = slip + 1; 
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss +++
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке+++
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$("#button-reload").click(function() {
  firstHitTime = firstHitTime + getTimestamp();
  init();
});

$("#new-game").click(function() {
  location.reload();
})
