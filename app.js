


const Contenu = {
    0: {
        card: {
            jours: "4/15 jours",
            phrase: "Si tu peux le rêver tu peux le faire"
        },
        instruction: {
            texte: "Imaginez que votre objectif estr atteint et vivez pleinement ce moment (ce qu vous voyez, entendezn ressentez, etc.). Vous pouvez fermer les yeux pour visualiser plus facilement la situation. Vous pouvez fermer les yeux pour visulaiser plus facilement la situation",
            url: "http://www.famillezeradechet.com"
        },
        caracteristiques: {
            Thematique: "confiance en soi",
            Niveau: 'initiation',
            "jours consécutif": '3 jours',
            "partage du défi": "AP"
        }

    },
    1: {
        card: {
            jours: "8/10 jours",
            phrase: "Rien ne sert de courir"
        },
        instruction: {
            texte: "Bear claw candy oat cake sweet marshmallow jelly beans lemon drops brownie jelly-o. Sweet roll sesame snaps apple pie jelly beans lemon drops candy. Sweet jelly chocolate cake sesame snaps caramels. Chupa chups oat cake liquorice. Tootsie roll jelly-o toffee jujubes ice cream sesame snaps tiramisu sweet roll donut. Fruitcake lemon drops chocolate cake caramels halvah macaroon gingerbread biscuit lollipop. Sesame snaps dragée gummi bears tootsie roll oat cake.",
            url: "http://www.famillezeradechet.com"
        },
        caracteristiques: {
            Thematique: "la respiration",
            Niveau: 'confimé',
            "jours consécutif": '5 jours',
            "partage du défi": "RT"
        }

    },
    2: {
        card: {
            jours: "1/7 jours",
            phrase: "Mieux vaut mourir tard que jamais"
        },
        instruction: {
            texte: "Gummi bears cupcake liquorice powder chocolate bar tootsie roll candy canes. Jelly-o jelly beans macaroon caramels chocolate cake croissant. Sugar plum liquorice sesame snaps pudding jelly beans marshmallow cookie. Caramels tart chupa chups bonbon dessert danish. Dessert jelly beans cheesecake tootsie roll. Pastry pudding wafer carrot cake chupa chups cookie tiramisu bear claw pastry. Topping sweet roll muffin wafer croissant pie cheesecake macaroon. Apple pie icing macaroon macaroon cake gummies chocolate cake gingerbread.",
            url: "http://www.famillezeradechet.com"
        },
        caracteristiques: {
            Thematique: "La souplesse",
            Niveau: 'Intermédiaire',
            "jours consécutif": '10 jours',
            "partage du défi": "AP"
        }

    }
}
const tabR = ["01/04/2020", "02/04/2020", "03/04/2020", "04/04/2020", "05/04/2020"]
const tabP = ["06/04/2020", "07/04/2020", "08/04/2020", "09/04/2020", "10/04/2020", "11/04/2020", "12/04/2020", "13/04/2020", "14/04/2020"]


function Calendrier(m) {
    const month = m.format('MMM')
    const nbjours = m.daysInMonth()
    const startOfMonth = m.startOf('month').format('d');
    $('.month').text(month)
    $('#cal').empty()
    for (let i = 0; i < startOfMonth; i++) {
        $('#cal').append(`<div class="column" style="width: 50px; height: 40px;text-align: center"></div>`)
    }
    const mmois = moisActuel.format('/MM/YYYY')
    for (let i = 1; i <= nbjours; i++) {
        let l = '0' + i + mmois;
        if (l.length != 10) {
            l = l.substr(1)
        }
        let dateActiveR = ""
        if (pos = tabR.includes(l)) {
            dateActiveR = "dateActive dateActiveR"
            if (tabR.indexOf(l) == 0) {
                dateActiveR += " first"
            }
            if (tabR.indexOf(l) == tabR.length - 1) {
                dateActiveR += " last"
            }
        }
        let dateActiveP = ""
        if (pos = tabP.includes(l)) {
            dateActiveP = "dateActive dateActiveP"
            if (tabP.indexOf(l) == 0) {
                dateActiveP += " first"
            }
            if (tabP.indexOf(l) == tabP.length - 1) {
                dateActiveP += " last"
            }
        }
        let jourActuel = ''
        if (l == moment().format('DD/MM/YYYY')) {
            jourActuel = 'jourActuel'
        }
        $('#cal').append(`<div class="column ${dateActiveR} ${dateActiveP}"><div class="jour ${jourActuel}">${i}</div></div>`)
    }
}

function createDefi(index) {
    $('.content').empty()
    $('.content').text(treat(Contenu[index].instruction.texte))
    $('.url').text(Contenu[index].instruction.url)
    console.log( 'Slide changed to' + index );
    $(`.carousel-cell`).removeClass('defi active')
    const cell = $(`.carousel-cell:eq(${index})`).addClass('defi active')
    const size = Object.keys(Contenu[index].caracteristiques).length
    for (let i=0; i<size; i++) {
        $('.caracteristiques').append(`<div class="ligne"><div class="gauche">${Object.keys(Contenu[index].caracteristiques)[i]}</div><div class="droite">${Object.values(Contenu[index].caracteristiques)[i]}</div></div>`)
    }
}


function treat(s) {
    const t = s.split(' ')

    console.log(t[0])
    console.log(`<span>${t[0]}</span>${s.replace(t[0],'')}`);
    return s
}

$('.defisMenu>.menu').click(function () {
    $('.page').attr('hidden', true)
    $('.defisMenu>.menu').toggleClass('active inactive')
    $(this).addClass('active')
    $(`#${$(this).attr('data-page')}`).attr('hidden', false)
})



let moisActuel
Calendrier(moisActuel = moment())
$('.next').click(function () {
    const m = moisActuel.add(1, 'months')
    Calendrier(m)
    moisActuel = m;
})
$('.previous').click(function () {
    const m = moisActuel.subtract(1, 'months')
    Calendrier(m)
    moisActuel = m;
})

// jQuery
$('.carousel-cell').each(function(index) {
    $(this).find('.tc').text(Contenu[index].card.phrase)
    $(this).find('.tl').text(Contenu[index].card.jours)
    console.log(Contenu[index].card.phrase)
})

createDefi(0)


$carousel = $('.carousel').flickity({
    // options

    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    on: {
        ready: function() {
            console.log('Flickity is ready');
        },
        change: function( index ) {
            console.log(Contenu)
            $('.caracteristiques').empty()
            createDefi(index)
        }
    }
});







