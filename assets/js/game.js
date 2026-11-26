/* global Swal */
'use strict';

// Jeu Botus : même règles que le bot Discord (ItsKandar/motus).
// - la première lettre est donnée, le mot fait entre 5 et 10 lettres ;
// - chaque proposition doit avoir la même longueur, commencer par la même
//   lettre et exister dans le dictionnaire ;
// - rouge = bien placée, jaune = mal placée (dans la limite des occurrences),
//   bleu = absente ; 6 essais au maximum.
(() => {
    const ESSAIS_MAX = 6;
    const CLAVIER = ['azertyuiop', 'qsdfghjklm', 'wxcvbn'];
    const DUREE_LETTRE = 250; // ms entre deux lettres révélées
    const RANG = { wrong: 1, exists: 2, correct: 3 };
    const SECOUSSE = [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(0)' },
    ];

    /**
     * Raccourci pour document.getElementById.
     * @param {string} id Identifiant de l'élément.
     * @returns {HTMLElement} L'élément trouvé.
     */
    const el = (id) => document.getElementById(id);
    const grille = el('grille');
    const message = el('message');
    const clavier = el('clavier');
    const compteur = el('essai');
    const boutonRejouer = el('rejouer');
    const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)');

    let mots = null;          // mots à deviner
    let dico = null;          // Set des mots acceptés (null : pas de vérification)
    let chargement = null;

    let cible = '';
    let essai = 0;            // index de la ligne en cours
    let saisie = '';
    let connues = [];         // lettres bien placées déjà trouvées
    let etatTouches = {};
    let enCours = false;
    let verrou = false;       // pendant l'animation

    /**
     * Met en minuscules et retire les accents (é → e, ç → c).
     * @param {string} texte Texte à normaliser.
     * @returns {string} Texte normalisé.
     */
    const normaliser = (texte) =>
        texte.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    /**
     * Attend quelques millisecondes.
     * @param {number} ms Durée.
     * @returns {Promise<void>} Résolue après la durée.
     */
    const pause = (ms) => new Promise((resoudre) => setTimeout(resoudre, ms));

    /**
     * Charge (une seule fois) les mots à deviner et le dictionnaire.
     * Sans dictionnaire, le jeu reste jouable : toute proposition est acceptée.
     * @returns {Promise<void>} Résolue quand les listes sont prêtes.
     */
    function charger() {
        chargement ??= Promise.all([
            fetch('assets/mots/mots.json').then((reponse) => {
                if (!reponse.ok) throw new Error(`mots.json : HTTP ${reponse.status}`);
                return reponse.json();
            }),
            fetch('assets/mots/dico.txt')
                .then((reponse) => (reponse.ok
                    ? reponse.text()
                    : Promise.reject(new Error(`dico.txt : HTTP ${reponse.status}`))))
                .then((texte) => new Set(texte.split('\n').filter(Boolean)))
                .catch((erreur) => {
                    console.warn('Dictionnaire indisponible, propositions non vérifiées.', erreur);
                    return null;
                }),
        ]).then(([listeMots, listeDico]) => {
            mots = listeMots;
            dico = listeDico;
        });
        return chargement;
    }

    /**
     * Couleurs façon Motus, en tenant compte des lettres en double :
     * d'abord les bien placées, puis les mal placées sur ce qui reste.
     * @param {string} proposition Mot proposé.
     * @param {string} mot Mot à deviner.
     * @returns {string[]} 'correct', 'exists' ou 'wrong' pour chaque lettre.
     */
    function evaluer(proposition, mot) {
        const resultat = Array(mot.length).fill('wrong');
        const restantes = {};
        for (let i = 0; i < mot.length; i++) {
            if (proposition[i] === mot[i]) resultat[i] = 'correct';
            else restantes[mot[i]] = (restantes[mot[i]] || 0) + 1;
        }
        for (let i = 0; i < mot.length; i++) {
            if (resultat[i] !== 'correct' && restantes[proposition[i]] > 0) {
                resultat[i] = 'exists';
                restantes[proposition[i]]--;
            }
        }
        return resultat;
    }

    /**
     * Crée la grille vide : 6 lignes de la longueur du mot.
     * @returns {void}
     */
    function construireGrille() {
        grille.replaceChildren();
        grille.style.setProperty('--colonnes', cible.length);
        for (let ligneIndex = 0; ligneIndex < ESSAIS_MAX; ligneIndex++) {
            const ligne = document.createElement('div');
            ligne.className = 'ligne';
            for (let colonne = 0; colonne < cible.length; colonne++) {
                const caseLettre = document.createElement('div');
                caseLettre.className = 'case';
                ligne.append(caseLettre);
            }
            grille.append(ligne);
        }
    }

    /**
     * Crée une touche du clavier à l'écran.
     * @param {string} texte Texte affiché.
     * @param {string} valeur Lettre ou nom de touche (Enter, Backspace).
     * @param {string} [classe] Classe CSS supplémentaire.
     * @param {string} [label] Libellé accessible.
     * @returns {HTMLButtonElement} La touche.
     */
    function touche(texte, valeur, classe, label) {
        const bouton = document.createElement('button');
        bouton.type = 'button';
        bouton.className = classe ? `touche ${classe}` : 'touche';
        bouton.textContent = texte;
        bouton.dataset.touche = valeur;
        if (label) bouton.setAttribute('aria-label', label);
        return bouton;
    }

    /**
     * Crée le clavier AZERTY à l'écran.
     * @returns {void}
     */
    function construireClavier() {
        clavier.replaceChildren();
        CLAVIER.forEach((lettres, index) => {
            const rangee = document.createElement('div');
            rangee.className = 'rangee';
            if (index === 2) rangee.append(touche('Entrée', 'Enter', 'large'));
            for (const lettre of lettres) rangee.append(touche(lettre.toUpperCase(), lettre));
            if (index === 2) rangee.append(touche('⌫', 'Backspace', 'large', 'Effacer'));
            clavier.append(rangee);
        });
    }

    /**
     * Affiche la ligne en cours : lettres tapées, sinon indices déjà trouvés.
     * @returns {void}
     */
    function afficherLigne() {
        const cases = grille.children[essai].children;
        for (let i = 0; i < cible.length; i++) {
            const caseLettre = cases[i];
            caseLettre.textContent = (saisie[i] || connues[i] || '').toUpperCase();
            caseLettre.classList.toggle('indice', !saisie[i] && Boolean(connues[i]));
            caseLettre.classList.toggle('remplie', Boolean(saisie[i]));
        }
        grille.querySelectorAll('.ligne').forEach((ligne, index) => {
            ligne.classList.toggle('active', index === essai);
        });
    }

    /**
     * Affiche un message sous la grille.
     * @param {string} texte Message.
     * @param {string} [type] '', 'erreur' ou 'succes'.
     * @returns {void}
     */
    function afficherMessage(texte, type = '') {
        message.textContent = texte;
        message.className = type;
    }

    /**
     * Secoue la ligne en cours (proposition refusée).
     * @returns {void}
     */
    function secouer() {
        if (mouvementReduit.matches) return;
        grille.children[essai].animate(SECOUSSE, { duration: 400 });
    }

    /**
     * Ajoute une lettre à la proposition.
     * @param {string} lettre Lettre de a à z.
     * @returns {void}
     */
    function taper(lettre) {
        if (saisie.length >= cible.length) return;
        saisie += lettre;
        afficherMessage('');
        afficherLigne();
    }

    /**
     * Efface la dernière lettre (sauf la première, imposée).
     * @returns {void}
     */
    function effacer() {
        if (saisie.length <= 1) return;
        saisie = saisie.slice(0, -1);
        afficherLigne();
    }

    /**
     * Colore la touche du clavier selon le meilleur état connu de la lettre.
     * @param {string} lettre Lettre.
     * @param {string} etat 'correct', 'exists' ou 'wrong'.
     * @returns {void}
     */
    function marquerTouche(lettre, etat) {
        if ((RANG[etat] || 0) <= (RANG[etatTouches[lettre]] || 0)) return;
        etatTouches[lettre] = etat;
        const bouton = clavier.querySelector(`[data-touche="${lettre}"]`);
        if (bouton) {
            bouton.classList.remove('correct', 'exists', 'wrong');
            bouton.classList.add(etat);
        }
    }

    /**
     * Fin de partie : message et bouton Rejouer.
     * @param {boolean} gagne Vrai si le mot a été trouvé.
     * @returns {void}
     */
    function terminer(gagne) {
        enCours = false;
        const essais = essai + 1;
        const pluriel = essais > 1 ? 's' : '';
        afficherMessage(
            gagne ? `Bravo ! Trouvé en ${essais} essai${pluriel}.` : `Perdu : le mot était ${cible.toUpperCase()}.`,
            gagne ? 'succes' : 'erreur'
        );
        boutonRejouer.hidden = false;
        boutonRejouer.focus();
    }

    /**
     * Vérifie la proposition, révèle les couleurs lettre par lettre,
     * puis passe à la ligne suivante ou termine la partie.
     * @returns {Promise<void>} Résolue après l'animation.
     */
    async function valider() {
        if (saisie.length < cible.length) {
            afficherMessage(`Il faut un mot de ${cible.length} lettres.`, 'erreur');
            secouer();
            return;
        }
        if (dico && !dico.has(saisie) && saisie !== cible) {
            afficherMessage(`« ${saisie.toUpperCase()} » n'est pas dans le dictionnaire.`, 'erreur');
            secouer();
            return;
        }

        verrou = true;
        const resultat = evaluer(saisie, cible);
        const cases = grille.children[essai].children;
        grille.children[essai].classList.remove('active');
        for (let i = 0; i < cible.length; i++) {
            cases[i].textContent = saisie[i].toUpperCase();
            cases[i].classList.remove('indice');
            cases[i].classList.add(resultat[i]);
            if (resultat[i] === 'correct') connues[i] = saisie[i];
            marquerTouche(saisie[i], resultat[i]);
            await pause(DUREE_LETTRE);
        }
        verrou = false;

        if (saisie === cible) {
            terminer(true);
            return;
        }
        essai++;
        if (essai >= ESSAIS_MAX) {
            terminer(false);
            return;
        }

        saisie = cible[0];
        compteur.textContent = essai + 1;
        afficherLigne();
    }

    /**
     * Tire un nouveau mot (différent du précédent) et remet le jeu à zéro.
     * @returns {Promise<void>} Résolue quand la grille est prête.
     */
    async function nouvellePartie() {
        if (verrou) return;
        try {
            await charger();
        } catch (erreur) {
            console.error(erreur);
            afficherMessage('Impossible de charger la liste des mots. Réessayez plus tard.', 'erreur');
            return;
        }
        const precedent = enCours && essai > 0 ? cible.toUpperCase() : '';
        let mot = cible;
        while (mot === cible) {
            mot = mots[Math.floor(Math.random() * mots.length)];
            if (mots.length < 2) break;
        }
        cible = mot;
        essai = 0;
        saisie = cible[0];
        connues = [cible[0]];
        etatTouches = {};
        enCours = true;
        boutonRejouer.hidden = true;
        compteur.textContent = 1;
        construireGrille();
        construireClavier();
        afficherLigne();
        afficherMessage(precedent
            ? `Le mot précédent était ${precedent}.`
            : `Un mot de ${cible.length} lettres, à vous de jouer !`);
    }

    /**
     * Traite une touche (clavier physique ou à l'écran).
     * @param {string} valeur Lettre, 'Enter' ou 'Backspace'.
     * @returns {void}
     */
    function action(valeur) {
        if (!enCours || verrou) return;
        if (valeur === 'Enter') valider();
        else if (valeur === 'Backspace') effacer();
        else {
            const lettre = normaliser(valeur);
            if (/^[a-z]$/.test(lettre)) taper(lettre);
        }
    }

    document.addEventListener('keydown', (evenement) => {
        if (evenement.ctrlKey || evenement.metaKey || evenement.altKey) return;
        if (window.Swal && Swal.isVisible()) return;
        const element = evenement.target instanceof Element ? evenement.target : null;
        if (element?.closest('input, textarea, select')) return;
        const { key } = evenement;
        if (key !== 'Enter' && key !== 'Backspace' && key.length !== 1) return;
        if (!enCours) {
            // Partie finie : Entrée relance, où que soit le focus.
            if (key === 'Enter' && !boutonRejouer.hidden && !element?.closest('button')) {
                evenement.preventDefault();
                nouvellePartie();
            }
            return;
        }
        // Entrée sur un bouton (Jouer, Nouveau mot) garde son comportement normal.
        if (key === 'Enter' && element?.closest('button')) return;
        evenement.preventDefault();
        action(key);
    });

    clavier.addEventListener('click', (evenement) => {
        const bouton = evenement.target.closest('[data-touche]');
        if (bouton) {
            action(bouton.dataset.touche);
            bouton.blur();
        }
    });

    el('jouer').addEventListener('click', () => {
        el('accueil').hidden = true;
        el('partie').hidden = false;
        nouvellePartie();
    });

    boutonRejouer.addEventListener('click', () => nouvellePartie());

    el('nouveau-mot').addEventListener('click', (evenement) => {
        evenement.currentTarget.blur();
        nouvellePartie();
    });

    // Précharge les listes dès l'arrivée sur la page.
    charger().catch((erreur) => console.error(erreur));
})();
