<?php $titre = 'Documentation : Botus'; $css = ['documentation']; $page = 'documentation'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php require 'head.php'; ?>
</head>
<body>
    <?php require 'navbar.php'; ?>

    <main class="container my-4 flex-grow-1">
        <section class="carte">
            <h1>Botus</h1>
            <p>Botus est un bot Discord pour jouer à Motus directement sur votre serveur : on devine un mot français dont on connaît la première lettre et la longueur, en 6 essais au maximum. La partie est commune à tout le serveur, tout le monde peut proposer.</p>
            <p class="mb-0">Pas de Discord sous la main ? <a href="./">Jouez directement sur le site</a>.</p>
        </section>

        <section class="carte">
            <h2>Installer Botus</h2>
            <ol>
                <li>Ouvrez <a href="https://discord.com/oauth2/authorize?client_id=1086344574689095741&amp;permissions=8&amp;scope=bot%20applications.commands" target="_blank" rel="noopener">le lien d'invitation</a>, choisissez votre serveur et validez les permissions.</li>
                <li>Un administrateur choisit le salon de jeu avec <code>/set</code>, ou en crée un avec <code>/create</code>. Le bot n'écoute les propositions que dans ce salon.</li>
                <li>Lancez une partie avec <code>/start</code>.</li>
            </ol>
        </section>

        <section class="carte">
            <h2>Comment jouer ?</h2>
            <ol>
                <li><code>/start</code> tire un mot au hasard. Le bot affiche sa première lettre et sa longueur.</li>
                <li>Proposez un mot en l'écrivant simplement dans le salon. Il doit avoir la même longueur, commencer par la même lettre et exister dans le dictionnaire. Les accents sont ignorés.</li>
                <li>Le bot répond avec une ligne de carrés :
                    <ul class="legende">
                        <li><span class="carre carre-correct" aria-hidden="true"></span><b>rouge</b> : la lettre est bien placée ;</li>
                        <li><span class="carre carre-exists" aria-hidden="true"></span><b>jaune</b> : la lettre est dans le mot, mais ailleurs ;</li>
                        <li><span class="carre carre-wrong" aria-hidden="true"></span><b>noir</b> : la lettre n'est pas dans le mot (ou plus, si elle est déjà comptée).</li>
                    </ul>
                </li>
                <li>Mot trouvé : une victoire de plus pour vous, et un nouveau mot est tiré. Après 6 essais sans succès, le mot est révélé.</li>
                <li>Pour discuter dans le salon sans jouer, commencez votre message par un point (<code>.</code>).</li>
            </ol>
        </section>

        <section class="carte">
            <h2>Commandes</h2>
            <h3>Pour tout le monde</h3>
            <dl class="commandes">
                <dt>/start [nb_lettres]</dt><dd>Commence une nouvelle partie (longueur optionnelle, de 2 à 20 lettres).</dd>
                <dt>/fin</dt><dd>Abandonne la partie : révèle le mot et en tire un nouveau.</dd>
                <dt>/mot</dt><dd>Réaffiche l'état de la partie, mot caché.</dd>
                <dt>/stats</dt><dd>Vos victoires et défaites.</dd>
                <dt>/classement</dt><dd>Classement du serveur.</dd>
                <dt>/global</dt><dd>Classement global, tous serveurs confondus.</dd>
                <dt>/suggest &lt;message&gt;</dt><dd>Suggérer une amélioration ou un mot.</dd>
                <dt>/bug &lt;message&gt;</dt><dd>Signaler un bug.</dd>
                <dt>/invite</dt><dd>Lien d'invitation du bot.</dd>
                <dt>/support</dt><dd>Lien du serveur d'assistance.</dd>
                <dt>/ping</dt><dd>Latence du bot.</dd>
                <dt>/bobo</dt><dd>Botus !</dd>
                <dt>/help</dt><dd>Liste des commandes.</dd>
            </dl>
            <h3>Pour les administrateurs du serveur</h3>
            <dl class="commandes">
                <dt>/set &lt;salon&gt;</dt><dd>Définit le salon de jeu.</dd>
                <dt>/create</dt><dd>Crée un salon <code>#botus</code>.</dd>
                <dt>/longueur &lt;0-20&gt;</dt><dd>Impose la longueur des prochains mots (0 : aléatoire).</dd>
                <dt>/setmot &lt;mot&gt;</dt><dd>Impose le mot à deviner. La partie ne compte pas au classement.</dd>
                <dt>/quoifeur on|off</dt><dd>Active les réponses automatiques (« quoi » → « feur »…). Désactivé par défaut.</dd>
            </dl>
        </section>

        <section class="carte">
            <h2>Besoin d'aide ?</h2>
            <p class="mb-0">Rejoignez le <a href="https://discord.gg/4M6596sjZa" target="_blank" rel="noopener">serveur d'assistance</a>, ou utilisez <code>/bug</code> et <code>/suggest</code> directement depuis Discord.</p>
        </section>
    </main>

    <?php require 'footer.php'; ?>
</body>
</html>
