var socket = io();
var jackpots = document.getElementById('jackpots');
var test = document.getElementById('test');
test.textContent = "working"
socket.on('new machine', function(jackpot) {
var item = document.createElement('li');
   item.textContent = jackpot;
   jackpots.appendChild(item);
   window.scrollTo(0, document.body.scrollHeight);
});