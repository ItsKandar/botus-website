        // Fonction de délai pour les affichages plus tard
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Liste des mots à deviner
        var words = ["hello", "overflow"];

        // Mot à deviner
        var targetWord = "";

        // Nombre de tentatives
        var attempts = 0;

        // Fonction pour choisir un mot aléatoire
        function chooseWord() {
            targetWord = words[Math.floor(Math.random() * words.length)];
            // document.getElementById("word-input").value = "";
            // document.getElementById("result").innerHTML = "";
            printWord(targetWord);
            attempts = 0;
            document.getElementById("attempt-count").innerHTML += attempts;
        }

        // Fonction pour afficher un mot
        async function printWord(targetWord) {
            for ( let i = 0; i < targetWord.length; i++ ) {  
                printLetter(targetWord[i], i);
                await sleep(100);
            }
        }

        // Fonction pour afficher une lettre
        function printLetter(letter, index) {
            input = document.createElement("input");
            input.classList.add("letter");
            input.setAttribute("maxlength", 1);
            $(input).appendTo("#box").hide().fadeIn(500); 
            if ( index == 0 ) {
                input.value = letter
            }
            $(input).on( "change", function() {
                checkInputs();
            });
        }

        // Fonction pour vérifier si tous les inputs sont remplis
        function checkInputs(){
            var filled = 0;
            $('.letter').each(function(){           
                if ( $(this).val() ) {
                    filled ++;
                } 
            });
            if (filled == targetWord.length) {
                checkWord();
            }
        }
        // Fonction pour vérifier le mot entré par l'utilisateur
        function checkWord() {
            var index = 0;
            $('.letter').each(function(){  
                if ($(this).val() == targetWord[index]) {
                    $(this).addClass("correct");
                } else if (targetWord.includes($(this).val())) {
                    $(this).addClass("exists");
                } else {
                    $(this).addClass("wrong");
                }
                index++
            });
            // var userInput = document.getElementById("word-input").value.toLowerCase();
            // var result = "";
            // attempts++;
            // document.getElementById("attempt-count").innerHTML = attempts;

            // if (userInput.length !== 5) {
            //     result = "Le mot doit contenir 5 lettres.";
            // } else if (userInput === targetWord) {
            //     result = "Félicitations ! Vous avez trouvé le mot.";
            // } else {
            //     for (var i = 0; i < userInput.length; i++) {
            //         if (userInput[i] === targetWord[i]) {
            //             result += "<span class='correct'>" + userInput[i] + "</span>";
            //         } else if (targetWord.includes(userInput[i])) {
            //             result += "<span class='exists'>" + userInput[i] + "</span>";
                 
            //         } else {
            //             result += "<span class='wrong'>" + userInput[i] + "</span>";
            //         }
            //     }
            // }

            // document.getElementById("result").innerHTML = result;
        }

        function startGame() {
            $(".play-btn").fadeOut("slow");
            chooseWord();
        }


    