document.addEventListener('DOMContentLoaded', () => {

    //card option
    const cardArray =  [
        {
            name: 'Auto',
            img: 'res/Auto.png'
        },
        {
            name: 'Auto',
            img: 'res/Auto.png'
        },
        {
            name: 'Ball',
            img: 'res/Ball.png'
        },
        {
            name: 'Ball',
            img: 'res/Ball.png'
        },
        {
            name: 'Baum',
            img: 'res/Baum.png'
        },
        {
            name: 'Baum',
            img: 'res/Baum.png'
        },
        {
            name: 'Burger',
            img: 'res/Burger.png'
        },
        {
            name: 'Burger',
            img: 'res/Burger.png'
        },
        {
            name: 'Junge',
            img: 'res/Junge.png'
        },
        {
            name: 'Junge',
            img: 'res/Junge.png'
        },
        {
            name: 'Mädchen',
            img: 'res/Mädchen.png'
        },
        {
            name: 'Mädchen',
            img: 'res/Mädchen.png'
        },
        {
            name: 'Uhr',
            img: 'res/Uhr.png'
        },
        {
            name: 'Uhr',
            img: 'res/Uhr.png'
        },
        {
            name: 'Wolke',
            img: 'res/Wolke.png'
        },
        {
            name: 'Wolke',
            img: 'res/Wolke.png'
        },
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []

    //create game board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'res/Back.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }
    createBoard()

    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute('src', 'res/White.png')
            cards[optionTwoId].setAttribute('src', 'res/White.png')
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'res/Back.png')
            cards[optionTwoId].setAttribute('src', 'res/Back.png')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congrats, You Won!'
        }
    }



    //flip card
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }
})