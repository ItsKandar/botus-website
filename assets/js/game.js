        // Fonction de délai pour les affichages plus tard
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Liste des mots à deviner
        var words = ["hello", "overflow"];

        // Mot à deviner
        var targetWord = "";

        // Mot deviné
        var userInput = "";

        // Nombre de tentatives
        var attempts = 0;

        // Le résultat
        var result = "";

        // Fonction pour choisir un mot aléatoire
        function chooseWord() {
            targetWord = words[Math.floor(Math.random() * words.length)];
            // document.getElementById("word-input").value = "";
            // document.getElementById("result").innerHTML = "";
            printWord(targetWord);
            $("#attempt-count").children().text(attempts);
        }

        // Fonction pour afficher un mot
        async function printWord(targetWord) {
            $("#attempt-count").children().text(attempts);

            var row = document.createElement("div");
            row.classList.add("row");
            $(row).appendTo("#box").hide().fadeIn(500);
            for ( let i = 0; i < targetWord.length; i++ ) {  
                printLetter(targetWord[i], i, row);
                await sleep(100);
            }
        }

        // Fonction pour afficher une lettre
        function printLetter(letter, index, row) {
            input = document.createElement("input");
            input.classList.add("letter");
            input.setAttribute("maxlength", 1);
            $(input).appendTo(row).hide().fadeIn(500); 
            if ( index == 0 ) {
                input.value = letter
            }
            $(input).on( "change", function() {
                var lastRow = $('.row:last');
                checkInputs(row);
            });
        }

        // Fonction pour vérifier si tous les inputs sont remplis
        function checkInputs(row){
            var filled = 0;
            $(row).children().each(function(){           
                if ( $(this).val() ) {
                    filled ++;
                } 
            });
            if (filled == targetWord.length) {
                checkWord(row);
            }
        }
        // Fonction pour vérifier le mot entré par l'utilisateur
        function checkWord(row) {
            var index = 0;
            userInput = "";
            $(row).children().each(function(){  
                userInput += $(this).val();
                if ($(this).val() == targetWord[index]) {
                    $(this).addClass("correct");
                } else if (targetWord.includes($(this).val())) {
                    $(this).addClass("exists");
                } else {
                    $(this).addClass("wrong");
                }
                index++;
                
            });

            attempts++;
            $("#attempt-count").innerHTML = 
            console.log(userInput);
            if (userInput === targetWord) {
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
                        // axios.post('function.php?action=delete')
                        // .then(function () {
                        //     Swal.fire(
                        //         'Supprimé!',
                        //         'Le compte a bien été supprimé.',
                        //         'success'
                        //     ).then(function () {
                        //         window.location.reload();
                        //     });            
                        // })
                        resetGame();
                    }
                })
            } else {
                printWord(targetWord);
            }

            console.log(targetWord);
        }

        function startGame() {
            $(".play-btn").fadeOut("slow");

            var div = document.createElement("div");
            div.setAttribute("id", "attempt-count");
            $(".game").prepend(div); 
            div.innerHTML = "tentatives: ";

            var p = document.createElement("p");
            $("#attempt-count").append(p); 

            chooseWord();
        }

        function resetGame() {
            $('#box').children().remove();
            $('#attempt-count').remove();

            attempts = 0;

            startGame();
        }


    