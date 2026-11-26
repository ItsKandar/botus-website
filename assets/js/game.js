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

    const el = (id) => document.getElementById(id);
    const grille = el('grille');
    const message = el('message');
    const clavier = el('clavier');
    const compteur = el('essai');
    const boutonRejouer = el('rejouer');

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

    const normaliser = (texte) =>
        texte.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    function charger() {
        chargement ??= Promise.all([
            fetch('assets/mots/mots.json').then((r) => {
                if (!r.ok) throw new Error(`mots.json : HTTP ${r.status}`);
                return r.json();
            }),
            fetch('assets/mots/dico.txt')
                .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`dico.txt : HTTP ${r.status}`))))
                .then((t) => new Set(t.split('\n').filter(Boolean)))
                .catch((e) => {
                    // Sans dictionnaire, le jeu reste jouable : on accepte tout mot.
                    console.warn('Dictionnaire indisponible, propositions non vérifiées.', e);
                    return null;
                }),
        ]).then(([m, d]) => {
            mots = m;
            dico = d;
        });
        return chargement;
    }

    // Couleurs façon Motus, en tenant compte des lettres en double :
    // d'abord les bien placées, puis les mal placées sur ce qui reste.
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

    function construireGrille() {
        grille.replaceChildren();
        grille.style.setProperty('--colonnes', cible.length);
        for (let l = 0; l < ESSAIS_MAX; l++) {
            const ligne = document.createElement('div');
            ligne.className = 'ligne';
            for (let c = 0; c < cible.length; c++) {
                const caseLettre = document.createElement('div');
                caseLettre.className = 'case';
                ligne.append(caseLettre);
            }
            grille.append(ligne);
        }
    }

    function construireClavier() {
        clavier.replaceChildren();
        CLAVIER.forEach((rangee, i) => {
            const div = document.createElement('div');
            div.className = 'rangee';
            if (i === 2) div.append(touche('Entrée', 'Enter', 'large'));
            for (const lettre of rangee) div.append(touche(lettre.toUpperCase(), lettre));
            if (i === 2) div.append(touche('⌫', 'Backspace', 'large', 'Effacer'));
            clavier.append(div);
        });
    }

    function touche(texte, valeur, classe, label) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'touche' + (classe ? ` ${classe}` : '');
        b.textContent = texte;
        b.dataset.touche = valeur;
        if (label) b.setAttribute('aria-label', label);
        return b;
    }

    // Affiche la ligne en cours : lettres tapées, sinon indices déjà trouvés.
    function afficherLigne() {
        const cases = grille.children[essai].children;
        for (let i = 0; i < cible.length; i++) {
            const c = cases[i];
            c.textContent = (saisie[i] || connues[i] || '').toUpperCase();
            c.classList.toggle('indice', !saisie[i] && Boolean(connues[i]));
            c.classList.toggle('remplie', Boolean(saisie[i]));
        }
        grille.querySelectorAll('.ligne').forEach((l, i) => l.classList.toggle('active', i === essai));
    }

    function afficherMessage(texte, type = '') {
        message.textContent = texte;
        message.className = type;
    }

    function secouer() {
        const ligne = grille.children[essai];
        ligne.classList.remove('secoue');
        void ligne.offsetWidth; // relance l'animation
        ligne.classList.add('secoue');
    }

    function taper(lettre) {
        if (saisie.length >= cible.length) return;
        saisie += lettre;
        afficherMessage('');
        afficherLigne();
    }

    function effacer() {
        if (saisie.length <= 1) return; // la première lettre est imposée
        saisie = saisie.slice(0, -1);
        afficherLigne();
    }

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
            await new Promise((r) => setTimeout(r, DUREE_LETTRE));
        }
        verrou = false;

        if (saisie === cible) return terminer(true);
        essai++;
        if (essai >= ESSAIS_MAX) return terminer(false);

        saisie = cible[0];
        compteur.textContent = essai + 1;
        afficherLigne();
    }

    function marquerTouche(lettre, etat) {
        if ((RANG[etat] || 0) <= (RANG[etatTouches[lettre]] || 0)) return;
        etatTouches[lettre] = etat;
        const b = clavier.querySelector(`[data-touche="${lettre}"]`);
        if (b) {
            b.classList.remove('correct', 'exists', 'wrong');
            b.classList.add(etat);
        }
    }

    function terminer(gagne) {
        enCours = false;
        const essais = essai + 1;
        afficherMessage(
            gagne ? `Bravo ! Trouvé en ${essais} essai${essais > 1 ? 's' : ''}.` : `Perdu : le mot était ${cible.toUpperCase()}.`,
            gagne ? 'succes' : 'erreur'
        );
        boutonRejouer.hidden = false;
        boutonRejouer.focus();
    }

    async function nouvellePartie() {
        if (verrou) return;
        try {
            await charger();
        } catch (e) {
            console.error(e);
            afficherMessage('Impossible de charger la liste des mots. Réessayez plus tard.', 'erreur');
            return;
        }
        const precedent = enCours && essai > 0 ? cible.toUpperCase() : '';
        let mot;
        do {
            mot = mots[Math.floor(Math.random() * mots.length)];
        } while (mots.length > 1 && mot === cible);
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
        afficherMessage(precedent ? `Le mot précédent était ${precedent}.` : `Un mot de ${cible.length} lettres, à vous de jouer !`);
    }

    function action(valeur) {
        if (!enCours || verrou) return;
        if (valeur === 'Enter') valider();
        else if (valeur === 'Backspace') effacer();
        else {
            const lettre = normaliser(valeur);
            if (/^[a-z]$/.test(lettre)) taper(lettre);
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (window.Swal && Swal.isVisible()) return;
        const elt = e.target instanceof Element ? e.target : null;
        if (elt?.closest('input, textarea, select')) return;
        if (e.key === 'Enter' || e.key === 'Backspace' || e.key.length === 1) {
            if (!enCours) {
                // Partie finie : Entrée relance, où que soit le focus.
                if (e.key === 'Enter' && !boutonRejouer.hidden && !elt?.closest('button')) {
                    e.preventDefault();
                    nouvellePartie();
                }
                return;
            }
            // Entrée sur un bouton (Jouer, Nouveau mot) garde son comportement normal.
            if (e.key === 'Enter' && elt?.closest('button')) return;
            e.preventDefault();
            action(e.key);
        }
    });

    clavier.addEventListener('click', (e) => {
        const b = e.target.closest('[data-touche]');
        if (b) {
            action(b.dataset.touche);
            b.blur();
        }
    });

    el('jouer').addEventListener('click', () => {
        el('accueil').hidden = true;
        el('partie').hidden = false;
        nouvellePartie();
    });

    boutonRejouer.addEventListener('click', () => nouvellePartie());

    el('nouveau-mot').addEventListener('click', (e) => {
        e.currentTarget.blur();
        nouvellePartie();
    });

    // Précharge les listes dès l'arrivée sur la page.
    charger().catch(() => {});
})();
