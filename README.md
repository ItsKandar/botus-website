# botus-website

Site de [Botus](https://botus.fr) : le jeu Motus du bot Discord ([ItsKandar/motus](https://github.com/ItsKandar/motus)), jouable dans le navigateur, et la documentation du bot.

## Structure

| Fichier | Rôle |
|---|---|
| `index.php` | Page de jeu |
| `documentation.php` | Documentation du bot (commandes, règles) |
| `head.php`, `navbar.php`, `footer.php` | Parties communes |
| `assets/js/game.js` | Moteur du jeu (JavaScript sans dépendance) |
| `assets/js/index.js` | Fenêtre « Comment jouer ? » (SweetAlert2) |
| `assets/mots/mots.json` | Mots à deviner (5 à 10 lettres) |
| `assets/mots/dico.txt` | Mots acceptés comme propositions |
| `outils/generer_mots.py` | Régénère `assets/mots/` depuis les listes du bot |

## Règles (identiques au bot)

- La première lettre est donnée ; 6 essais.
- Une proposition doit avoir la bonne longueur, la bonne première lettre et exister dans le dictionnaire. Accents ignorés.
- Rouge : bien placée. Jaune : mal placée (dans la limite des occurrences restantes). Bleu : absente.

## Développer en local

```bash
php -S 127.0.0.1:8000
```

## Mettre à jour les listes de mots

Récupérer `bot/mots/dico.py` et `bot/mots/mots.py` du dépôt du bot dans un dossier, puis :

```bash
python3 -I outils/generer_mots.py <dossier> assets/mots
```
