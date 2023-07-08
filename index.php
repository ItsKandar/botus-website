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

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <title>BOTUS</title>
</head>
<body>

    <header>
        <?php require("navbar.php") ?>
    </header>

    <main class="m-3">
        <div class="container">
            <div class="row justify-content-end">
                <div class="col-1" id="info"><p>?</p></div>
            </div>
            <div class="row">
                <div class="widget col-3">
                    <iframe class="widget-ds" src="https://discord.com/widget?id=1087078666850287766&theme=dark" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </div>
                <div class="game col d-flex flex-column align-items-center justify-content-center h-100">
                    <div id="box"></div>
                    <button class="play-btn" onclick="startGame()">PLAY</button>
        
                </div>
            </div>
        </div>
    </main>

    <!-- footer -->
    <?php require("footer.php") ?>

</body>
<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
<script src="assets/js/index.js"></script>
<script src="assets/js/game.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
</html>