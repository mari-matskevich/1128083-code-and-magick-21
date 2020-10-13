'use strict';

const CLOUD_WIDTH = 420; // Длина облака
const CLOUD_HEIGHT = 270; // Ширина облака
const CLOUD_X = 100;
const CLOUD_Y = 10;
const OFFSET = 10; // Смещение тени облака
const OFFSET_A = 70;
const BAR_HEIGHT = 150; // Высота гистограммы
const BAR_WIDTH = 40; // Ширина колонки
const BAR_OFFSET = 10;
const GAP = 50; // Расстояние между колонками
const FONT = "16px PT Mono";
const COLOR_BLACK = '#000';

const renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const displayBar = function(ctx, x, y, score, name, element) {
  const roundedScore = Math.round(score);
  const saturationValue = Math.floor(Math.random() * 50 + 10);
  const tempBarHeight = score * BAR_HEIGHT / element;

  ctx.fillStyle = COLOR_BLACK;
  ctx.fillText(roundedScore, x + OFFSET * 5, y + OFFSET_A + (BAR_HEIGHT - tempBarHeight));

  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'hsl(226, 81%,' + saturationValue + '%)';
  }
  ctx.fillRect(x + OFFSET * 5, y + OFFSET_A + BAR_OFFSET + (BAR_HEIGHT - tempBarHeight), BAR_WIDTH, tempBarHeight);

  ctx.fillStyle = COLOR_BLACK;
  ctx.fillText(name, x + OFFSET * 5, y + OFFSET_A + BAR_HEIGHT + BAR_OFFSET * 3);
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + OFFSET, CLOUD_Y + OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

ctx.font = FONT;
ctx.fillStyle = COLOR_BLACK;
ctx.fillText("Ура вы победили!", CLOUD_X + OFFSET * 5, CLOUD_Y + OFFSET * 3);
ctx.fillText("Список результатов:", CLOUD_X + OFFSET * 5, CLOUD_Y + OFFSET * 5);

let maxScoreInArray = function(scoreArray){
  return Math.max.apply(null, scoreArray);
  };
let maxElement = maxScoreInArray(times);

let gapOffset = 0;

names.forEach(function(playerData, i){
  displayBar(ctx, CLOUD_X + gapOffset, CLOUD_Y, times[i], playerData, maxElement);
  gapOffset += BAR_WIDTH + GAP;
});
};
