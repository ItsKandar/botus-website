<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="./assets/images/logo_botus.jpg" />
    
    <link rel="stylesheet" href="assets/style/navbar.css">
    <link rel="stylesheet" href="assets/style/documentation.css">
    <link rel="stylesheet" href="assets/style/footer.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poller+One&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

    <title>Documentation</title>
</head>

<body>
    <header>
        <?php require("navbar.php") ?>
    </header>

    <main class="d-flex flex-column container">
        <div class="card m-3">
            <div class="card-body">
                <h1 class="card-title">Introduction</h1>
                <p>Botus est un bot Discord qui offre la possibilité de jouer au jeu Motus directement sur la plateforme.</p>

            </div>
        </div>

        <div class="card m-3">
            <div class="card-body">
                <h1 class="card-title">Setup de Botus</h1>
                <h4>Étape 1 : Inviter Botus</h4>
                <p>
                    Utilisez <a href="https://discord.com/oauth2/authorize?client_id=1086344574689095741&permissions=8&scope=bot%20applications.commands" target="_blank">ce lien d'invitation</a> pour inviter Botus sur votre serveur et autoriser votre compte en sélectionnant votre serveur.
                </p>
                <h4>Étape 2 : Autoriser et accorder les permissions</h4>
                <p>
                    Après avoir invité Botus, vous serez invité à autoriser votre compte et sélectionner les permissions nécessaires pour que le bot fonctionne correctement.
                </p>
            </div>
        </div>

        <div class="card m-3">
            <div class="card-body cmd">
                <h1 class="card-title">Les commandes</h1>
                <h4>Commandes admin: </h4>
                <ul>
                    <li class="raduis-top"><span>/set :</span> defini le channel dans lequels le bot sera utilisable</li>
                    <li class="raduis-bottom"><span>/create :</span> crée un channel "botus"</li>
                </ul>
                <h4>Commandes utilisateur: </h4>
                <ul>
                    <li class="raduis-top"><span>/invite :</span> Envoie le lien d'invitation du bot</li>
                    <li><span>/ping :</span> Pong (affiche la latence)</li>
                    <li><span>/bobo :</span> Botus !</li>
                    <li><span>/start :</span> Commence une nouvelle partie</li>
                    <li><span>/fin :</span> Termine la partie en cours</li>
                    <li><span>/mot :</span> Envoie le mot (Toujours caché)</li>
                    <li><span>/stats :</span> Montre le nombre de victoires</li>
                    <li><span>/classement :</span> Montre le classement des victoires</li>
                    <li><span>/suggest :</span> Pour suggerer une modification ou un mot</li>
                    <li><span>/bug :</span> Report un bug</li>
                    <li><span>/support :</span> Envoie le lien vers le serveur support</li>
                    <li class="raduis-bottom"><span>/help :</span> Affiche la liste des commandes disponibles</li>
                </ul>
            </div>
        </div>

        <div class="card m-3">
            <div class="card-body">
                <h1 class="card-title">Comment jouer?</h1>
                <ol>
                    <li>Utilisez /start pour commencer une nouvelle partie</li>
                    <li>Le bot affichera un mot à deviner avec les lettres masquées</li>
                    <li>Proposez un mot directement dans le chat</li>
                    <li>
                        Le bot va renvoyer votre mot avec en dessous des carrées rouge, jaune ou noir <br>
                        <span class="span-correct"><b>ROUGE</b></span> signifie que la lettre est correctement placé <br>

                        <span class="span-exists"><b>JAUNE</b></span> signifie que la lettre n'est pas correctement placé <br>

                        <span class="span-wrong"><b>BLEU</b></span> siginifie que la lettre n'est pas dans le mot <br>
                    </li>
                    <li>Vous avez 6 essais, si vous trouvez le mot, le jeu se termine et vous gagnez. Sinon, continuez à proposer des mots jusqu'à ce que vous le trouviez ou que vous décidiez d'arrêter la partie en utilisant <b>/fin</b> !</li>
                </ol>
            </div>
        </div>
    </main>

    <!-- footer -->
    <?php require("footer.php") ?>
</body>
<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>

</html>