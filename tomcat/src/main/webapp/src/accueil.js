import $ from "jquery";
import "jquery-ui/ui/widgets/accordion";
import "jquery-ui/ui/widgets/autocomplete";

class Accueil {
  constructor() {
    this.FICHES = {};
    this.$FICHE_CONTAINER = $(".fiche-containeur");
    this.$FICHE_TITLE = $(".fiche-titre");
    this.$wait = $(".wait").hide();
  }

  makeParagraphe(titre, contenu) {
    const $paragraphe = $("<div>", { class: "paragraphe" }).append($("<h4>", { class: "titre" }).text(titre + " :"));
    const $container = $("<div>", { class: "contenu" }).html(contenu);
    $paragraphe.append($container);
    return $paragraphe;
  }

  afficherFiche(fiche) {
    this.$FICHE_TITLE.text(fiche.niveau + " " + fiche.code + " : " + fiche.libelle);
    this.$FICHE_CONTAINER.empty();
    if (fiche.noteGenerale) {
      this.$FICHE_CONTAINER.append(this.makeParagraphe("Note générale", fiche.noteGenerale));
    }
    if (fiche.comprend) {
      this.$FICHE_CONTAINER.append(this.makeParagraphe("Comprend", fiche.comprend));
    }
    if (fiche.neComprendPas) {
      this.$FICHE_CONTAINER.append(this.makeParagraphe("Ne comprend pas", fiche.neComprendPas));
    }
  }

  start() {
    $("#accordion").accordion({
      heightStyle: "content"
    });

    $.widget("custom.customCompleter", $.ui.autocomplete, {
      _renderItem: (ul, item) => {
        const fiche = this.FICHES[item.value];
        const $li = $("<li>")
          .append($("<span>").text(fiche.code))
          .append($("<span>").text(fiche.libelle))
          .appendTo(ul);
        return $li;
      }
    });

    $("input[name='nafrev2'").customCompleter({
      select: (event, ui) => {
        this.afficherFiche(this.FICHES[ui.item.value]);
      },
      source: (request, response) => {
        const terms = request.term;
        this.$wait.show();
        $.ajax({
          url: encodeURI("/demo-js/nomenclature/search?q=" + request.term + "*"),
          type: "GET",
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        })
          .done(rubriques => {
            this.$wait.hide();
            const tuples = [];
            rubriques.forEach(r => {
              this.FICHES[r.code] = r;
              tuples.push({ label: r.libelle, value: r.code });
            });
            response(tuples);
          })
          .fail(() => {
            console.log(arguments);
          });
      }
    });
  }
}

export default Accueil;
