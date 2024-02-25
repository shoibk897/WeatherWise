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