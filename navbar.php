<?php $page = $page ?? ''; ?>
<header>
    <nav class="navbar navbar-expand-md navbar-dark navbar-botus">
        <div class="container-xxl">
            <a class="navbar-brand d-flex align-items-center gap-2" href="./">
                <img src="assets/images/logo_botus.jpg" width="56" height="56" class="logo" alt="">
                <span>BOTUS</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Ouvrir le menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav ms-auto gap-md-4 align-items-md-center">
                    <li class="nav-item">
                        <a class="nav-link<?= $page === 'accueil' ? ' active" aria-current="page' : '' ?>" href="./">Jouer</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link<?= $page === 'documentation' ? ' active" aria-current="page' : '' ?>" href="documentation.php">Documentation</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link d-flex align-items-center gap-2" href="https://discord.com/oauth2/authorize?client_id=1086344574689095741&amp;permissions=8&amp;scope=bot%20applications.commands" target="_blank" rel="noopener">Ajouter le bot</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link d-flex align-items-center gap-2 btn-discord" href="https://discord.gg/7b7sHAG4fY" target="_blank" rel="noopener">
                            <img src="assets/images/white-discord-logo.png" height="20" alt="">
                            Nous rejoindre
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
