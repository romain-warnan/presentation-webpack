var FICHES = {};

var $FICHE_CONTAINER;
var $FICHE_TITLE;

var makeParagraphe = function(titre, contenu) {
  var $paragraphe = $("<div>", { class: "paragraphe" }).append($("<h4>", { class: "titre" }).text(titre + " :"));
  var $container = $("<div>", { class: "contenu" }).html(contenu);
  $paragraphe.append($container);
  return $paragraphe;
};

var afficherFiche = function(fiche) {
  $FICHE_TITLE.text(fiche.niveau + " " + fiche.code + " : " + fiche.libelle);
  $FICHE_CONTAINER.empty();
  if (fiche.noteGenerale) {
    $FICHE_CONTAINER.append(makeParagraphe("Note générale", fiche.noteGenerale));
  }
  if (fiche.comprend) {
    $FICHE_CONTAINER.append(makeParagraphe("Comprend", fiche.comprend));
  }
  if (fiche.neComprendPas) {
    $FICHE_CONTAINER.append(makeParagraphe("Ne comprend pas", fiche.neComprendPas));
  }
};

/**
* lance l'application
*/
$(document).ready(function() {
  $FICHE_CONTAINER = $(".fiche-containeur");
  $FICHE_TITLE = $(".fiche-titre");

  $(".button").button();
  $("#accordion").accordion({
    heightStyle: "content"
  });
  $("input[name='nafrev2'").autocomplete({
    create: function() {
      $(this).data("ui-autocomplete")._renderItem = function(ul, item) {
        var fiche = FICHES[item.value];
        var $li = $("<li>")
          .append($("<span>").text(fiche.code))
          .append($("<span>").text(fiche.libelle))
          .appendTo(ul);
        return $li;
      };
    },
    select: function(event, ui) {
      afficherFiche(FICHES[ui.item.value]);
    },
    source: function(request, response) {
      var terms = request.term;
      $.ajax({
        url: encodeURI("/demo-js/nomenclature/search?q=" + request.term + "*"),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
        .done(function(rubriques) {
          var tuples = [];
          rubriques.forEach(function(r) {
            FICHES[r.code] = r;
            tuples.push({ label: r.libelle, value: r.code });
          });
          response(tuples);
        })
        .fail(function() {
          console.log(arguments);
        });
    }
  });
});
