/* global Swal */
'use strict';

// Fenêtre « Comment jouer ? »
(() => {
    /**
     * Ligne d'exemple de l'aide, avec une seule case colorée.
     * @param {string} mot Mot affiché.
     * @param {number} index Position de la case colorée.
     * @param {string} etat 'correct', 'exists' ou 'wrong'.
     * @returns {string} HTML de la ligne.
     */
    const exemple = (mot, index, etat) => {
        const cases = [...mot]
            .map((lettre, position) => `<span class="case${position === index ? ` ${etat}` : ''}">${lettre}</span>`)
            .join('');
        return `<div class="exemple">${cases}</div>`;
    };

    const aide = `
        <div class="aide">
            <p>Le principe du jeu télévisé Motus : un mot est tiré au hasard, vous avez <b>6 essais</b> pour le trouver. La première lettre est donnée.</p>
            <p>Chaque proposition doit avoir la même longueur, commencer par la même lettre et exister dans le dictionnaire. Les accents sont ignorés.</p>
            ${exemple('FRUIT', 0, 'correct')}
            <p>Le <span class="span-correct">F</span> est dans le mot, à la bonne place.</p>
            ${exemple('POCHE', 2, 'exists')}
            <p>Le <span class="span-exists">C</span> est dans le mot, mais pas à cette place.</p>
            ${exemple('SOEUR', 4, 'wrong')}
            <p>Le <span class="span-wrong">R</span> n'est pas dans le mot.</p>
            <p class="small">Clavier physique ou clavier à l'écran ; <b>Entrée</b> pour valider.</p>
        </div>`;

    document.getElementById('aide').addEventListener('click', () => {
        if (!window.Swal) return;
        Swal.fire({
            title: 'Comment jouer ?',
            icon: 'question',
            html: aide,
            showCloseButton: true,
            confirmButtonColor: '#5865F2',
            confirmButtonText: "J'ai compris !",
        });
    });
})();
