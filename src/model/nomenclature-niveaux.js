const SOUS_NIVEAU = new Map();
SOUS_NIVEAU.set("section", "division");
SOUS_NIVEAU.set("division", "groupe");
SOUS_NIVEAU.set("groupe", "classe");
SOUS_NIVEAU.set("classe", "sousClasse");

const SUR_NIVEAU = new Map();
SUR_NIVEAU.set("division", "section");
SUR_NIVEAU.set("groupe", "division");
SUR_NIVEAU.set("classe", "groupe");
SUR_NIVEAU.set("sousClasse", "classe");

export const getSousNiveau = niveau => {
  return SOUS_NIVEAU.get(niveau);
};

export const getSurNiveau = niveau => {
  return SUR_NIVEAU.get(niveau);
};
