// FOR EFFECTS OF SIDEBAR ITEMS
document.addEventListener("DOMContentLoaded", function () {
    const lis = document.querySelectorAll('.side-items ul li');
    let lastClickedTab = localStorage.getItem('lastClickedTab');

    lis.forEach(li => {
        li.addEventListener('click', function () {
            lis.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            localStorage.setItem('lastClickedTab', this.id);
        });
    });

    if (lastClickedTab) {
        document.getElementById(lastClickedTab).click();
    } else {
        document.getElementById('tab1').click();
    }
});


//   FOR TAB FUNCTIONALITY
function openTab(tabName) {

    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function (tab) {
        tab.style.display = 'none';
    });

    var selectedTab = document.querySelector('.' + tabName);
    selectedTab.style.display = 'block';

    localStorage.setItem('lastTab', tabName);
}

document.addEventListener('DOMContentLoaded', function () {
    var lastTab = localStorage.getItem('lastTab');
    if (lastTab) {
        openTab(lastTab);
    } else {
        openTab('.main-dashboard');
    }
});


// TIME FUNCTION
function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    var meridiem = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var currentTime = hours + ' : ' + minutes + ' ' + meridiem;
    document.getElementById('current-time').textContent = currentTime;
}
setInterval(updateTime, 60000);
updateTime();

// FOR {WEEK,DATE,MONTH,YEAR}
function updateDateInfo() {

    var now = new Date();
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var weekday = weekdays[now.getDay()];
    var month = months[now.getMonth()];
    var date = now.getDate();
    var year = now.getFullYear();

    document.getElementById('week').textContent = weekday;
    document.getElementById('date').textContent = date;
    document.getElementById('month').textContent = month;
    document.getElementById('year').textContent = year;
}
updateDateInfo();

// FOR GREETING (GOOD MORINING/EVENING/NIGHT)
document.addEventListener("DOMContentLoaded", function() {
    var now = new Date();
    var hour = now.getHours();

    var images = document.querySelectorAll('.greet-img img');
    var greetingText = document.querySelector('.greet-txt');

    function hideImages() {
        images.forEach(function(image) {
            image.style.display = 'none';
        });
    }

    if (hour >= 6 && hour < 12) {
        greetingText.textContent = 'Good Morning,';
        hideImages();
        images[0].style.display = 'inline-block'; 
    } else if (hour >= 12 && hour < 18) {
        greetingText.textContent = 'Good Afternoon,';
        hideImages();
        images[1].style.display = 'inline-block';
    } else {
        greetingText.textContent = 'Good Night,';
        hideImages();
        images[2].style.display = 'inline-block';
    }
});

