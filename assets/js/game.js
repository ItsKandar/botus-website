
// Liste des mots à deviner
var words = [
    "comme",
    "etait",
    "avoir",
    "chaud",
    "certains",
    "boite",
    "dehors",
    "autre",
    "etaient",
    "faire",
    "temps",
    "volonte",
    "comment",
    "chaque",
    "ensemble",
    "trois",
    "vouloir",
    "aussi",
    "jouer",
    "petit",
    "mettre",
    "maison",
    "grand",
    "epeler",
    "ajouter",
    "terre",
    "grand",
    "suivre",
    "pourquoi",
    "interroger",
    "hommes",
    "changement",
    "lumiere",
    "genre",
    "besoin",
    "maison",
    "image",
    "essayer",
    "encore",
    "animal",
    "point",
    "monde",
    "construire",
    "terre",
    "nouveau",
    "travail",
    "partie",
    "prendre",
    "obtenir",
    "fabrique",
    "vivre",
    "apres",
    "arriere",
    "seulement",
    "homme",
    "annee",
    "montrer",
    "donner",
    "notre",
    "juste",
    "forme",
    "phrase",
    "grand",
    "penser",
    "aider",
    "faible",
    "ligne",
    "differer",
    "beaucoup",
    "signifier",
    "avant",
    "droit",
    "garçon",
    "vieux",
    "quand",
    "utiliser",
    "votre",
    "maniere",
    "beaucoup",
    "ecrire",
    "voudrais",
    "comme",
    "faire",
    "chose",
    "regarder",
    "pourrait",
    "aller",
    "venir",
    "nombre",
    "aucun",
    "personnes",
    "savoir",
    "appel",
    "premiere",
    "maintenant",
    "trouver",
    "supporter",
    "propre",
    "devrait",
    "trouve",
    "reponse",
    "ecole",
    "croitre",
    "etude",
    "encore",
    "apprendre",
    "usine",
    "couvercle",
    "nourriture",
    "soleil",
    "quatre",
    "entre",
    "garder",
    "jamais",
    "dernier",
    "laisser",
    "pensee",
    "ville",
    "arbre",
    "traverser",
    "ferme",
    "debut",
    "puissance",
    "histoire",
    "tirer",
    "gauche",
    "courir",
    "presse",
    "proche",
    "livre",
    "porter",
    "science",
    "manger",
    "chambre",
    "poisson",
    "montagne",
    "arretez",
    "entendre",
    "cheval",
    "coupe",
    "regarder",
    "couleur",
    "principal",
    "ouvert",
    "paraitre",
    "ensemble",
    "suivant",
    "blanc",
    "enfants",
    "commencer",
    "marcher",
    "exemple",
    "facilite",
    "papier",
    "groupe",
    "toujours",
    "musique",
    "marque",
    "souvent",
    "lettre",
    "riviere",
    "voiture",
    "pieds",
    "soins",
    "deuxieme",
    "assez",
    "plaine",
    "fille",
    "habituel",
    "jeune",
    "jamais",
    "rouge",
    "liste",
    "sentir",
    "parler",
    "oiseau",
    "bientot",
    "corps",
    "chien",
    "famille",
    "direct",
    "laisser",
    "chanson",
    "mesurer",
    "porte",
    "produit",
    "court",
    "chiffre",
    "classe",
    "question",
    "arriver",
    "complete",
    "navire",
    "moitie",
    "ordre",
    "probleme",
    "piece",
    "savait",
    "passer",
    "depuis",
    "ensemble",
    "pouce",
    "multiplier",
    "cours",
    "rester",
    "plein",
    "force",
    "objet",
    "decider",
    "surface",
    "profond",
    "systeme",
    "occupe",
    "record",
    "bateau",
    "commun",
    "possible",
    "place",
    "mille",
    "verifier",
    "forme",
    "assimiler",
    "chaud",
    "manquer",
    "apporte",
    "chaleur",
    "neige",
    "apporter",
    "lointain",
    "remplir",
    "peindre",
    "langue",
    "entre",
    "unite",
    "puissance",
    "ville",
    "certain",
    "voler",
    "tomber",
    "conduire",
    "sombre",
    "machine",
    "patienter",
    "figure",
    "etoile",
    "boite",
    "domaine",
    "reste",
    "correct",
    "capable",
    "livre",
    "Termine",
    "beaute",
    "resiste",
    "contenir",
    "avant",
    "enseigner",
    "semaine",
    "finale",
    "donne",
    "rapide",
    "developper",
    "ocean",
    "chaud",
    "gratuit",
    "minute",
    "special",
    "esprit",
    "derriere",
    "clair",
    "queue",
    "produire",
    "espace",
    "entendu",
    "meilleur",
    "heure",
    "mieux",
    "pendant",
    "rappeler",
    "etape",
    "tenir",
    "ouest",
    "interet",
    "atteindre",
    "rapide",
    "verbe",
    "chanter",
    "ecouter",
    "table",
    "Voyage",
    "moins",
    "matin",
    "simple",
    "plusieurs",
    "voyelle",
    "guerre",
    "poser",
    "contre",
    "modele",
    "centre",
    "amour",
    "personne",
    "argent",
    "servir",
    "apparaitre",
    "route",
    "carte",
    "pluie",
    "regle",
    "gouverner",
    "tirer",
    "froid",
    "energie",
    "chasse",
    "probable",
    "frere",
    "cellule",
    "croire",
    "choisir",
    "soudain",
    "compter",
    "carre",
    "raison",
    "longueur",
    "sujet",
    "region",
    "taille",
    "varier",
    "regler",
    "parler",
    "poids",
    "general",
    "glace",
    "question",
    "cercle",
    "paire",
    "inclure",
    "fracture",
    "syllabe",
    "feutre",
    "grandiose",
    "balle",
    "encore",
    "vague",
    "tomber",
    "present",
    "lourd",
    "danse",
    "moteur",
    "position",
    "large",
    "voile",
    "materiel",
    "fraction",
    "foret",
    "course",
    "fenetre",
    "magasin",
    "train",
    "sommeil",
    "prouver",
    "jambe",
    "exercice",
    "capture",
    "monture",
    "souhaiter",
    "conseil",
    "hiver",
    "ecrit",
    "sauvage",
    "instrument",
    "conserve",
    "verre",
    "herbe",
    "vache",
    "emploi",
    "signe",
    "visite",
    "passe",
    "amusement",
    "clair",
    "temps",
    "million",
    "porter",
    "finition",
    "heureux",
    "espoir",
    "fleur",
    "vetir",
    "etrange",
    "disparu",
    "commerce",
    "melodie",
    "voyage",
    "bureau",
    "recevoir",
    "rangee",
    "bouche",
    "exact",
    "symbole",
    "mourir",
    "moins",
    "difficulte",
    "ecrit",
    "semence",
    "joindre",
    "suggerer",
    "propre",
    "pause",
    "augmenter",
    "mauvais",
    "huile",
    "toucher",
    "melanger",
    "equipe",
    "perdu",
    "porter",
    "jardin",
    "expedie",
    "choisir",
    "adapter",
    "debit",
    "juste",
    "banque",
    "recueillir",
    "sauver",
    "controle",
    "decimal",
    "oreille",
    "autre",
    "casse",
    "milieu",
    "moment",
    "echelle",
    "printemps",
    "observer",
    "enfant",
    "droit",
    "consonne",
    "nation",
    "vitesse",
    "methode",
    "organe",
    "payer",
    "section",
    "nuage",
    "surprise",
    "calme",
    "pierre",
    "minuscule",
    "montee",
    "frais",
    "conception",
    "pauvres",
    "experience",
    "unique",
    "baton",
    "vingt",
    "sourire",
    "sauter",
    "village",
    "racine",
    "acheter",
    "augmenter",
    "resoudre",
    "metal",
    "pousser",
    "paragraphe",
    "troisieme",
    "cheveux",
    "decrire",
    "cuisinier",
    "etage",
    "chaque",
    "resultat",
    "bruler",
    "colline",
    "siecle",
    "envisager",
    "droit",
    "copie",
    "phrase",
    "silencieux",
    "sable",
    "rouleau",
    "doigt",
    "industrie",
    "valeur",
    "lutte",
    "mensonge",
    "battre",
    "exciter",
    "naturel",
    "capital",
    "chaise",
    "danger",
    "fruit",
    "riche",
    "epais",
    "soldat",
    "processus",
    "pratique",
    "separe",
    "difficile",
    "medecin",
    "proteger",
    "recolte",
    "moderne",
    "element",
    "frapper",
    "etudiant",
    "partie",
    "localiser",
    "anneau",
    "caractere",
    "insecte",
    "periode",
    "indiquer",
    "radio",
    "rayon",
    "atome",
    "humain",
    "histoire",
    "effet",
    "electrique",
    "attendre",
    "imaginer",
    "fournir",
    "ainsi",
    "femme",
    "capitaine",
    "deviner",
    "necessaire",
    "creer",
    "voisin",
    "lavage",
    "plutot",
    "foule",
    "comparer",
    "poeme",
    "chaine",
    "cloche",
    "dependre",
    "viande",
    "celebre",
    "dollar",
    "courant",
    "mince",
    "triangle",
    "planete",
    "colonie",
    "horloge",
    "entrer",
    "majeur",
    "frais",
    "recherche",
    "envoyer",
    "jaune",
    "pistolet",
    "permettre",
    "impression",
    "place",
    "desert",
    "costume",
    "courant",
    "ascenseur",
    "arriver",
    "maitre",
    "piste",
    "rivage",
    "division",
    "feuille",
    "substance",
    "favoriser",
    "relier",
    "poste",
    "passer",
    "corde",
    "graisse",
    "heureux",
    "original",
    "station",
    "charger",
    "propre",
    "segment",
    "esclave",
    "canard",
    "instant",
    "marche",
    "degre",
    "peupler",
    "poussin",
    "ennemi",
    "repondre",
    "boisson",
    "support",
    "discours",
    "nature",
    "gamme",
    "vapeur",
    "mouvement",
    "chemin",
    "liquide",
    "signifiait",
    "quotient",
    "dents",
    "coquille",
    "oxygene",
    "sucre",
    "deces",
    "assez",
    "competence",
    "femmes",
    "saison",
    "solution",
    "aimant",
    "argent",
    "merci",
    "branche",
    "rencontre",
    "suffixe",
    "figue",
    "enorme",
    "acier",
    "discuter",
    "avant",
    "similaire",
    "guider",
    "experience",
    "score",
    "pomme",
    "achete",
    "manteau",
    "masse",
    "carte",
    "bande",
    "corde",
    "glissement",
    "gagner",
    "rever",
    "soiree",
    "condition",
    "outil",
    "total",
    "odeur",
    "vallee",
    "double",
    "siege",
    "continuer",
    "graphique",
    "chapeau",
    "vendre",
    "succes",
    "entreprise",
    "soustraire",
    "evenement",
    "accord",
    "baignade",
    "terme",
    "oppose",
    "femme",
    "chaussure",
    "epaule",
    "organiser",
    "inventer",
    "coton",
    "determiner",
    "litre",
    "camion",
    "bruit",
    "niveau",
    "chance",
    "recueillir",
    "boutique",
    "tronçon",
    "jeter",
    "eclat",
    "propriete",
    "colonne",
    "molecule",
    "repetition",
    "exiger",
    "large",
    "preparer",
    "pluriel",
    "colere",
    "continent",
    "assoir",
    "malleable",
    "internet",
    "fuite",
    "urgent",
    "urgente",
    "france",
    "francais",
    "francaise",
    "etangs",
    "aquatique",
    "activite",
    "creation",
    "bassines",
    "bassin",
    "minuit",
    "perdre",
    "piege",
    "mange",
    "flamands",
    "flandre",
    "artisant",
    "jambon",
    "Canoe"
    ];

// Mot à deviner
var targetWord = "";

// Mot deviné
var userInput = "";

// Nombre de tentatives
var attempts = 0;

// Fonction de délai pour les affichages plus tard
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fonction pour changer de case automatiquement à l'écriture du mot
function autotab(original, next, previous) {
    if (!$(original).closest(".letter").is(':last-child')) {
        
        if (original.value.length == original.getAttribute("maxlength")){
            next.focus()
        }
    }
    if (!$(original).closest(".letter").is(':first-child')) {
        $('html').keyup(function(e){
            if(e.keyCode == 8 && original.value.length == 0) {
                previous.focus()
            }
        });
    }
}
// Fonction pour choisir un mot aléatoire
function chooseWord() {
    attempts++;
    targetWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    printWord(targetWord);
    $("#attempt-count").children().text(attempts);

    console.log(targetWord);
}

// Fonction pour afficher un mot
async function printWord(targetWord) {
    $("#attempt-count").children().text(attempts);

    var row = document.createElement("div");
    row.classList.add("ligne");
    $(row).appendTo("#box").hide().fadeIn(500);
    for (let i = 0; i < targetWord.length; i++) {
        printLetter(targetWord[i], i, row);
        await sleep(100);
    }
    var lastRow = $('.ligne:last');
    $(lastRow).children()[1].focus()
}

// Fonction pour afficher une lettre
function printLetter(letter, index, row) {
    input = document.createElement("input");
    input.classList.add("letter");
    input.setAttribute("maxlength", 1);
    input.setAttribute("onKeyUp", "autotab(this, this.nextSibling, this.previousSibling)");
    $(input).appendTo(row).hide().fadeIn(500);
    if (index == 0) {
        input.value = letter
    }
    $(input).on("change", function () {
        var lastRow = $('.ligne:last');
        checkInputs(lastRow);
    });
}

// Fonction pour vérifier si tous les inputs sont remplis
function checkInputs(row) {
    var filled = 0;
    $(row).children().each(function () {
        if ($(this).val()) {
            filled++;
        }
    });
    if (filled == targetWord.length) {
        checkWord(row);
    }
}
// Fonction pour vérifier le mot entré par l'utilisateur
function checkWord(row) {
    attempts++;
    var index = 0;
    userInput = "";
    $(row).children().each(function () {
        userInput += $(this).val().toUpperCase();
        if ($(this).val().toUpperCase() == targetWord[index].toUpperCase()) {
            $(this).addClass("correct");
        } else if (targetWord.includes($(this).val().toUpperCase())) {
            $(this).addClass("exists");
        } else {
            $(this).addClass("wrong");
        }
        index++;

    });

    if (userInput === targetWord) {
        $("#attempt-count").children().text(attempts);
        Swal.fire({
            title: 'Félicitation! Vous avez gagné.',
            text: "Voulez-vous recommencer une partie?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Rejouer!',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.isConfirmed) {
                resetGame();
            }
        })
    } else if (attempts <= 6){
        printWord(targetWord);
    } else {
        Swal.fire({
            title: 'Pas de chance! vous n\avez pas trouvé le mot',
            text: `Le mot était '${targetWord}'. Voulez-vous recommencer une partie?`,
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Rejouer!',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.isConfirmed) {
                resetGame();
            }
        })
    }
}


function startGame() {
    $(".play-btn").fadeOut("slow");
    $('.game').removeClass("justify-content-center");
    $(".game").css({    justifyContent: "space-between",
                        backgroundColor: "#e5e5e5", 
                        border: "solid 1px gray",
                        borderRadius: "10px",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "25px"});

    var div = document.createElement("div");
    div.setAttribute("id", "bottom-game")
    $(".game").append(div);

    var div1 = document.createElement("div");
    div1.setAttribute("id", "attempt-count");
    $(div).append(div1);
    div1.innerHTML = "tentatives : <p></p> /6";

    var btn = document.createElement("button");
    btn.setAttribute("id", "reset-btn");
    btn.setAttribute("onClick", "resetGame()");
    $(div).append(btn);
    btn.innerHTML = 'Nouveau mot!'



    chooseWord();
}

function resetGame() {
    $('#box').children().remove();
    $('#attempt-count').remove();
    $('#reset-btn').remove();

    attempts = 0;

    startGame();
}


