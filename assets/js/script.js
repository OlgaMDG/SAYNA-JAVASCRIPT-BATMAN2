window.onload=()=>{

    //Pop Up
    //let myForm =document.getElementById('formulaire');//les deux commentaires travaillent ensemble, soit tu mets listener en submit et getId de formulaire, soit listener submit et tu vise getId du button
    let myForm =document.getElementById('validation');
    //myForm.addEventListener('submit', (e)=>{
    myForm.addEventListener('click', (e)=>{
      
      let email= document.querySelector('.champ-email');//comme email=document.getElementById('IdInput');
      let mySelect = document.querySelector('.mySelect');
      let myTextarea = document.getElementById("myTextarea");
      
      if(email.value==='' || mySelect.value==='' || myTextarea.value===''){
        e.preventDefault();

        let invalidMail=document.getElementById('inavlid-mail');
        invalidMail.innerHTML="S'il vous plaît, entrez un mail";//Message d'erreur comme
        invalidMail.style.color="red";
        invalidMail.style.fontStyle="italic";
        
        let invalidSelect = document.getElementById('invalid-select');
        invalidSelect.innerHTML ="S'il vous plaît, choisissez une fréquence pour votre newsletter";
        invalidSelect.style.color="red";
        invalidSelect.style.fontStyle="italic";

        let invalidTextarea =  document.getElementById('invalidTextarea');
        invalidTextarea.innerHTML="S'il vous plaît, entrez votre message";
        invalidTextarea.style.color="red";
        invalidTextarea.style.fontStyle="italic";

          email.addEventListener('input', function() {
            if (email.value.trim() !== '') {//Enlever le message d'erreur pour le mail
              invalidMail.innerHTML = '';
            }
          });


          mySelect.addEventListener('input', function() {
            if (mySelect.value.trim() !== '') {
              invalidSelect.innerHTML = '';
            }
          });

          myTextarea.addEventListener('input', function() {
            if (myTextarea.value.trim() !== '') {
              invalidTextarea.innerHTML = '';
            }
          });

      }
      else{
        e.preventDefault();
        let popupMontre= document.getElementById('popup');
        popupMontre.style.display='block';
        window.scrollTo({
          top: document.getElementById('contact').offsetTop
        });
      }
  })
  let popupMontre= document.getElementById('popup');

  document.addEventListener('click', (e) => {
    if (popupMontre.contains(e.target)) {
      
      // Masquer le popup en cliquant dans le popup
      popupMontre.style.display = 'none';
      let email= document.querySelector('.champ-email');
      let mySelect = document.querySelector('.mySelect');
      let myTextarea = document.getElementById("myTextarea");
      email.value = '';
      mySelect.value = '';
      myTextarea.value = '';
    }
  });

  //Scrolling progressif sur les boutons Batman
  $(document).ready(function() {
    // Défilement en douceur lorsqu'un lien est cliqué
    $('a[href^="#"]').on('click', function(event) {
        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800);
        }
    });
  });

  //Apparition progressive des éléments au fur et à mesure du scrolling, avec une classe reveal
  const ratio = .1
  const options = {
    root: null,
    rootMargin: '0px', //marge d'apparition
    threshold: ratio //10% l'objet qui apparaît et on va déjà avoir notre animation
  }

  const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry){
      if(entry.intersectionRatio > ratio){
        entry.target.classList.add('reveal-visible')
        observer.unobserve(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(handleIntersect, options)
 document.querySelectorAll('.reveal').forEach(function (r){
    observer.observe(r)
  })

  //Zoom image en scrollant
  $(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    var windowHeight = $(this).height();
    
    $('.zoom-image').each(function() {
      var imagePosition = $(this).offset().top;
      
      if (imagePosition < scrollTop + windowHeight) {
        var scrollPercentage = (scrollTop + windowHeight - imagePosition) / windowHeight;
        var zoomLevel = scrollPercentage * 100;
        
        $(this).css({
          'opacity': 1,
          'transform': 'scale(' + zoomLevel + '%)'
        });
      } else {
        $(this).css({
          'opacity': 0,
          'transform': 'scale(0)'
        });
      }
    });
  });

  //Notre souris
  var container = document.querySelector('.container-souri');
  var bat = document.querySelector('#bat');
  
  container.addEventListener('mousemove', function(e) {
    var x = e.clientX;
    var y = e.clientY;
  
    bat.style.opacity = '1';
    bat.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  });
  
  container.addEventListener('mouseout', function() {
    bat.style.opacity = '0';
  });

}