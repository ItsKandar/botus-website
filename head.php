<?php
// En-tête commun. Avant le require : $titre et $css (feuilles propres à la page).
$titre = $titre ?? 'Botus';
$css = $css ?? [];

/**
 * URL d'un fichier statique avec une empreinte de son contenu (?v=…).
 * nginx sert CSS et JS avec « Cache-Control: immutable » pendant un an :
 * sans empreinte, Cloudflare et les navigateurs gardent l'ancienne version.
 */
function asset(string $chemin): string
{
    $fichier = __DIR__ . '/' . $chemin;
    $empreinte = is_file($fichier) ? substr(md5_file($fichier), 0, 10) : '0';
    return htmlspecialchars("$chemin?v=$empreinte");
}
?>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Botus : le jeu Motus sur Discord et dans le navigateur. Devinez le mot en 6 essais.">
<meta name="theme-color" content="#d00000">
<title><?= htmlspecialchars($titre) ?></title>
<link rel="icon" type="image/jpeg" href="assets/images/logo_botus.jpg">
<link rel="apple-touch-icon" href="assets/images/logo_botus.jpg">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,900&display=swap">

<link rel="stylesheet" href="<?= asset('assets/style/commun.css') ?>">
<?php foreach ($css as $feuille): ?>
<link rel="stylesheet" href="<?= asset("assets/style/$feuille.css") ?>">
<?php endforeach; ?>
