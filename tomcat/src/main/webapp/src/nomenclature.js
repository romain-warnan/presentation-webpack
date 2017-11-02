import $ from "jquery";

const PATH_HOST = "/demo-js/nomenclature/rubrique";

// pour naviguer dans la naf
const SOUS_NIVEAUX = {
  section: "division",
  division: "groupe",
  groupe: "classe",
  classe: "sousClasse"
};

const FICHES = {};
const FICHE_DOM = {};
const PARENTS = {};
const SECTIONS = [];

const fetchFiche = (code, niveau) => {
  return $.getJSON(PATH_HOST + "/" + code);
};

class Nomenclature {
  start() {
    this.$titre = $("h1");
    this.$noteGenerale = $("#note-generale").hide();
    this.$comprend = $("#comprend").hide();
    this.$neComprendPas = $("#ne-comprend-pas").hide();
    this.lastClick = null;
    this.$wait = $(".wait").hide();

    $("li").each((index, element) => {
      const code = $(element).attr("data-code");
      SECTIONS.push(code);
      FICHE_DOM[code] = { $li: $(element), $container: $(element).find(".note-container"), $ul: $(element).find(".liste-note") };
      $(element).click(this.clickFiche.bind(this));
    });
  }

  makeFicheNode(fiche) {
    const $container = $("<div>", { class: "note-container" })
      .append($("<span>", { class: "node-code" }).text(fiche.code))
      .append($("<span>", { class: "node-libelle" }).text(fiche.libelle));
    const $ul = $("<ul>", { class: "liste-note" });
    const $li = $("<li>", {
      class: "node",
      "data-code": fiche.code,
      "data-niveau": fiche.niveau,
      "data-open": false
    })
      .append($container)
      .append($ul);

    FICHE_DOM[fiche.code] = { $li: $li, $container: $container, $ul: $ul };

    return $li;
  }

  fetchChildrenNode(fiche) {
    const niveau = SOUS_NIVEAUX[fiche.niveau];
    const deferred = [];
    this.$wait.show();
    fiche.enfants.forEach(code => {
      deferred.push(fetchFiche(code, niveau));
    });
    return $.when.apply($, deferred).then((...args) => {
      this.$wait.hide();
      const enfants = [];
      if (deferred.length == 1) {
        enfants.push(args[0]);
      } else {
        args.forEach(e => {
          enfants.push(e[0]);
        });
      }
      return enfants;
    });
  }

  checkFiche(fiche, open) {
    this.displayFiche(fiche);
    if (open) {
      let deferred = $.Deferred();
      if (fiche.enfants && fiche.enfants.length > 0) {
        if (fiche.enfants[0] in FICHES) {
          const enfants = [];
          fiche.enfants.forEach(e => {
            enfants.push(FICHES[e]);
          });
          deferred.resolve(enfants);
        } else {
          deferred = this.fetchChildrenNode(fiche).then(enfants => {
            enfants.forEach(e => {
              FICHES[e.code] = e;
              PARENTS[e.code] = fiche;
            });
            return enfants;
          });
        }
        deferred.done(enfants => {
          const ficheDom = FICHE_DOM[fiche.code];
          enfants.forEach(enfant => {
            if (!(enfant.code in FICHE_DOM)) {
              const $li = this.makeFicheNode(enfant);
              ficheDom.$ul.append($li);
              $li.click(this.clickFiche.bind(this));
            }
          });
          this.checkVisibility(fiche, open);
        });
      } else {
        this.checkVisibility(fiche, open);
      }
    } else {
      this.checkVisibility(fiche, open);
    }
  }

  checkVisibility(fiche, open) {
    // selected
    if (fiche) {
      FICHE_DOM[fiche.code].$container.addClass("selected");
      if (this.lastClick != null && this.lastClick != fiche.code) {
        FICHE_DOM[this.lastClick].$container.removeClass("selected");
      }
      this.lastClick = fiche.code;
    }

    // visible
    const parent = PARENTS[fiche.code];
    if (!open && !parent) {
      for (const code in FICHE_DOM) {
        FICHE_DOM[code].$container.hide();
      }
      SECTIONS.forEach(code => {
        FICHE_DOM[code].$container.show();
      });
    } else if (fiche.enfants && fiche.enfants.length > 0) {
      for (const code in FICHE_DOM) {
        FICHE_DOM[code].$container.hide();
      }
      let cible = fiche;
      if (!open) {
        cible = parent;
      }
      FICHE_DOM[cible.code].$container.show();
      FICHE_DOM[cible.code].$container.removeClass("indent");

      cible.enfants.forEach(code => {
        FICHE_DOM[code].$container.show();
        FICHE_DOM[code].$container.addClass("indent");
      });
    }
  }

  displayFiche(fiche) {
    this.$titre.text(fiche.niveau + " " + fiche.code + " : " + fiche.libelle);
    if (fiche.noteGenerale) {
      this.$noteGenerale.find(".contenu").html(fiche.noteGenerale);
      this.$noteGenerale.show();
    } else {
      this.$noteGenerale.hide();
    }
    if (fiche.comprend) {
      this.$comprend.find(".contenu").html(fiche.comprend);
      this.$comprend.show();
    } else {
      this.$comprend.hide();
    }
    if (fiche.neComprendPas) {
      this.$neComprendPas.find(".contenu").html(fiche.neComprendPas);
      this.$neComprendPas.show();
    } else {
      this.$neComprendPas.hide();
    }
  }

  clickFiche(e) {
    e.stopImmediatePropagation();
    const $target = $(e.currentTarget);
    const code = $target.attr("data-code");
    const niveau = $target.attr("data-niveau");
    const open = $target.attr("data-open") === "true";
    if (code in FICHES) {
      this.checkFiche(FICHES[code], !open);
    } else {
      this.$wait.show();
      fetchFiche(code, niveau).done(fiche => {
        this.$wait.hide();
        FICHES[code] = fiche;
        this.checkFiche(FICHES[code], !open);
      });
    }

    $target.attr("data-open", !open);
  }
}

export default Nomenclature;
