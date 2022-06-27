(() => {
    const clock = document.querySelector('.clock')
    let seconds = 0
    let timer = 0

    const startClock = () => {
        timer = setInterval(() => {
            seconds++
            clock.innerHTML = formatTime(seconds)
        }, 1000)
    }

    const formatTime = (sec) => {
        const date = new Date(sec * 1000)
        return date.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'UTC'
        })
    }

    document.addEventListener('click', (evt) => {
        const element = evt.target

        if(element.classList.contains('play')){
            clock.classList.remove('paused')
            clearInterval(timer)
            startClock()
        }

        if(element.classList.contains('pause')){
            clearInterval(timer)
        clock.classList.add('paused')
        }

        if(element.classList.contains('reset')){
            clock.classList.remove('paused')
            clearInterval(timer)
        seconds = 0
        clock.innerHTML = '00:00:00'
        }
    })
})()