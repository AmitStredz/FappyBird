document.addEventListener('DOMContentLoaded', () => {

    const bird = document.querySelector('.bird')
    const container = document.querySelector('.container')
    const pop = document.querySelector('.pop')
    const para = document.querySelector('p')
    const live_score = document.querySelector('h3')
    let count = 0

    let birdLeft = 220
    let birdBottom = 400
    let gravity = 3.4
    let isGameOver = false
    let gap = 150

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
    }
    let gameTimerID = setInterval(startGame, 20) 


    document.addEventListener('keyup', jump)

    function jump() {
        if(birdBottom < 530) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }

    let skip = 0
    function generateObstacle() {

        if(skip >= 2) count ++
        skip++
        live_score.textContent = "Score: " + count

        let obstacleLeft = 400
        let obstacleHeight = Math.random() * 150 * -1
        let obstacleBottom = obstacleHeight

        const topObstacle = document.querySelector('.topObstacle').cloneNode(true)
        const bottomObstacle = document.querySelector('.bottomObstacle').cloneNode(true)
     
            topObstacle.classList.add('topObstacle')
            bottomObstacle.classList.add('bottomObstacle')
    

        container.appendChild(topObstacle)  
        container.appendChild(bottomObstacle)

        bottomObstacle.style.left = obstacleLeft + 'px'
        bottomObstacle.style.bottom = obstacleBottom + 'px'

        topObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.bottom = obstacleBottom + 300 + gap + 'px'
        
        console.log(obstacleHeight)

        function moveObject() {
            if (isGameOver) return
            obstacleLeft -= 2
            topObstacle.style.left = obstacleLeft + 'px'
            bottomObstacle.style.left = obstacleLeft + 'px'

            if(obstacleLeft < -30) {
                clearInterval(timerId)
                container.removeChild(topObstacle)
                container.removeChild(bottomObstacle)
            }


            if(obstacleLeft>=20 && obstacleLeft<90 && 
                ((birdBottom <= obstacleBottom + 300) || 
                (birdBottom >= obstacleBottom + 300 - 30 + gap)) ||
                (birdBottom < 0)  ){
                    // if ( birdBottom > obstacleBottom + 300 + gap) {
                    //     bird.style.bottom = obstacleBottom + 300 + gap - 30 + 'px'
                    // }
                gameover()
                clearInterval(timerId)
                clearInterval(gameTimerID)
            }
        }

        let timerId = setInterval(moveObject, 20)
        if(!isGameOver) setTimeout(generateObstacle, 2000)

    }
    generateObstacle()

    function gameover() {
        console.log('Game...Over')
        document.removeEventListener('keyup', jump)
        isGameOver = true
        // alert("Game Over...")

        pop.style.display = 'flex'
        para.textContent = "Score: " + count
        
        live_score.style.display = 'none'
    }
})