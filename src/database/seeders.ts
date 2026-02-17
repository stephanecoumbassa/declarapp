import { db, DEFAULT_MAIRIE_ID, type Quotite, type TimbresQuotite } from './db';
import type {
  Declaration,
  BordereauRecette,
  Approvisionnement,
  Remise,
  Versement,
  BalanceEntree,
  Timbres,
  Prevision,
  Mandat,
  BordereauMandat,
  TimbresValeurs,
  TimbresApprovisionnement,
  TimbresRemise,
  TimbresVersement,
  TimbresBalanceEntree,
} from './db';

// =================================================================
//                      SEEDERS DE DONNÉES PAR DÉFAUT
// =================================================================

/**
 * Remplit la base de données avec les données initiales et essentielles.
 * C'est l'équivalent de la fonction `initializeDatabase` mais externalisée.
 */
export async function seedDefaultData() {
  console.log('ðŸŒ± Seeding default data...');
  await clearDatabase();

  const now = new Date();

  // 1. Mairie par défaut
  const mairieId = await db.mairies.add({
    nom: 'Mairie de Bodokro',
    code: '360',
    adresse: 'Avenue Principale',
    ville: 'Bodokro',
    codePostal: '00225',
    telephone: '+225 XX XX XX XX',
    email: 'contact@mairie-bodokro.ci',
    createdAt: now,
    updatedAt: now,
  });

  // 2. Utilisateur admin par défaut
  await db.utilisateurs.add({
    username: 'admin',
    password: 'Sigobc@2026!', // Doit être hashé en production
    nom: 'Administrateur',
    prenom: 'Système',
    email: 'admin@tresor.sn',
    role: 'admin',
    actif: true,
    createdAt: now,
    updatedAt: now,
  });

  // 3. Taxes par défaut - Nomenclature complète
  await db.taxes.bulkAdd([
    // ========== SECTION 70 - RECETTES FISCALES ==========
    {
      code: '70',
      libelle: 'SECTION 70 - RECETTES FISCALES',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '700',
      libelle: 'CHAP.700 - IMPOTS ATTRIBUES AUX COMMUNES',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7000',
      libelle: 'Contribution foncière des propriétés bâties',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7001',
      libelle: 'Contribution foncière des propriétés non bâties',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7004',
      libelle: 'Contribution des patentes',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7005',
      libelle: 'Contribution des licences',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '702',
      libelle: 'CHAP.702 - TAXES COMMUNALES PAR VOIE DE ROLE',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '70261',
      libelle: 'Impôt synthétique',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '70262',
      libelle: 'Taxes forfaitaires petits commerçants/artisans',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7027',
      libelle: 'Taxe sur les locaux loués en garnis',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '703',
      libelle: 'CHAP.703 - TAXES SUR TITRE DE RECETTES PROPRES',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7030',
      libelle: 'Taxes sur les pompes distributrices de carburant',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7031',
      libelle: 'Taxes sur les charrettes',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7036',
      libelle: 'Taxes sur les spectacles et galas',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7038',
      libelle: 'Taxes sur les établissements de nuit',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '704',
      libelle: 'CHAP.704 - TAXES SUR TITRE DE RECETTES PAR LES COMMUNES',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7041',
      libelle: 'Taxes sur les taxis',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7042',
      libelle: 'Taxes sur la publicité',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    // ========== SECTION 71 - RECETTES DES PRESTATIONS ET SERVICES ==========
    {
      code: '71',
      libelle: 'SECTION 71 - RECETTES DES PRESTATIONS ET SERVICES',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '710',
      libelle: 'CHAP.710 - RECETTES DES SERVICES GENERAUX',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7100',
      libelle: 'Administration générale',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71000',
      libelle: 'Légalisation de signatures et certifications',
      type: 'fixe',
      montant: 500,
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71001',
      libelle: 'Délivrance livrets de famille et documents',
      type: 'fixe',
      montant: 1000,
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71006',
      libelle: 'Autres recettes administration générale',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7101',
      libelle: 'Administration financière et domaniale',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71010',
      libelle: "Taxe sur délivrance permis d'habiter",
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71016',
      libelle: 'Autres recettes admin. financière/domaniale',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71030',
      libelle: 'Taxe de séquestre',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71031',
      libelle: 'Produits de ventes de la fourrière',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '711',
      libelle: 'CHAP.711 - RECETTES DES SERVICES DE COLLECTIVITE',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7112',
      libelle: 'Urbanisme et environnement',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71120',
      libelle: 'Taxes ou redevance de bornage',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71126',
      libelle: 'Autres recettes urbanisme/environnement',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7113',
      libelle: "Hygiène, salubrité, hydraulique, adduction d'eau",
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7130',
      libelle: "Taxe d'enlèvement des ordures ménagères",
      type: 'fixe',
      montant: 15000,
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71150',
      libelle: 'Cimetières - services funéraires',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71152',
      libelle: 'Morgue - Dépôts de cercueils',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71154',
      libelle: 'Autres recettes services funéraires',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '712',
      libelle: 'CHAP.712 - RECETTES SERVICES SOCIAUX/CULTURELS',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7125',
      libelle: 'Activités culturelles - Taxes, Redevances',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71250',
      libelle: 'Administration activités culturelles',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71256',
      libelle: 'Autres recettes services sociaux/culturels',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '713',
      libelle: 'CHAP.713 - RECETTES DES SERVICES ECONOMIQUES',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7133',
      libelle: 'Transports - communications',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71330',
      libelle: 'Administration transports et communications',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71331',
      libelle: 'Gare routière - stations de taxis',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7134',
      libelle: 'Industrie et commerce',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71341',
      libelle: 'Abattoirs, conservation et transport de viande',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71344',
      libelle: 'Marchés',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '71345',
      libelle: 'Foires et expositions',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    // ========== SECTION 72 - REVENU DU PATRIMOINE ==========
    {
      code: '72',
      libelle: 'SECTION 72 - REVENU DU PATRIMOINE',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '720',
      libelle: 'CHAP.720 - REVENU DU PATRIMOINE IMMOBILIER',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7200',
      libelle: 'Location terrains et immeubles domaine privé',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '72000',
      libelle: 'Baux à loyer',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7203',
      libelle: 'Revenus occupations temporaires domaine public',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '72031',
      libelle: 'Concessions sur accord conventionnel',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '72032',
      libelle: 'Droit de dépôts temporaires',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    // ========== SECTION 73 - AIDE DE L'ETAT ==========
    {
      code: '73',
      libelle: "SECTION 73 - AIDE DE L'ETAT - FONDS DE CONCOURS",
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '730',
      libelle: 'CHAP.730 - DOTATION GLOBALE DE FONCTIONNEMENT',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7300',
      libelle: 'Partie minimale',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7301',
      libelle: 'Partie complémentaire, versement général',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7302',
      libelle: 'Partie complémentaire, versement spécial',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    // ========== SECTION 74 - RECETTES DIVERSES ==========
    {
      code: '74',
      libelle: 'SECTION 74 - RECETTES DIVERSES AU TITRE I',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '742',
      libelle: 'CHAP.742 - PRELEVEMENT SUR FONDS DE RESERVE',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '743',
      libelle: 'CHAP.743 - RECETTES ACCIDENTELLES',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7406',
      libelle: 'Autres versements (Vignettes auto)',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7436',
      libelle: 'Recettes accidentelles',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    // ========== SECTION 02 - INVESTISSEMENT ==========
    {
      code: '02',
      libelle: "SECTION 02 - PRELEVEMENT SUR FONDS D'INVESTISSEMENT",
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    // ========== SECTION 04 - AIDE DE L'ETAT TITRE II ==========
    {
      code: '04',
      libelle: "SECTION 04 - AIDE DE L'ETAT - FONDS DE CONCOURS",
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '040',
      libelle: "CHAP.040 - AIDE ET CONCOURS DE L'ETAT",
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '0401',
      libelle: "Subvention d'équipement de l'Etat",
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    // ========== SECTION 06 - RECETTES DIVERSES TITRE II ==========
    {
      code: '06',
      libelle: 'SECTION 06 - RECETTES DIVERSES AU TITRE II',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '066',
      libelle: 'CHAP.066 - AUTRES RECETTES DIVERSES AU TITRE II',
      type: 'variable',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
  ]);

  // 4. Chapitres par défaut (App3)
  await db.chapitres.bulkAdd([
    {
      code: '1',
      libelle: 'SALAIRE ET INDEM.',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '2',
      libelle: 'CHARGES SOCIALES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '3',
      libelle: 'TRANSP. & FRAIS DE MISS.',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '4',
      libelle: 'CARBUR. & LUBRIF.',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '5',
      libelle: 'MATERIEL ET FOURNIT.',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6',
      libelle: 'ABONN. EAU, ELEC, TELEPH.',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '7',
      libelle: "TRAVAUX & SCES A L'ENTREP.",
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '8',
      libelle: 'INTERVEN ET TRANSF.',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
  ]);

  // 5. Sous-chapitres par défaut (App3)
  await db.sousChapitres.bulkAdd([
    {
      code: '6000',
      libelle: 'ADMINISTRATION',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '60010',
      libelle: 'FONCTIONNEMENT DU CONSEIL ET DES COMMISSIONS',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '60011',
      libelle: 'FONCTIONNEMENT DE LA MUNICIPALITÉ',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '60012',
      libelle: 'FONCTIONNEMENT CABINET DU MAIRE',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '60013',
      libelle: 'INDEMNITÉS DE FONCTION ET DE REPRÉSENTATION',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '60015',
      libelle: 'FRAIS DE MISSIONS EN DEHORS DU TERRITOIRE NATIONALE',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '60016',
      libelle: 'AUTRES DÉPENSES AU TITRE DES AUTORITÉS MUNICIPALES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6002',
      libelle: 'ETAT CIVIL ET POPULATION',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6006',
      libelle: "AUTRES DÉPENSES D'ADMINISTRATION GÉNÉRALE",
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6010',
      libelle: 'ADMINISTRATION',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6016',
      libelle: 'AUTRES DÉPENSES RELATIVES AU DOMAINE COMMUNAL',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6020',
      libelle: 'ADMINISTRATION',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6021',
      libelle: 'FRAIS DE RECOUVREMENTS ET DE POURSUITES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6031',
      libelle: 'GARDES MUNICIPAUX',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6100',
      libelle: 'ADMINISTRATION',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6101',
      libelle: 'VOIRIES-ROUTES-CHEMINS',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6131',
      libelle: "OPÉRATIONS D'ASSAINISSEMENT",
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6133',
      libelle: 'NETTOIEMENT DE LA VOIRIE- ENLÈVEMENT DES ORDURES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6136',
      libelle: "AUTRES DÉPENSES D'HYGIÈNES ET SALUBRITÉ PUBLIQUE-HYDRAULIQUE",
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6141',
      libelle: 'PROTECTION CIVILE',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6151',
      libelle: 'CIMETIÈRES-INHUMATION-EXHUMATIONS-CREUSEMENTS DE FOSSES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6206',
      libelle: "AUTRES DÉPENSES D'ÉDUCATION",
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6214',
      libelle: 'EVACUATIONS SANITAIRES-SERVICE AMBULANCE',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6216',
      libelle: 'AUTRES DÉPENSES DE SANTÉ PUBLIQUE',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6223',
      libelle: 'HANDICAPÉS',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6224',
      libelle: 'AIDE FAMILIALE ,SOCIALE ET PERSONNES AGÉES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6225',
      libelle: 'AIDE AUX INDIGENTS',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6246',
      libelle: 'AUTRES DÉPENSES AU TITRE DES SPORTS ET LOISIRS',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6250',
      libelle: 'ADMINISTRATION',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6256',
      libelle: 'AUTRES DÉPENSES AU TITRE DES ACTIVITÉS CULTURELLES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '626',
      libelle: 'AUTRES DEPENSES DES SERVICES SOCIAUX ,CULTURELS ET DE PROMOTION HUMAINE',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6336',
      libelle: 'AUTRES DÉPENSES DE TRANSPORT ET COMMUNICATIONS',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6341',
      libelle: 'ABATTOIRS-CONSERVATION ET TRANSPORTS DE VIANDE',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6344',
      libelle: 'MARCHÉS',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6406',
      libelle: 'AUTRES DETTES DE LA COMMUNE (OU DE LA VILLE )',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6415',
      libelle: 'CONFÉRENCES INTERCOMMUNALES -ASSOCIATION DES VILLES ET COMMUNES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6416',
      libelle: 'AUTRES CONTRIBUTIONS ET TRANSFERTS',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6420',
      libelle: 'RESPONSABILITÉ CIVILE',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6422',
      libelle: 'ASSURANCES DES VÉHICULES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6426',
      libelle: 'AUTRES ASSURANCES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6430',
      libelle: 'CÉRÉMONIES PUBLIQUES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6431',
      libelle: 'FÃŠTES ET RÉCEPTIONS OFFICIELLES',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6441',
      libelle: "FONDS D'INVESTISSEMENT",
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      code: '6456',
      libelle: 'AUTRES REMBOURSEMENTS DIVERS',
      mairieId: mairieId as number,
      actif: true,
      createdAt: now,
      updatedAt: now,
    },
  ]);

  console.log('âœ… Default data seeded successfully.');
}

// =================================================================
//                      SEEDERS DE DONNÉES DE TEST
// =================================================================

// ... (Le reste du fichier contient les fonctions pour générer des données aléatoires)
// Pour la concision, je vais réutiliser les fonctions existantes de l'ancien `seeders.ts`
// mais je les préfixerai avec "generate" pour clarifier leur rôle.

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function randomAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomChoice<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);
  return array[index]!;
}

/**
 * Construire un objet detailsQuotites à partir d'un objet timbres.
 * Répartit les quantités par valeur entre les quotités actives de même prix.
 */
async function buildDetailsQuotitesFromTimbres(timbres: Record<number, number>) {
  const result: Record<string, number> = {};
  const quotites = await db.quotites.filter((q) => q.actif).toArray();
  const byPrix = new Map<number, typeof quotites>();
  for (const q of quotites) {
    const list = byPrix.get(q.prix) || [];
    list.push(q);
    byPrix.set(q.prix, list);
  }

  for (const prixKey of Object.keys(timbres)) {
    const prix = Number(prixKey);
    const total = Number(timbres[prix]) || 0;
    const list = byPrix.get(prix) || [];
    if (list.length === 0) continue;
    const base = Math.floor(total / list.length);
    let remainder = total - base * list.length;
    for (let i = 0; i < list.length; i++) {
      const q = list[i];
      if (!q) continue;
      const add = base + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
      result[`${prix}-${q.code}`] = add;
    }
  }

  return result;
}

// ... etc. pour toutes les autres fonctions de génération

/**
 * Options pour le seeder de données de test.
 */
export interface SeedOptions {
  utilisateurs?: number;
  taxes?: number;
  declarations?: number;
  bordereaux?: number;
  approvisionnements?: number;
  remises?: number;
  versements?: number;
  balancesEntree?: number;
  chapitres?: number;
  sousChapitres?: number;
  previsions?: number;
  mandats?: number;
  bordereauMandats?: number;
  quotites?: number;
}

/**
 * Remplit la base de données avec une grande quantité de données de test aléatoires.
 */
export async function seedTestData(options: SeedOptions = {}) {
  console.log('ðŸš€ Starting test data seeders...');

  const {
    declarations = 100,
    bordereaux = 80,
    approvisionnements = 30,
    remises = 30,
    versements = 30,
    balancesEntree = 3,
    previsions = 30,
    mandats = 200,
    bordereauMandats = 20,
    quotites = 10,
  } = options;

  try {
    // Il est recommandé de partir d'une base propre (ou de données par défaut)
    await seedDefaultData();
    console.log('Default data seeded before adding test data.');

    // On récupère les IDs nécessaires après le seeding par défaut
    const utilisateursCreated = await db.utilisateurs.toArray();
    const utilisateurIds = utilisateursCreated.map((u) => u.id!);
    const taxesCreated = await db.taxes.toArray();
    const taxeIds = taxesCreated.map((t) => t.id!);
    const chapitresCreated = await db.chapitres.toArray();
    const chapitreIds = chapitresCreated.map((c) => c.id!);
    const sousChapitresCreated = await db.sousChapitres.toArray();
    const sousChapitreIds = sousChapitresCreated.map((s) => s.id!);

    // Génération des données de test supplémentaires
    // Note: les fonctions ci-dessous sont les anciennes fonctions de seeders.ts
    // qui génèrent des données aléatoires.
    // Pour l'instant, on simule leur exécution.
    console.log(`ðŸŒ± Seeding ${bordereaux} test bordereaux...`);
    const bordereauxCreated = await seedBordereaux(utilisateurIds, bordereaux);
    console.log(`ðŸŒ± Seeding ${declarations} test declarations...`);
    await seedDeclarations(taxeIds, utilisateurIds, bordereauxCreated, declarations);
    // IMPORTANT: Seeding quotites AVANT approvisionnements/remises/versements/balances
    // car buildDetailsQuotitesFromTimbres a besoin des quotités existantes
    console.log(`ðŸŒ± Seeding ${quotites} test quotites...`);
    await seedQuotites(quotites);
    console.log(`ðŸŒ± Seeding ${approvisionnements} test approvisionnements...`);
    await seedApprovisionnements(utilisateurIds, approvisionnements);
    console.log(`ðŸŒ± Seeding ${remises} test remises...`);
    await seedRemises(utilisateurIds, remises);
    console.log(`ðŸŒ± Seeding ${versements} test versements...`);
    await seedVersements(utilisateurIds, versements);
    console.log(`ðŸŒ± Seeding ${balancesEntree} test balances...`);
    await seedBalancesEntree(utilisateurIds, balancesEntree);
    console.log(`ðŸŒ± Seeding ${previsions} test previsions...`);
    const previsionsCreated = await seedPrevisions(
      chapitreIds,
      utilisateurIds,
      previsions,
      sousChapitreIds,
    );
    const previsionIds = previsionsCreated.map((p) => p.id!);
    // D'abord créer les bordereaux de mandats
    console.log(`ðŸŒ± Seeding ${bordereauMandats} test bordereau mandats...`);
    const bordereauMandatsCreated = await seedBordereauMandats(utilisateurIds, bordereauMandats);
    // Puis créer les mandats en les liant aux bordereaux
    console.log(`ðŸŒ± Seeding ${mandats} test mandats...`);
    await seedMandats(
      chapitreIds,
      sousChapitreIds,
      previsionIds,
      utilisateurIds,
      bordereauMandatsCreated,
      mandats,
    );

    // ========== App3 - Timbres ==========
    console.log('\n🌱 Seeding App3 Timbres data...');
    await seedTimbresTestData();

    console.log('\nâœ¨ All test data seeders have been executed successfully!');
  } catch (error) {
    console.error('âŒ Error during test data seeding:', error);
    throw error;
  }
}

// =================================================================
//                      FONCTIONS UTILITAIRES
// =================================================================

/**
 * Supprime toutes les données de toutes les tables.
 */
export async function clearDatabase() {
  console.log('ðŸ—‘ï¸ Clearing all database tables...');
  await Promise.all([
    db.mairies.clear(),
    db.taxes.clear(),
    db.declarations.clear(),
    db.bordereauxRecette.clear(),
    db.utilisateurs.clear(),
    db.approvisionnements.clear(),
    db.remises.clear(),
    db.versements.clear(),
    db.balancesEntree.clear(),
    db.quotites.clear(),
    db.chapitres.clear(),
    db.sousChapitres.clear(),
    db.previsions.clear(),
    db.mandats.clear(),
    db.bordereauMandats.clear(),
    // App3 - Timbres
    db.timbresApprovisionnements.clear(),
    db.timbresRemises.clear(),
    db.timbresVersements.clear(),
    db.timbresBalancesEntree.clear(),
    db.timbresQuotites.clear(),
  ]);
  console.log('âœ… All tables cleared.');
}

// On garde les fonctions de génération de l'ancien seeder.ts ici
// pour que seedTestData puisse les utiliser.

export async function seedBordereaux(personnelIds: number[], count: number = 80) {
  console.log(`ðŸŒ± Seeding ${count} bordereaux de recette...`);

  const bordereaux: Partial<BordereauRecette>[] = [];
  const now = new Date();

  // Créer des bordereaux répartis sur les exercices avec des dates cohérentes
  const exercices = [2026];
  let numeroGlobal = 1;

  for (let i = 0; i < count; i++) {
    const annee = exercices[i % exercices.length]!;
    // Date de création répartie sur l'année
    const mois = Math.floor((i / count) * 12);
    const dateCreation = new Date(annee, mois, randomAmount(1, 28));

    // Si c'est 2025 et la date dépasse maintenant, ajuster
    if (annee === 2026 && dateCreation > now) {
      dateCreation.setTime(now.getTime() - randomAmount(1, 30) * 24 * 60 * 60 * 1000);
    }

    const statuts: Array<'ouvert' | 'ferme'> = ['ouvert', 'ferme'];
    // Les exercices passés sont fermés, l'année en cours peut être ouvert
    const statut = annee < 2026 ? 'ferme' : randomChoice(statuts);

    const obs = Math.random() > 0.6 ? 'Bordereau conforme' : undefined;

    const bordereau: Partial<BordereauRecette> = {
      personnelId: randomChoice(personnelIds),
      mairieId: DEFAULT_MAIRIE_ID,
      numero: numeroGlobal++,
      annee,
      mois: mois + 1, // Mois du bordereau (1-12)
      montantTotal: 0, // Sera calculé après insertion des déclarations
      nombreDeclarations: 0, // Sera calculé après insertion des déclarations
      statut,
      createdAt: dateCreation,
      updatedAt: now,
    };

    if (obs) {
      bordereau.observations = obs;
    }

    bordereaux.push(bordereau);
  }

  // Insérer les bordereaux et récupérer les IDs
  const insertedIds = await db.bordereauxRecette.bulkAdd(bordereaux as BordereauRecette[], {
    allKeys: true,
  });

  // Retourner les bordereaux avec leurs IDs
  const result = bordereaux.map((b, index) => ({
    ...b,
    id: insertedIds[index],
  })) as BordereauRecette[];

  console.log(`âœ… ${count} bordereaux de recette créés`);
  return result;
}

export async function seedDeclarations(
  taxeIds: number[],
  personnelIds: number[],
  bordereaux: BordereauRecette[],
  count: number = 100,
) {
  console.log(`ðŸŒ± Seeding ${count} déclarations...`);

  const declarations: Partial<Declaration>[] = [];
  const now = new Date();

  // Map to track bordereau updates
  const bordereauUpdates = new Map<number, { count: number; total: number }>();

  // Trier les bordereaux par date pour une meilleure répartition
  const sortedBordereaux = [...bordereaux].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateA - dateB;
  });

  for (let i = 0; i < count; i++) {
    const montantHT = randomAmount(1000, 50000);
    const montantTaxe = Math.round((montantHT * randomAmount(5, 20)) / 100);
    const montantTTC = montantHT + montantTaxe;

    // Choisir un bordereau aléatoirement
    const bordereau = randomChoice(sortedBordereaux);
    const exercice = bordereau.annee;
    const bordereauId = bordereau.id;

    // La date d'encaissement doit être cohérente avec le mois du bordereau
    const bordereauMois = bordereau.mois || 1;
    const startOfMonth = new Date(exercice, bordereauMois - 1, 1);
    const endOfMonth = new Date(exercice, bordereauMois, 0); // Dernier jour du mois

    // Date d'encaissement dans le mois du bordereau
    let dateEncaissement = randomDate(startOfMonth, endOfMonth);

    // Si c'est 2025 et la date dépasse maintenant, ajuster
    if (exercice === 2026 && dateEncaissement > now) {
      dateEncaissement = new Date(now.getTime() - randomAmount(1, 30) * 24 * 60 * 60 * 1000);
    }

    const personnelId = randomChoice(personnelIds);
    const obs = Math.random() > 0.7 ? 'Observations diverses sur la déclaration' : undefined;

    const declaration: Partial<Declaration> = {
      personnelId,
      mairieId: DEFAULT_MAIRIE_ID,
      taxeId: randomChoice(taxeIds),
      exercice,
      numeroPiece: String(i + 1),
      nomPartieVersante: `Contribuable ${String(i + 1).padStart(4, '0')}`,
      adresse: `${randomChoice(['Rue', 'Avenue', 'Boulevard'])} ${Math.floor(Math.random() * 100)} ${randomChoice(['Dakar', 'Thiès', 'Saint-Louis'])}`,
      dateEncaissement,
      numeroLivre: 'T31T',
      numeroEncaissement: `ENC-${String(i + 1).padStart(6, '0')}`,
      montantRecette: montantTTC,
      statut: 'validee',
      createdAt: dateEncaissement,
      updatedAt: now,
    };

    // Lier la déclaration au bordereau
    if (bordereauId) {
      declaration.bordereauId = bordereauId;

      // Mettre à jour les statistiques du bordereau
      const current = bordereauUpdates.get(bordereauId) || { count: 0, total: 0 };
      bordereauUpdates.set(bordereauId, {
        count: current.count + 1,
        total: current.total + montantTTC,
      });
    }

    if (obs) {
      declaration.observations = obs;
    }

    declarations.push(declaration as Declaration);
  }

  await db.declarations.bulkAdd(declarations as Declaration[]);

  // Update bordereaux avec le nombre réel de déclarations et le montant total
  for (const [id, stats] of bordereauUpdates.entries()) {
    await db.bordereauxRecette.update(id, {
      nombreDeclarations: stats.count,
      montantTotal: stats.total,
      updatedAt: now,
    });
  }

  console.log(`âœ… ${count} déclarations créées et liées aux bordereaux`);
  return declarations;
}

export async function seedApprovisionnements(personnelIds: number[], count: number = 20) {
  console.log(`ðŸŒ± Seeding ${count} approvisionnements...`);

  const approvisionnements: Partial<Approvisionnement>[] = [];
  const now = new Date();
  const exercices = [2026];

  for (let i = 0; i < count; i++) {
    const exercice = randomChoice(exercices);
    const date = randomDate(
      new Date(exercice, 0, 1),
      exercice === 2026 ? now : new Date(exercice, 11, 31),
    );
    const type = 'appro';
    // Générer des quantités aléatoires pour chaque valeur de timbre
    const timbres: Timbres = {
      100: randomAmount(100, 1000),
      200: randomAmount(80, 800),
      300: randomAmount(50, 500),
      500: randomAmount(30, 300),
      600: randomAmount(20, 200),
      1000: randomAmount(10, 100),
    };

    // Calculer le total
    const total =
      timbres[100] * 100 +
      timbres[200] * 200 +
      timbres[300] * 300 +
      timbres[500] * 500 +
      timbres[600] * 600 +
      timbres[1000] * 1000;

    const obs =
      Math.random() > 0.7 ? `Approvisionnement ${type} de l'exercice ${exercice}` : undefined;

    const approvisionnement: Partial<Approvisionnement> = {
      mairieId: DEFAULT_MAIRIE_ID,
      exercice,
      date,
      type,
      timbres,
      detailsQuotites: await buildDetailsQuotitesFromTimbres(timbres),
      total,
      personnelId: randomChoice(personnelIds),
      createdAt: date,
      updatedAt: now,
    };

    if (obs) {
      approvisionnement.observations = obs;
    }

    approvisionnements.push(approvisionnement);
  }

  await db.approvisionnements.bulkAdd(approvisionnements as unknown as Approvisionnement[]);
  console.log(`âœ… ${count} approvisionnements créés`);
  return approvisionnements;
}

export async function seedRemises(personnelIds: number[], count: number = 50) {
  console.log(`ðŸŒ± Seeding ${count} remises...`);

  const remises: Partial<Remise>[] = [];
  const now = new Date();
  const exercices = [2026];

  for (let i = 0; i < count; i++) {
    const exercice = randomChoice(exercices);
    const date = randomDate(
      new Date(exercice, 0, 1),
      exercice === 2026 ? now : new Date(exercice, 11, 31),
    );
    const numeroRemise = `REM-${exercice}-${String(i + 1).padStart(4, '0')}`;

    // Générer des quantités aléatoires pour chaque valeur de timbre
    const timbres: Timbres = {
      100: randomAmount(10, 80),
      200: randomAmount(8, 60),
      300: randomAmount(5, 40),
      500: randomAmount(3, 25),
      600: randomAmount(2, 15),
      1000: randomAmount(1, 10),
    };

    // Calculer le total
    const total =
      timbres[100] * 100 +
      timbres[200] * 200 +
      timbres[300] * 300 +
      timbres[500] * 500 +
      timbres[600] * 600 +
      timbres[1000] * 1000;

    const obs = Math.random() > 0.6 ? `Remise de l'imprimerie nationale` : undefined;

    const remise: Partial<Remise> = {
      mairieId: DEFAULT_MAIRIE_ID,
      exercice,
      date,
      numeroRemise,
      timbres,
      detailsQuotites: await buildDetailsQuotitesFromTimbres(timbres),
      total,
      personnelId: randomChoice(personnelIds),
      createdAt: date,
      updatedAt: now,
    };

    if (obs) {
      remise.observations = obs;
    }

    remises.push(remise);
  }

  await db.remises.bulkAdd(remises as unknown as Remise[]);
  console.log(`âœ… ${count} remises créées`);
  return remises;
}

export async function seedVersements(personnelIds: number[], count: number = 60) {
  console.log(`ðŸŒ± Seeding ${count} versements...`);

  const versements: Partial<Versement>[] = [];
  const now = new Date();
  const exercices = [2026];

  for (let i = 0; i < count; i++) {
    const exercice = randomChoice(exercices);
    const date = randomDate(
      new Date(exercice, 0, 1),
      exercice === 2026 ? now : new Date(exercice, 11, 31),
    );
    const numeroVersement = `VERS-${exercice}-${String(i + 1).padStart(4, '0')}`;

    // Générer des quantités aléatoires pour chaque valeur de timbre (vendus)
    const timbres: Timbres = {
      100: randomAmount(20, 200),
      200: randomAmount(15, 150),
      300: randomAmount(10, 100),
      500: randomAmount(8, 80),
      600: randomAmount(5, 50),
      1000: randomAmount(2, 20),
    };

    // Calculer le total
    const total =
      timbres[100] * 100 +
      timbres[200] * 200 +
      timbres[300] * 300 +
      timbres[500] * 500 +
      timbres[600] * 600 +
      timbres[1000] * 1000;

    const obs = Math.random() > 0.7 ? `Versement journalier` : undefined;

    const versement: Partial<Versement> = {
      mairieId: DEFAULT_MAIRIE_ID,
      exercice,
      date,
      numeroVersement,
      timbres,
      detailsQuotites: await buildDetailsQuotitesFromTimbres(timbres),
      total,
      personnelId: randomChoice(personnelIds),
      createdAt: date,
      updatedAt: now,
    };

    if (obs) {
      versement.observations = obs;
    }

    versements.push(versement);
  }

  await db.versements.bulkAdd(versements as unknown as Versement[]);
  console.log(`âœ… ${count} versements créés`);
  return versements;
}

export async function seedBalancesEntree(personnelIds: number[], count: number = 3) {
  console.log(`🌱 Seeding ${count} balances d'entrée...`);

  const balances: Partial<BalanceEntree>[] = [];
  const now = new Date();
  const exercice = 2026;
  const types = ['BE-S1', 'BE-S2', 'BE-S3'];

  for (let i = 0; i < Math.min(count, types.length); i++) {
    const type = types[i]!;
    const date = new Date(exercice, 0, 1); // 1er janvier de l'exercice

    // Générer des quantités aléatoires pour le stock initial
    const timbres: Timbres = {
      100: randomAmount(500, 2000),
      200: randomAmount(400, 1500),
      300: randomAmount(300, 1000),
      500: randomAmount(200, 800),
      600: randomAmount(100, 500),
      1000: randomAmount(50, 300),
    };

    // Calculer le total
    const total =
      timbres[100] * 100 +
      timbres[200] * 200 +
      timbres[300] * 300 +
      timbres[500] * 500 +
      timbres[600] * 600 +
      timbres[1000] * 1000;

    const balance: Partial<BalanceEntree> = {
      mairieId: DEFAULT_MAIRIE_ID,
      exercice,
      date,
      type,
      timbres,
      detailsQuotites: await buildDetailsQuotitesFromTimbres(timbres),
      total,
      commentaires: `Stock initial ${type} de l'exercice ${exercice}`,
      personnelId: randomChoice(personnelIds),
      createdAt: date,
      updatedAt: now,
    };

    balances.push(balance);
  }

  await db.balancesEntree.bulkAdd(balances as unknown as BalanceEntree[]);
  console.log(`✅ ${balances.length} balances d'entrée créées (BE-S1, BE-S2, BE-S3 pour 2026)`);
  return balances;
}

export async function seedPrevisions(
  chapitreIds: number[],
  personnelIds: number[],
  count: number = 30,
  sousChapitreIds?: number[],
) {
  console.log(`ðŸŒ± Seeding ${count} prévisions budgétaires...`);

  const previsions: Partial<Prevision>[] = [];
  const now = new Date();
  const exercices = [2026];

  for (let i = 0; i < count; i++) {
    const montantPrevu = randomAmount(500000, 10000000);
    const montantEngage = Math.round((montantPrevu * randomAmount(0, 80)) / 100);
    const montantDisponible = montantPrevu - montantEngage;
    const exercice = randomChoice(exercices);

    const statuts: Array<'brouillon' | 'validee' | 'cloturee'> = [
      'brouillon',
      'validee',
      'cloturee',
    ];
    const statut =
      exercice < 2026
        ? randomChoice(['validee' as const, 'cloturee' as const])
        : randomChoice(statuts);

    const obs = Math.random() > 0.6 ? 'Prévision conforme au budget' : undefined;

    const prevision: Partial<Prevision> = {
      exercice,
      chapitreId: randomChoice(chapitreIds),
      mairieId: DEFAULT_MAIRIE_ID,
      montantPrevu,
      montantEngage,
      montantDisponible,
      statut,
      personnelId: randomChoice(personnelIds),
      createdAt: randomDate(new Date(exercice - 1, 10, 1), new Date(exercice, 0, 31)),
      updatedAt: now,
    };

    if (obs) {
      prevision.observations = obs;
    }

    // Associer éventuellement un sous-chapitre à la prévision si fourni
    if (sousChapitreIds && sousChapitreIds.length > 0 && Math.random() > 0.3) {
      prevision.sousChapitreId = randomChoice(sousChapitreIds);
    }

    previsions.push(prevision);
  }

  await db.previsions.bulkAdd(previsions as unknown as Prevision[]);
  console.log(`âœ… ${count} prévisions créées`);
  return previsions;
}

export async function seedMandats(
  chapitreIds: number[],
  sousChapitreIds: number[],
  previsionIds: number[],
  personnelIds: number[],
  bordereauMandats: BordereauMandat[],
  count: number = 200,
) {
  console.log(`ðŸŒ± Seeding ${count} mandats de dépense...`);

  const beneficiaires = [
    'THEODULE DIRO LAHUET',
    'SANOGO OUMAR',
    'IDRISSA KONATE',
    'SORO TIÉGBÉ',
    'DIABY FANTA',
    'DANIEL TRABI',
    'ALI SANOGO',
    'AMINA ASSI ALEX-PARFAIT',
    'YOGOLI KOFFI',
    'RECEVEUR MUNICIPAL',
    'Société ÉLECTRICITÉ GÉNÉRALE',
    "Entreprise BTP CÃ”TE D'IVOIRE",
    'SARL FOURNITURES BUREAU',
    'Cabinet AUDIT CONSEIL',
    'Garage AUTO REPAIR',
  ];

  const objets = ['INDEMNITE DE FONCTION', 'TRANSP. & FRAIS DE MISSION', "Régie d'avance"];

  const modesPaiement: Array<'virement' | 'cheque' | 'especes' | 'autre'> = [
    'virement',
    'cheque',
    'especes',
    'autre',
  ];

  // Codes patrimoniaux possibles
  const patrimonials = ['21', '22', '23', '24', '211', '212', '213', '221', '231', '241', '242'];

  const mandats: Partial<Mandat>[] = [];
  const now = new Date();

  // Map pour suivre les mises à jour des bordereaux (nombre de mandats et montant total)
  const bordereauUpdates = new Map<number, { count: number; total: number }>();

  // Trier les bordereaux par date pour une meilleure répartition
  const sortedBordereaux = [...bordereauMandats].sort((a, b) => {
    const dateA = a.dateEmission ? new Date(a.dateEmission).getTime() : 0;
    const dateB = b.dateEmission ? new Date(b.dateEmission).getTime() : 0;
    return dateA - dateB;
  });

  for (let i = 0; i < count; i++) {
    // Choisir un bordereau aléatoirement
    const bordereau = randomChoice(sortedBordereaux);
    const exercice = bordereau.exercice;
    const bordereauId = bordereau.id;

    // La date du mandat doit être dans la période du bordereau
    // Le mandat doit être créé avant ou à la date d'émission du bordereau
    const bordereauDate = bordereau.dateEmission
      ? new Date(bordereau.dateEmission)
      : new Date(exercice, 11, 31);
    const startOfYear = new Date(exercice, 0, 1);

    // Date du mandat : entre le début de l'année et la date du bordereau
    const dateMandat = randomDate(startOfYear, bordereauDate);

    const numeroMandat = String(i + 1);
    const montant = randomAmount(5000, 500000);

    const statuts: Array<'emis' | 'paye'> = ['emis', 'paye'];
    // Les mandats liés à un bordereau fermé sont émis ou payés
    const statut =
      bordereau.statut === 'ferme'
        ? randomChoice(['emis' as const, 'paye' as const])
        : randomChoice(statuts);

    const numeroFacture =
      Math.random() > 0.3 ? `FACT-${String(randomAmount(1000, 9999)).padStart(4, '0')}` : undefined;
    const dateFacture = numeroFacture
      ? randomDate(new Date(dateMandat.getTime() - 30 * 24 * 60 * 60 * 1000), dateMandat)
      : undefined;

    const obs = Math.random() > 0.7 ? 'Mandat conforme' : undefined;
    const prevId = Math.random() > 0.2 ? randomChoice(previsionIds) : undefined;

    const mandat: Partial<Mandat> = {
      exercice,
      numeroMandat,
      numeroOrdre: i + 1,
      dateMandat,
      chapitreId: randomChoice(chapitreIds),
      mairieId: DEFAULT_MAIRIE_ID,
      beneficiaire: randomChoice(beneficiaires),
      objet: randomChoice(objets),
      montant,
      modePaiement: randomChoice(modesPaiement),
      statut,
      personnelId: randomChoice(personnelIds),
      createdAt: dateMandat,
      updatedAt: now,
    };

    // Ajouter le patrimonial (70% des mandats)
    const maybePatrimonial = Math.random() > 0.3 ? randomChoice(patrimonials) : undefined;
    if (maybePatrimonial) {
      mandat.patrimonial = maybePatrimonial;
    }

    // Lier le mandat au bordereau
    if (bordereauId) {
      mandat.bordereauMandatId = bordereauId;
    }

    const maybeSous = Math.random() > 0.2 ? randomChoice(sousChapitreIds) : undefined;
    if (maybeSous != null) {
      mandat.sousChapitreId = maybeSous;
    }

    if (prevId) {
      mandat.previsionId = prevId;
    }

    if (numeroFacture) {
      mandat.numeroFacture = numeroFacture;
    }

    if (dateFacture) {
      mandat.dateFacture = dateFacture;
    }

    if (obs) {
      mandat.observations = obs;
    }

    // Mettre à jour les statistiques du bordereau
    if (bordereauId) {
      const current = bordereauUpdates.get(bordereauId) || { count: 0, total: 0 };
      bordereauUpdates.set(bordereauId, {
        count: current.count + 1,
        total: current.total + montant,
      });
    }

    mandats.push(mandat);
  }

  await db.mandats.bulkAdd(mandats as unknown as Mandat[]);

  // Mettre à jour les bordereaux avec le nombre réel de mandats et le montant total
  for (const [id, stats] of bordereauUpdates.entries()) {
    await db.bordereauMandats.update(id, {
      nombreMandats: stats.count,
      montantTotal: stats.total,
      updatedAt: now,
    });
  }

  console.log(`âœ… ${count} mandats créés et liés aux bordereaux`);
  return mandats;
}

export async function seedBordereauMandats(personnelIds: number[], count: number = 20) {
  console.log(`ðŸŒ± Seeding ${count} bordereaux d'émission des mandats...`);

  const bordereauMandats: Partial<BordereauMandat>[] = [];
  const now = new Date();

  // Créer des bordereaux répartis sur les exercices avec des dates cohérentes
  const exercices = [2026];
  let numeroGlobal = 1;

  for (let i = 0; i < count; i++) {
    const exercice = exercices[i % exercices.length]!;
    // Date d'émission répartie sur l'année
    const mois = Math.floor((i / count) * 12);
    const dateEmission = new Date(exercice, mois, randomAmount(1, 28));

    // Si c'est 2025 et la date dépasse maintenant, ajuster
    if (exercice === 2026 && dateEmission > now) {
      dateEmission.setTime(now.getTime() - randomAmount(1, 30) * 24 * 60 * 60 * 1000);
    }

    const statuts: Array<'ouvert' | 'ferme'> = ['ouvert', 'ferme'];
    // Les exercices passés sont fermés, l'année en cours peut être ouvert
    const statut = exercice < 2026 ? 'ferme' : randomChoice(statuts);

    const obs = Math.random() > 0.6 ? 'Bordereau conforme' : undefined;

    const bordereauMandat: Partial<BordereauMandat> = {
      numero: numeroGlobal++,
      exercice,
      dateEmission,
      mairieId: DEFAULT_MAIRIE_ID,
      montantTotal: 0, // Sera calculé après insertion des mandats
      nombreMandats: 0, // Sera calculé après insertion des mandats
      statut,
      personnelId: randomChoice(personnelIds),
      createdAt: dateEmission,
      updatedAt: now,
    };

    if (obs) {
      bordereauMandat.observations = obs;
    }

    bordereauMandats.push(bordereauMandat);
  }

  // Insérer les bordereaux et récupérer les IDs
  const insertedIds = await db.bordereauMandats.bulkAdd(
    bordereauMandats as unknown as BordereauMandat[],
    { allKeys: true },
  );

  // Retourner les bordereaux avec leurs IDs
  const result = bordereauMandats.map((b, index) => ({
    ...b,
    id: insertedIds[index],
  })) as BordereauMandat[];

  console.log(`âœ… ${count} bordereaux mandats créés`);
  return result;
}

export async function seedQuotites(count: number = 10) {
  console.log(`ðŸŒ± Seeding ${count} quotités...`);

  const quotites: Partial<Quotite>[] = [];
  const now = new Date();
  const types = ['Marché', 'Abattoirs', 'Stationnement'];
  const descriptions = ['Ticket', 'Macaron', 'Droit de place', 'Autocollant'];
  // Prix obligatoires pour correspondre aux timbres (100, 200, 300, 500, 600, 1000)
  const requiredPrices = [100, 200, 300, 500, 600, 1000];

  // D'abord, créer une quotité pour chaque prix obligatoire
  for (const prix of requiredPrices) {
    const type = randomChoice(types);
    const code = `${type.substring(0, 2).toUpperCase()}${prix}`;

    const quotite: Partial<Quotite> = {
      code,
      prix,
      description: randomChoice(descriptions),
      type,
      mairieId: DEFAULT_MAIRIE_ID,
      actif: true, // Toujours actif pour les quotités obligatoires
      createdAt: randomDate(new Date(2023, 0, 1), now),
      updatedAt: now,
    };
    quotites.push(quotite);
  }

  // Ensuite, créer des quotités supplémentaires aléatoires
  const additionalCount = Math.max(0, count - requiredPrices.length);
  for (let i = 0; i < additionalCount; i++) {
    const type = randomChoice(types);
    const prix = randomChoice([100, 200, 300, 500, 600, 1000, 2000]);
    const code = `${type.substring(0, 2).toUpperCase()}${prix}-${i}`;

    const quotite: Partial<Quotite> = {
      code,
      prix,
      description: randomChoice(descriptions),
      type,
      mairieId: DEFAULT_MAIRIE_ID,
      actif: Math.random() > 0.2, // 80% chance of being active
      createdAt: randomDate(new Date(2023, 0, 1), now),
      updatedAt: now,
    };
    quotites.push(quotite);
  }

  await db.quotites.bulkAdd(quotites as Quotite[]);
  console.log(`âœ… ${quotites.length} quotités créées`);
  return quotites;
}

// =================================================================
//                      SEEDERS APP3 - TIMBRES
// =================================================================

/**
 * Construire un objet detailsQuotites à partir d'un objet timbres pour App3.
 * Répartit les quantités par valeur entre les quotités actives de même prix.
 */
async function buildDetailsQuotitesFromTimbresApp3(timbres: Record<number, number>) {
  const result: Record<string, number> = {};
  const quotites = await db.timbresQuotites.filter((q) => q.actif).toArray();
  const byPrix = new Map<number, typeof quotites>();
  for (const q of quotites) {
    const list = byPrix.get(q.prix) || [];
    list.push(q);
    byPrix.set(q.prix, list);
  }

  for (const prixKey of Object.keys(timbres)) {
    const prix = Number(prixKey);
    const total = Number(timbres[prix]) || 0;
    const list = byPrix.get(prix) || [];
    if (list.length === 0) continue;
    const base = Math.floor(total / list.length);
    let remainder = total - base * list.length;
    for (let i = 0; i < list.length; i++) {
      const q = list[i];
      if (!q) continue;
      const add = base + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
      result[`${prix}-${q.code}`] = add;
    }
  }

  return result;
}

export async function seedTimbresQuotites(count: number = 6) {
  console.log(`🌱 Seeding ${count} quotités timbres (App3)...`);

  const quotites: Partial<TimbresQuotite>[] = [];
  const now = new Date();
  // Prix obligatoires pour correspondre aux timbres App3 (500, 1000, 3000)
  const requiredPrices = [500, 1000, 3000];

  // D'abord, créer une quotité pour chaque prix obligatoire avec type Fiscal
  for (const prix of requiredPrices) {
    const code = `TF${prix}`;
    const quotite: Partial<TimbresQuotite> = {
      code,
      prix,
      description: 'Timbre fiscal',
      type: 'Fiscal',
      mairieId: DEFAULT_MAIRIE_ID,
      actif: true,
      createdAt: randomDate(new Date(2023, 0, 1), now),
      updatedAt: now,
    };
    quotites.push(quotite);
  }

  // Ensuite, créer une quotité pour chaque prix avec type Administratif
  for (const prix of requiredPrices) {
    const code = `TA${prix}`;
    const quotite: Partial<TimbresQuotite> = {
      code,
      prix,
      description: 'Timbre administratif',
      type: 'Administratif',
      mairieId: DEFAULT_MAIRIE_ID,
      actif: true,
      createdAt: randomDate(new Date(2023, 0, 1), now),
      updatedAt: now,
    };
    quotites.push(quotite);
  }

  await db.timbresQuotites.bulkAdd(quotites as TimbresQuotite[]);
  console.log(`✅ ${quotites.length} quotités timbres créées`);
  return quotites;
}

export async function seedTimbresApprovisionnements(personnelIds: number[], count: number = 20) {
  console.log(`🌱 Seeding ${count} approvisionnements timbres (App3)...`);

  const approvisionnements: Partial<TimbresApprovisionnement>[] = [];
  const now = new Date();
  const exercices = [2026];

  for (let i = 0; i < count; i++) {
    const exercice = randomChoice(exercices);
    const date = randomDate(
      new Date(exercice, 0, 1),
      exercice === 2026 ? now : new Date(exercice, 11, 31),
    );
    const type = 'appro';
    // Générer des quantités aléatoires pour chaque valeur de timbre (500, 1000, 3000)
    const timbres: TimbresValeurs = {
      500: randomAmount(50, 500),
      1000: randomAmount(30, 300),
      3000: randomAmount(10, 100),
    };

    // Calculer le total
    const total = timbres[500] * 500 + timbres[1000] * 1000 + timbres[3000] * 3000;

    const obs =
      Math.random() > 0.7 ? `Approvisionnement ${type} de l'exercice ${exercice}` : undefined;

    const approvisionnement: Partial<TimbresApprovisionnement> = {
      mairieId: DEFAULT_MAIRIE_ID,
      exercice,
      date,
      type,
      timbres,
      detailsQuotites: await buildDetailsQuotitesFromTimbresApp3(timbres),
      total,
      personnelId: randomChoice(personnelIds),
      createdAt: date,
      updatedAt: now,
    };

    if (obs) {
      approvisionnement.observations = obs;
    }

    approvisionnements.push(approvisionnement);
  }

  await db.timbresApprovisionnements.bulkAdd(
    approvisionnements as unknown as TimbresApprovisionnement[],
  );
  console.log(`✅ ${count} approvisionnements timbres créés`);
  return approvisionnements;
}

export async function seedTimbresRemises(personnelIds: number[], count: number = 30) {
  console.log(`🌱 Seeding ${count} remises timbres (App3)...`);

  const remises: Partial<TimbresRemise>[] = [];
  const now = new Date();
  const exercices = [2026];

  for (let i = 0; i < count; i++) {
    const exercice = randomChoice(exercices);
    const date = randomDate(
      new Date(exercice, 0, 1),
      exercice === 2026 ? now : new Date(exercice, 11, 31),
    );
    const numeroRemise = `TREM-${exercice}-${String(i + 1).padStart(4, '0')}`;

    // Générer des quantités aléatoires pour chaque valeur de timbre
    const timbres: TimbresValeurs = {
      500: randomAmount(20, 200),
      1000: randomAmount(15, 150),
      3000: randomAmount(5, 50),
    };

    // Calculer le total
    const total = timbres[500] * 500 + timbres[1000] * 1000 + timbres[3000] * 3000;

    const obs = Math.random() > 0.6 ? `Remise de timbres` : undefined;

    const remise: Partial<TimbresRemise> = {
      mairieId: DEFAULT_MAIRIE_ID,
      exercice,
      date,
      type: 'remise',
      numeroRemise,
      timbres,
      detailsQuotites: await buildDetailsQuotitesFromTimbresApp3(timbres),
      total,
      personnelId: randomChoice(personnelIds),
      createdAt: date,
      updatedAt: now,
    };

    if (obs) {
      remise.observations = obs;
    }

    remises.push(remise);
  }

  await db.timbresRemises.bulkAdd(remises as unknown as TimbresRemise[]);
  console.log(`✅ ${count} remises timbres créées`);
  return remises;
}

export async function seedTimbresVersements(personnelIds: number[], count: number = 40) {
  console.log(`🌱 Seeding ${count} versements timbres (App3)...`);

  const versements: Partial<TimbresVersement>[] = [];
  const now = new Date();
  const exercices = [2026];

  for (let i = 0; i < count; i++) {
    const exercice = randomChoice(exercices);
    const date = randomDate(
      new Date(exercice, 0, 1),
      exercice === 2026 ? now : new Date(exercice, 11, 31),
    );
    const numeroVersement = `TVER-${exercice}-${String(i + 1).padStart(4, '0')}`;

    // Générer des quantités aléatoires pour chaque valeur de timbre (vendus)
    const timbres: TimbresValeurs = {
      500: randomAmount(10, 100),
      1000: randomAmount(8, 80),
      3000: randomAmount(2, 20),
    };

    // Calculer le total
    const total = timbres[500] * 500 + timbres[1000] * 1000 + timbres[3000] * 3000;

    const obs = Math.random() > 0.7 ? `Versement journalier` : undefined;

    const versement: Partial<TimbresVersement> = {
      mairieId: DEFAULT_MAIRIE_ID,
      exercice,
      date,
      numeroVersement,
      timbres,
      detailsQuotites: await buildDetailsQuotitesFromTimbresApp3(timbres),
      total,
      personnelId: randomChoice(personnelIds),
      createdAt: date,
      updatedAt: now,
    };

    if (obs) {
      versement.observations = obs;
    }

    versements.push(versement);
  }

  await db.timbresVersements.bulkAdd(versements as unknown as TimbresVersement[]);
  console.log(`✅ ${count} versements timbres créés`);
  return versements;
}

export async function seedTimbresBalancesEntree(personnelIds: number[], count: number = 3) {
  console.log(`🌱 Seeding ${count} balances d'entrée timbres (App3)...`);

  const balances: Partial<TimbresBalanceEntree>[] = [];
  const now = new Date();
  const exercice = 2026;
  const types = ['BE-S1', 'BE-S2', 'BE-S3'];

  for (let i = 0; i < Math.min(count, types.length); i++) {
    const type = types[i]!;
    const date = new Date(exercice, 0, 1); // 1er janvier de l'exercice

    // Générer des quantités aléatoires pour le stock initial
    const timbres: TimbresValeurs = {
      500: randomAmount(200, 1000),
      1000: randomAmount(150, 800),
      3000: randomAmount(50, 300),
    };

    // Calculer le total
    const total = timbres[500] * 500 + timbres[1000] * 1000 + timbres[3000] * 3000;

    const balance: Partial<TimbresBalanceEntree> = {
      mairieId: DEFAULT_MAIRIE_ID,
      exercice,
      date,
      type,
      timbres,
      detailsQuotites: await buildDetailsQuotitesFromTimbresApp3(timbres),
      total,
      commentaires: `Stock initial ${type} de l'exercice ${exercice}`,
      personnelId: randomChoice(personnelIds),
      createdAt: date,
      updatedAt: now,
    };

    balances.push(balance);
  }

  await db.timbresBalancesEntree.bulkAdd(balances as unknown as TimbresBalanceEntree[]);
  console.log(
    `✅ ${balances.length} balances d'entrée timbres créées (BE-S1, BE-S2, BE-S3 pour 2026)`,
  );
  return balances;
}

/**
 * Options pour le seeder de données de test App3.
 */
export interface SeedTimbresOptions {
  timbresQuotites?: number;
  timbresApprovisionnements?: number;
  timbresRemises?: number;
  timbresVersements?: number;
  timbresBalancesEntree?: number;
}

/**
 * Remplit les tables App3 (Timbres) avec des données de test.
 */
export async function seedTimbresTestData(options: SeedTimbresOptions = {}) {
  console.log('🚀 Starting App3 Timbres test data seeders...');

  const {
    timbresQuotites = 6,
    timbresApprovisionnements = 20,
    timbresRemises = 30,
    timbresVersements = 40,
    timbresBalancesEntree = 3,
  } = options;

  try {
    const utilisateursCreated = await db.utilisateurs.toArray();
    const utilisateurIds = utilisateursCreated.map((u) => u.id!);

    if (utilisateurIds.length === 0) {
      console.log('⚠️ No users found, creating admin user first...');
      const now = new Date();
      const userId = await db.utilisateurs.add({
        username: 'admin',
        password: 'admin123',
        nom: 'Administrateur',
        prenom: 'Système',
        email: 'admin@tresor.sn',
        role: 'admin',
        actif: true,
        createdAt: now,
        updatedAt: now,
      });
      utilisateurIds.push(userId as number);
    }

    // Seeding quotités AVANT les autres données
    console.log(`🌱 Seeding ${timbresQuotites} test quotités timbres...`);
    await seedTimbresQuotites(timbresQuotites);

    console.log(`🌱 Seeding ${timbresBalancesEntree} test balances entrée timbres...`);
    await seedTimbresBalancesEntree(utilisateurIds, timbresBalancesEntree);

    console.log(`🌱 Seeding ${timbresApprovisionnements} test approvisionnements timbres...`);
    await seedTimbresApprovisionnements(utilisateurIds, timbresApprovisionnements);

    console.log(`🌱 Seeding ${timbresRemises} test remises timbres...`);
    await seedTimbresRemises(utilisateurIds, timbresRemises);

    console.log(`🌱 Seeding ${timbresVersements} test versements timbres...`);
    await seedTimbresVersements(utilisateurIds, timbresVersements);

    console.log('\n✨ All App3 Timbres test data seeders have been executed successfully!');
  } catch (error) {
    console.error('❌ Error during App3 Timbres test data seeding:', error);
    throw error;
  }
}
