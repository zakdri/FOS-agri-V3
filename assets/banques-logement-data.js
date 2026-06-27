/* Offres bancaires — Accès au logement (crédits immobiliers).
   Source: "Accès au Logement & Consommation.xlsx" (feuille Crédits Immobiliers)
   + PDF dans assets/banques/immobilier/.
   logo : assets/images/banks/<slug>.png — si absent, un libellé de repli s'affiche.
   ageLimit : âge limite de crédit indiqué par la banque. */
window.banquesLogementImmobilier = [
  { slug: 'banque-populaire',        name: 'Banque Populaire',        ageLimit: '70 ans', pdf: 'assets/banques/immobilier/banque-populaire.pdf' },
  { slug: 'al-barid-bank',           name: 'Al Barid Bank',           ageLimit: '75 ans', pdf: 'assets/banques/immobilier/al-barid-bank.pdf' },
  { slug: 'wafa-immobilier',         name: 'Wafa Immobilier',         ageLimit: '69 ans', pdf: 'assets/banques/immobilier/wafa-immobilier.pdf' },
  { slug: 'bmci',                    name: 'BMCI',                    ageLimit: '70 ans', pdf: 'assets/banques/immobilier/bmci.pdf' },
  { slug: 'credit-du-maroc',         name: 'Crédit du Maroc',         ageLimit: '70 ans', pdf: 'assets/banques/immobilier/credit-du-maroc.pdf' },
  { slug: 'cfg-bank',                name: 'CFG Bank',                ageLimit: '70 ans', pdf: 'assets/banques/immobilier/cfg-bank.pdf' },
  { slug: 'credit-agricole-du-maroc',name: 'Crédit Agricole du Maroc',ageLimit: '70 ans', pdf: 'assets/banques/immobilier/credit-agricole-du-maroc.pdf' },
  { slug: 'bank-assafa',             name: 'Bank Assafa',             ageLimit: '69 ans', pdf: 'assets/banques/immobilier/bank-assafa.pdf' },
  { slug: 'banque-al-yousr',         name: 'Banque Al Yousr',         ageLimit: '70 ans', pdf: 'assets/banques/immobilier/banque-al-yousr.pdf' }
];
