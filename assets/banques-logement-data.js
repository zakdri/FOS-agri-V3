/* Offres bancaires — page Accès au logement.
   Deux sections distinctes (PDF non mélangés) :
     - banquesLogementImmobilier  : crédits immobiliers (feuille "Crédits Immobiliers")
     - banquesLogementConsommation: crédits à la consommation (feuille "Consommation")
   Champs : slug, name, ageLimit, pdf, logo.
   logo : fichier dans assets/images/banks/ — si absent/échec, repli libellé. */
window.banquesLogementImmobilier = [
  { slug: 'banque-populaire',         name: 'Banque Populaire',         ageLimit: '70 ans', pdf: 'assets/banques/immobilier/banque-populaire.pdf',         logo: 'banque-populaire.png' },
  { slug: 'al-barid-bank',            name: 'Al Barid Bank',            ageLimit: '75 ans', pdf: 'assets/banques/immobilier/al-barid-bank.pdf',            logo: 'al-barid-bank.png' },
  { slug: 'wafa-immobilier',          name: 'Wafa Immobilier',          ageLimit: '69 ans', pdf: 'assets/banques/immobilier/wafa-immobilier.pdf',          logo: 'wafa-immobilier.png' },
  { slug: 'bmci',                     name: 'BMCI',                     ageLimit: '70 ans', pdf: 'assets/banques/immobilier/bmci.pdf',                     logo: 'bmci.png' },
  { slug: 'credit-du-maroc',          name: 'Crédit du Maroc',          ageLimit: '70 ans', pdf: 'assets/banques/immobilier/credit-du-maroc.pdf',          logo: 'credit-du-maroc.png' },
  { slug: 'cfg-bank',                 name: 'CFG Bank',                 ageLimit: '70 ans', pdf: 'assets/banques/immobilier/cfg-bank.pdf',                 logo: 'cfg-bank.svg' },
  { slug: 'credit-agricole-du-maroc', name: 'Crédit Agricole du Maroc', ageLimit: '70 ans', pdf: 'assets/banques/immobilier/credit-agricole-du-maroc.pdf', logo: 'credit-agricole-du-maroc.png' },
  { slug: 'bank-assafa',              name: 'Bank Assafa',              ageLimit: '69 ans', pdf: 'assets/banques/immobilier/bank-assafa.pdf',              logo: 'bank-assafa.png' },
  { slug: 'banque-al-yousr',          name: 'Banque Al Yousr',          ageLimit: '70 ans', pdf: 'assets/banques/immobilier/banque-al-yousr.pdf',          logo: 'banque-al-yousr.png' }
];

window.banquesLogementConsommation = [
  { slug: 'banque-populaire',  name: 'Banque Populaire',  ageLimit: '70 ans', pdf: 'assets/banques/consommation/banque-populaire.pdf',  logo: 'banque-populaire.png' },
  { slug: 'attijari-wafa-bank',name: 'Attijariwafa bank', ageLimit: '70 ans', pdf: 'assets/banques/consommation/attijari-wafa-bank.pdf', logo: 'Attijariwafa bank.webp' },
  { slug: 'wafa-salaf',        name: 'Wafa Salaf',        ageLimit: '73 ans', pdf: 'assets/banques/consommation/wafa-salaf.pdf',        logo: 'Wafa Salaf.png' },
  { slug: 'credit-du-maroc',   name: 'Crédit du Maroc',   ageLimit: '62 ans', pdf: 'assets/banques/consommation/credit-du-maroc.pdf',   logo: 'credit-du-maroc.png' },
  { slug: 'cfg-bank',          name: 'CFG Bank',          ageLimit: '65 ans', pdf: 'assets/banques/consommation/cfg-bank.pdf',          logo: 'cfg-bank.svg' },
  { slug: 'salafin',           name: 'SALAFIN',           ageLimit: '70 ans', pdf: 'assets/banques/consommation/salafin.pdf',           logo: 'salafin.png' },
  { slug: 'eqdom',             name: 'EQDOM',             ageLimit: '70 ans', pdf: 'assets/banques/consommation/eqdom.pdf',             logo: 'EQDOM.svg' }
];
