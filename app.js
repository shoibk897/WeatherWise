let intro = document.querySelector('.intro-animation');
let logo = document.querySelector('.intro-box');
let logospan = document.querySelectorAll('.intro-logo');

window.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {

        logospan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        setTimeout(()=>{
            logospan.forEach((span,idx)=>{

                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                },(idx + 1) * 50)
            })
        },2000);

        setTimeout(()=>{
            intro.style.top ='-100vh';
        },2300);
    })
});


document.addEventListener("mousemove", (e) => {
    const circle = document.getElementById("circle");
    const circleSize = circle.offsetWidth; 
    const mouse_x = e.clientX;
    const mouse_y = e.clientY;
    circle.style.left = `${mouse_x - circleSize}px`; 
    circle.style.top = `${mouse_y - circleSize}px`; 
});


document.getElementById("year").innerHTML = new Date().getFullYear();
