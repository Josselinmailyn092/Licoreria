const menu = document.querySelector('.menu');
let lineTop = document.querySelector('.line1')
let line = document.querySelector('.line2')
let lineButton = document.querySelector('.line3')

menu.addEventListener('click', ()=>{
    lineTop.classList.toggle('top');
    line.classList.toggle('centro');
    lineButton.classList.toggle('button');

})