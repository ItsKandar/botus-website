$("#info").click(function(){
    Swal.fire({
        title: '<strong>Comment jouer?</strong>',
        icon: 'question',
        html:
          '<p>Ce jeu reprend exactement le même concept que le jeu télévisé français Motus.</p>' +
          '<p>Chaque partie, un mot est choisi aléatoirement. Vous devez le deviner en 6 essais.</p>' +
          '<p>À chaque essai, les lettres du mot que vous avez proposé changeront de couleur en fonction de à quel point vous êtes proche de le trouver.</p>'+
          ''+
          '<div class="d-flex justify-content-center"><div class="help-letter-container correct"> F </div><div class="help-letter-container"> R </div><div class="help-letter-container"> U </div><div class="help-letter-container"> I </div><div class="help-letter-container"> T </div></div>'+
          '<p>La lettre <span class="span-correct"> F </span> est dans le mot, à la bonne place.</p>'+
          '<div class="d-flex justify-content-center"><div data-v-0b5fe804="" class="help-letter-container"> P </div><div data-v-0b5fe804="" class="help-letter-container"> O </div><div data-v-0b5fe804="" class="help-letter-container exists"> C </div><div data-v-0b5fe804="" class="help-letter-container"> H </div><div data-v-0b5fe804="" class="help-letter-container"> E </div></div>'+
          '<p>La lettre <span class="span-exists"> C </span> est dans le mot, mais pas à la bonne place.</p>'+
          '<div class="d-flex justify-content-center"><div data-v-0b5fe804="" class="help-letter-container"> S </div><div data-v-0b5fe804="" class="help-letter-container"> O </div><div data-v-0b5fe804="" class="help-letter-container"> E </div><div data-v-0b5fe804="" class="help-letter-container"> U </div><div data-v-0b5fe804="" class="help-letter-container wrong"> R </div></div>'+
          '<p>La lettre <span class="span-wrong"> R </span> n\'est pas dans le mot.</p>',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
          'J\'ai compris !',
      })
})