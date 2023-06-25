  $(document).ready(function() {
    //apparition avec un mouvement slide
        // Fonction pour vérifier si un élément est visible à l'écran
        function isElementInViewport(element) {
          var rect = element.getBoundingClientRect();
          return (
            rect.left >= 0 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
          );
        }
        // Fonction pour ajouter la classe "fade-in" aux éléments visibles
        function handleScroll() {
          var elements = document.querySelectorAll('.fade-in');
          for (var i = 0; i < elements.length; i++) {
            if (isElementInViewport(elements[i])) {
              elements[i].classList.add('visible');
            }
          }
        }
        // Ajoutez un écouteur d'événement pour détecter le défilement de la page
        window.addEventListener('scroll', handleScroll);

        
    var questions = [];
    var currentQuestion = 0;
    var currentQuestionIndex = 0;
    var score = 0;

  //les images
    var questionImages = {
        "Quel est l’autre nom de l’Homme-Mystère ?": "./assets/Illustrations/Batgame_3.png",
        "Quelle est l’ancienne profession de Harley Quinn ?": "./assets/Illustrations/Batgame_4.png",
        "Quel est l’objet fétiche de Double Face ?": "./assets/Illustrations/Batgame_5.png",
        "Quelle ville Batman défend-il ?": "./assets/Illustrations/Batgame_10.png",
        "Tim Burtin a réalisé deux Batman, qui jouait Batman ?": "./assets/Illustrations/Batgame_11.png",
        "Quel est le prénom des parents du jeune Bruce Wayne ?": "./assets/Illustrations/Batgame_18.png",
        "Dans son premier Batman (1989) Jack Nicholson jouait :": "./assets/Illustrations/Batgame_12.png",
        " Qui interprète le Joker en 2008 ?": "./assets/Illustrations/Batgame_19.png",
        "En quelle année Robin fait il sa première apparition ?": "./assets/Illustrations/Batgame_20.png",
        "Qui est la fille de Batman et Catwoman (Earth - 2) ?": "./assets/Illustrations/Batgame_21.png",
        "Batman c’est aussi le nom d’une ville en...": "./assets/Illustrations/Batgame_7.png",
        "Qui a realisé Batman en 1966 ?": "./assets/Illustrations/Batgame_6.png"
      };
    // Fonction pour récupérer les questions via AJAX
    function fetchQuestions() {
      $.ajax({
        url: "https://batman-api.sayna.space/questions",
        dataType: 'json',
        success: function(data) {
          questions = data;
          showQuestion(0);
          $("#avant-quizz").hide();
          $("#question-container").show();
        },
        error: function() {
          alert("Une erreur s'est produite lors de la récupération des questions.");
        }
      });
      
    }
  
    // Fonction pour afficher une question
    function showQuestion(index) {
        var question = questions[index];
        $("#question").text(question.question);
      
        var image = questionImages[question.question];
        if (image) {
            $("#image-container").attr("src", image); // Mettre à jour l'attribut src avec l'image correspondante
            $("#image-container").show(); // Afficher l'image
        } else {
            $("#image-container").hide(); // Masquer l'image si elle n'est pas définie
        }
        currentQuestion = index + 1; // Mettre à jour le numéro de la question actuelle

      // Réinitialiser la sélection de réponse
      $("input[name='response']").prop("checked", false);

      var question = questions[index];
      $("#question-title").text(currentQuestion + "/" + questions.length);
      $("#question").text(question.question);
      $("#response0").text(question.response[0].text);
      $("#response1").text(question.response[1].text);
      $("#response2").text(question.response[2].text);
    }
  
// Fonction pour afficher le score final
function showScore() {
  var message = "Votre score : " + score + " / " + questions.length;
  $("#answers-container").text(message);
  $("#next-button").hide();
  $("#show-answers-button").hide();
  
  // Cacher le quizz
  $("#question-container").hide();
  
  // Afficher le message de score
  $("#score-message").text("Votre score est de " + score + " sur " + questions.length + ".");
  $("#score-message").show();
}

//Fonction pour vérifier la réponse sélectionnée
function checkAnswer(index) {
    var question = questions[index];
    var selectedResponse = $("input[name='response']:checked").val();
  
    if (selectedResponse !== undefined) {
      if (question.response[selectedResponse].isGood) {
        score++;
      }
  
      if (index < questions.length - 1) {
        showQuestion(index + 1);
        currentQuestionIndex = index + 1; // Mise à jour de l'index de la question actuelle
      } else {
        showScore();
      }
    } else {
      //alert("Veuillez sélectionner une réponse.");
      var title = "Erreur";
      var content = "Veuillez sélectionner une réponse.";
    
      $("#dialog-title").text(title);
      $("#dialog-content").text(content);
      $("#dialog-box").show();
    }
  }

function showScore() {
  var titreMessageScore = "";
  var message = "";

  if (score >= 0 && score <= 4) {
    titreMessageScore = score + "/" + questions.length + " C'est pas tout à fait ça...";
    message = "Oula! Heuresement que le Riddler est sous les verrous... Il faut que vous vous repassiez les films, cette fois en enlevant peut-être le masque qui vous a bloqué la vue! Alors, rien n'est perdu!";
  } else if (score >= 5 && score <= 9) {
    titreMessageScore =  score + "/" + questions.length + " Pas mal!";
    message = "Encore un peu d'entrainement avec le chevalier Noir, vous serait bénéfique, mais vous pouvez marcher la tête haute, vos connaissances sont là. A vous de les consolider, foncez, Gotham est votre terrain de chasse!";
  } else if (score >= 10 && score <= 12) {
    titreMessageScore = score + "/" + questions.length +  " Bravo!";
    message = "Vous êtes véritablement un super fan de l'univers de Batman! Comics, films, rien ne vous échappe. Bruce Wayne a de quoi être fier, Gotham est en paix et Batman peut prendre sa retraite, vous veillez aux grains!";
  } else {
    titreMessageScore = "Score inconnu";
    message = "Score non valide";
  }

  //titreMessageScore += " (" + score + "/" + questions.length + ")";
  
  $("#titre-message").text(titreMessageScore);
  $("#score-message").text(message);
  
  // Masquer les éléments du quizz
  $("#question-container").hide();
  $("#next-button").hide();
  
  // Afficher le pop-up du score
  $("#score-popup").show();
}

// Gestionnaire d'événement pour le bouton "Recommencer le quizz"
$("#restart-button").click(function() {
  // Cacher le pop-up du score
  $("#score-popup").hide();

  // Réinitialiser les variables du quizz
  currentQuestion = 0;
  currentQuestionIndex = 0;
  score = 0;

  // Afficher à nouveau le quizz
  $("#question-container").show();
  $("#next-button").show();
  $("#show-answers-button").show();

  // Charger les questions
  fetchQuestions();
});


// Gestionnaire d'événement pour le bouton "Démarrer"
$("#start-button").click(function() {
  fetchQuestions();
});

// Gestionnaire d'événement pour le bouton "Question suivante"
$("#next-button").click(function() {
  checkAnswer(currentQuestionIndex);
});

// Gestionnaire d'événement pour le bouton "Afficher les réponses"
$("#show-answers-button").click(function() {
  showScore();
});

$("#dialog-button").click(function() {
  // Cacher la boîte de dialogue
  $("#dialog-box").hide();
});


});