let slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    tabs = document.querySelectorAll('.tabcontent'),
    tabButtons = document.querySelectorAll('.tabheader__item'),
    current_view = document.querySelector('#current'),
    modal = document.querySelector('.modal'),
    open_modal = document.querySelectorAll('[data-open]'),
    close_modal = document.querySelector('[data-close]'),
    genderBtn = document.querySelectorAll('#gender .calculating__choose-item'),
    ratioInputs = document.querySelectorAll('.calculating__choose_medium input'),
    activeBtns = document.querySelectorAll('.calculating__choose_big .calculating__choose-item'),
    result_view = document.querySelector('.calculating__result span')
    links = document.querySelectorAll('.header__link')
    endTime = "2024-09-27 17:00"
    firstLink = links[0]
    secondLink = links[1]
    slideIndex = 0,
    user = {
        gender: 'woman',
        act: 'small',
    }


showSlide()

function showSlide(n) {
    if(n < 0) {
        slideIndex = slides.length - 1
    }
    
    if(n > slides.length - 1) {
        slideIndex = 0
    }

  current_view.innerHTML = 0 + slideIndex + 1
    slides.forEach(slide => slide.classList.add('hide', 'fade'))
    slides[slideIndex].classList.remove('hide')
}

next.onclick = () => {
    slideIndex++
    showSlide(slideIndex)
}
prev.onclick = () => {
    slideIndex--
    showSlide(slideIndex)
}

showTabs(0)

function showTabs(n) {
  tabs.forEach(tab => tab.classList.add('hide', 'fade'))
  tabs[n].classList.remove('hide')
}

tabButtons.forEach((btn, idx) => {
  btn.onclick = () => {
    document.querySelector('.tabheader__item_active').classList.remove('tabheader__item_active')
    btn.classList.add('tabheader__item_active')
    showTabs(idx)
  }
})

open_modal.forEach(open => {
  open.onclick = () => {
    modal.classList.add('show')
  }
})

close_modal.onclick = () => {
  modal.classList.remove('show')
}

links[0].onclick = function(e) {
    e.preventDefault()
    window.scroll({
        top: document.body.scrollHeight, 
        left: 0,
        behavior: 'smooth'
    });
};

links[1].onclick = function(e) {
    e.preventDefault()
    let secondPoint = document.querySelector('.second-point')
    window.scroll({
        top: secondPoint.offsetTop,
        left: 0,
        behavior: 'smooth'
    });
};

genderBtn.forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.calculating__choose-item_active').classList.remove('calculating__choose-item_active')
        btn.classList.add('calculating__choose-item_active')
        user.gender = btn.getAttribute('data-gender')
    }
})

ratioInputs.forEach(inp => {
    inp.onkeyup = () => {
        user[inp.id] = inp.value
    }
})

activeBtns.forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.calculating__choose_big .calculating__choose-item_active').classList.remove('calculating__choose-item_active')
        btn.classList.add('calculating__choose-item_active')
        user.act = btn.getAttribute('data-act')   
        let result = 0

        if(user.gender === 'woman') {
            result = 655.1 + (9.563 * user.weight) + (1.85 * user.height) - (4.676 * user.age)
        }
        else {
            result = 66.5 + (13.75 * user.weight) + (5.003 * user.height) - (6.775 * user.age)
        }
        result_view.innerHTML = Math.round(result)
    }
})

function getRemainingTime(deadLine) {
    const t = Date.parse(deadLine) - Date.now(new Date()),
        days = Math.floor((t / 1000) / 60 / 60 / 24),
        hours = Math.floor((t / 1000) / 60 / 60 % 24),
        minutes = Math.floor((t / 1000) / 60 % 60),
        seconds = Math.floor((t / 1000) % 60);

    return { 
        t: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

function setTimer(selector, endTime) {
    const t = document.querySelector(selector)
        days = document.querySelector('#days')
        hour = document.querySelector('#hours')
        minutes = document.querySelector('#minutes')
        seconds = document.querySelector('#seconds')

    setInterval(updateTime, 1000)

    function updateTime() {
        const t = getRemainingTime(endTime)

        if (t.t <= 0) {
            clearInterval(Interval)
            days.innerHTML = 0
            hours.innerHTML = 0
            minutes.innerHTML = 0
            seconds.innerHTML = 0
        } else {
            days.innerHTML = t.days
            hours.innerHTML = t.hours
            minutes.innerHTML = t.minutes
            seconds.innerHTML = t.seconds
        }   
    }
}

setTimer('.promotion__timer', endTime)