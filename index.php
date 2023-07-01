<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/style/navbar.css">
    <link rel="stylesheet" href="assets/style/index.css">    

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poller+One&display=swap" rel="stylesheet">
    <title>BOTUS</title>
</head>
<body>

    <header>
        <?php require("navbar.php") ?>
    </header>

    <main>
        <section>

            <h2 class="leaderboard">Leaderboard</h2>
            <div class="widget">
                <iframe class="widget-ds" src="https://discord.com/widget?id=1087078666850287766&theme=dark" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </div>

            <div class="game">
                <div id="attempt-count">Tentatives: </div>
                <div id="box"></div>
                <button class="play-btn" onclick="startGame()">PLAY</button>

            </div>

        </section>
    </main>

    <!-- footer -->
    <?php require("footer.php") ?>

</body>
<script src="assets/js/game.js"></script>
<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
</html>