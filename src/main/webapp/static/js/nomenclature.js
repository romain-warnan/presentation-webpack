var FICHES = {}; // var global pour mem les fiches chargées depuis le serveur.
var PARENTS = {}; // pour conserver le lien code/fiche parent.
var PATH_HOST = "http://localhost:1010"; // host du serveur.
var FICHE_DOM = {}; // accés rapide au dom des fiches dans l'arbre.
var LAST_CLICK = null; // dernier code clicked
var SECTIONS = []; // codes des sections pour revenir au début de l'arbre

var $TITRE;
var $NOTE_GENERALE;
var $COMPREND;
var $NE_COMPREND_PAS;

// pour naviguer dans la naf
var SOUS_NIVEAUX = {
  section: "division",
  division: "groupe",
  groupe: "classe",
  classe: "sousClasse"
};

//
var makeFicheNode = function(fiche) {
  var $container = $("<div>", { class: "note-container" })
    .append($("<span>", { class: "node-code" }).text(fiche.code))
    .append($("<span>", { class: "node-libelle" }).text(fiche.libelle));
  var $ul = $("<ul>", { class: "liste-note" });
  var $li = $("<li>", {
    class: "node",
    "data-code": fiche.code,
    "data-niveau": fiche.niveau,
    "data-open": false
  })
    .append($container)
    .append($ul);

  FICHE_DOM[fiche.code] = { $li: $li, $container: $container, $ul: $ul };

  return $li;
};

//
var fetchFiche = function(code, niveau) {
  return $.getJSON("/demo-js/nomenclature/rubrique/" + code);
};

//
var fetchChildrenNode = function(fiche) {
  var niveau = SOUS_NIVEAUX[fiche.niveau];
  var deferred = [];
  fiche.enfants.forEach(function(code) {
    deferred.push(fetchFiche(code, niveau));
  });
  return $.when.apply($, deferred).then(function() {
    var enfants = [];
    var args = Array.prototype.slice.call(arguments);
    if (deferred.length == 1) {
      enfants.push(arguments[0]);
    } else {
      args.forEach(function(e) {
        enfants.push(e[0]);
      });
    }
    return enfants;
  });
};

//
var checkFiche = function(fiche, open) {
  displayFiche(fiche);
  if (open) {
    var fiches = [];
    var deferred = $.Deferred();
    if (fiche.enfants && fiche.enfants.length > 0) {
      if (fiche.enfants[0] in FICHES) {
        var enfants = [];
        fiche.enfants.forEach(function(e) {
          enfants.push(FICHES[e]);
        });
        deferred.resolve(enfants);
      } else {
        deferred = fetchChildrenNode(fiche).then(function(enfants) {
          enfants.forEach(function(e) {
            FICHES[e.code] = e;
            PARENTS[e.code] = fiche;
          });
          return enfants;
        });
      }
      deferred.done(function(enfants) {
        var ficheDom = FICHE_DOM[fiche.code];
        enfants.forEach(function(enfant) {
          if (!(enfant.code in FICHE_DOM)) {
            var $li = makeFicheNode(enfant);
            ficheDom.$ul.append($li);
            $li.click(clickFiche);
          }
        });
        checkVisibility(fiche, open);
      });
    } else {
      checkVisibility(fiche, open);
    }
  } else {
    checkVisibility(fiche, open);
  }
};

//
var checkVisibility = function(fiche, open) {
  // selected
  if (fiche) {
    FICHE_DOM[fiche.code].$container.addClass("selected");
    if (LAST_CLICK != null && LAST_CLICK != fiche.code) {
      FICHE_DOM[LAST_CLICK].$container.removeClass("selected");
    }
    LAST_CLICK = fiche.code;
  }

  // visible
  var parent = PARENTS[fiche.code];
  if (!open && !parent) {
    for (var code in FICHE_DOM) {
      FICHE_DOM[code].$container.hide();
    }
    SECTIONS.forEach(function(code) {
      FICHE_DOM[code].$container.show();
    });
  } else if (fiche.enfants) {
    for (var code in FICHE_DOM) {
      FICHE_DOM[code].$container.hide();
    }
    var cible = fiche;
    if (!open) {
      cible = parent;
    }
    FICHE_DOM[cible.code].$container.show();
    FICHE_DOM[cible.code].$container.removeClass("indent");

    cible.enfants.forEach(function(code) {
      FICHE_DOM[code].$container.show();
      FICHE_DOM[code].$container.addClass("indent");
    });
  }
};

//
var displayFiche = function(fiche) {
  $TITRE.text(fiche.niveau + " " + fiche.code + " : " + fiche.libelle);
  if (fiche.noteGenerale) {
    $NOTE_GENERALE.find(".contenu").html(fiche.noteGenerale);
    $NOTE_GENERALE.show();
  } else {
    $NOTE_GENERALE.hide();
  }
  if (fiche.comprend) {
    $COMPREND.find(".contenu").html(fiche.comprend);
    $COMPREND.show();
  } else {
    $COMPREND.hide();
  }
  if (fiche.neComprendPas) {
    $NE_COMPREND_PAS.find(".contenu").html(fiche.neComprendPas);
    $NE_COMPREND_PAS.show();
  } else {
    $NE_COMPREND_PAS.hide();
  }
};

//
var clickFiche = function(e) {
  e.stopImmediatePropagation();
  var code = $(this).attr("data-code");
  var niveau = $(this).attr("data-niveau");
  var open = $(this).attr("data-open") === "true"; // pour conv en bool

  if (code in FICHES) {
    checkFiche(FICHES[code], !open);
  } else {
    fetchFiche(code, niveau).done(function(fiche) {
      FICHES[code] = fiche;
      checkFiche(FICHES[code], !open);
    });
  }

  $(this).attr("data-open", !open);
};

/**
* lance l'application
*/
$(document).ready(function() {
  $TITRE = $("h1");
  $NOTE_GENERALE = $("#note-generale").hide();
  $COMPREND = $("#comprend").hide();
  $NE_COMPREND_PAS = $("#ne-comprend-pas").hide();

  $("li").each(function() {
    var code = $(this).attr("data-code");
    SECTIONS.push(code);
    FICHE_DOM[code] = { $li: $(this), $container: $(this).find(".note-container"), $ul: $(this).find(".liste-note") };
    $(this).click(clickFiche);
  });
});
