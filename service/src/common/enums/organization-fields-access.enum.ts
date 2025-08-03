export enum OrganizationGeneralFields {
  fullName = 'fullName',
  legalStatus = 'legalStatus',
  foundingYear = 'foundingYear',
  groupAffiliation = 'groupAffiliation',

  headOffice = 'headOffice',
  postalCode = 'postalCode',
  rAndDSites = 'rAndDSites',
  otherLocations = 'otherLocations',
  city = 'city',
  country = 'country',

  phone = 'phone',
  adherent = 'adherent',
  linkedin = 'linkedin',
  facebook = 'facebook',
  twitter = 'twitter',
  websiteUrl = 'website_url',
  email = 'email',

  externalViews = 'externalViews',
  InternalViews = 'internalViews',
}

export enum OrganizationProductsFields {
  localSites = 'localSites',
  foreignImplantationSites = 'foreignImplantationSites',
  foreignExportationSites = 'foreignExportationSites',

  primaryActivities = 'primaryActivities',
  secondaryActivities = 'secondaryActivities',

  products = 'products',
  products_ngp = 'products_ngp',
}

export enum OrganizationHumanResourcesFields {
  directEmployees = 'directEmployees',
  indirectEmployees = 'indirectEmployees',

  contracts = 'contracts',

  revenueKpis = 'revenueKpis',

  ageKpis = 'ageKpis',

  formationKpi = 'formationKpi',
}

export enum OrganizationRevenuesFields {
  turnoverDistribution = 'turnoverDistribution',

  clientsTypes = 'clientsTypes',

  turnover = 'turnover',

  countriesParticipation = 'countriesParticipation',
}

export enum OrganizationExtrasFields {
  newProducts = 'newProducts',

  investments = 'investments',
  esgs = 'esgs',
  partnerships = 'partnerships',
  technologies = 'technologies',

  researchDevelopment = 'researchDevelopment',

  certifications = 'certifications',

  rAndDProjects = 'rAndDProjects',

  initiatives = 'initiatives',
}

export enum OrganizationOthersFields {
  environment = 'environment',
  environment_electricity = 'environment_electricity',
  wasteDistribution = 'wasteDistribution',
  questions = 'questions',
}

export enum OrganizationOpportunitiesFields {
  opportunities = 'opportunities',
}

export enum OrganizationFieldsAccess {
  // General
  fullName = OrganizationGeneralFields.fullName,
  legalStatus = OrganizationGeneralFields.legalStatus,
  foundingYear = OrganizationGeneralFields.foundingYear,
  groupAffiliation = OrganizationGeneralFields.groupAffiliation,
  headOffice = OrganizationGeneralFields.headOffice,
  postalCode = OrganizationGeneralFields.postalCode,
  rAndDSites = OrganizationGeneralFields.rAndDSites,
  otherLocations = OrganizationGeneralFields.otherLocations,
  city = OrganizationGeneralFields.city,
  country = OrganizationGeneralFields.country,
  phone = OrganizationGeneralFields.phone,
  adherent = OrganizationGeneralFields.adherent,
  linkedin = OrganizationGeneralFields.linkedin,
  facebook = OrganizationGeneralFields.facebook,
  twitter = OrganizationGeneralFields.twitter,
  websiteUrl = OrganizationGeneralFields.websiteUrl,
  email = OrganizationGeneralFields.email,
  externalViews = OrganizationGeneralFields.externalViews,
  internalViews = OrganizationGeneralFields.InternalViews,

  // Products
  localSites = OrganizationProductsFields.localSites,
  foreignImplantationSites = OrganizationProductsFields.foreignImplantationSites,
  foreignExportationSites = OrganizationProductsFields.foreignExportationSites,
  primaryActivities = OrganizationProductsFields.primaryActivities,
  secondaryActivities = OrganizationProductsFields.secondaryActivities,
  products = OrganizationProductsFields.products,
  products_ngp = OrganizationProductsFields.products_ngp,

  // Human Resources
  directEmployees = OrganizationHumanResourcesFields.directEmployees,
  indirectEmployees = OrganizationHumanResourcesFields.indirectEmployees,
  contracts = OrganizationHumanResourcesFields.contracts,
  revenueKpis = OrganizationHumanResourcesFields.revenueKpis,
  ageKpis = OrganizationHumanResourcesFields.ageKpis,
  formationKpi = OrganizationHumanResourcesFields.formationKpi,

  // Revenues
  turnoverDistribution = OrganizationRevenuesFields.turnoverDistribution,
  clientsTypes = OrganizationRevenuesFields.clientsTypes,
  turnover = OrganizationRevenuesFields.turnover,
  countriesParticipation = OrganizationRevenuesFields.countriesParticipation,

  // Extras
  newProducts = OrganizationExtrasFields.newProducts,
  investments = OrganizationExtrasFields.investments,
  esgs = OrganizationExtrasFields.esgs,
  partnerships = OrganizationExtrasFields.partnerships,
  technologies = OrganizationExtrasFields.technologies,
  researchDevelopment = OrganizationExtrasFields.researchDevelopment,
  certifications = OrganizationExtrasFields.certifications,
  rAndDProjects = OrganizationExtrasFields.rAndDProjects,
  initiatives = OrganizationExtrasFields.initiatives,

  // Others
  environment = OrganizationOthersFields.environment,
  environment_electricity = OrganizationOthersFields.environment_electricity,
  wasteDistribution = OrganizationOthersFields.wasteDistribution,
  questions = OrganizationOthersFields.questions,

  // Opportunities
  opportunities = OrganizationOpportunitiesFields.opportunities,
}

export const StandardSubscription = [
  OrganizationFieldsAccess.products_ngp,
  OrganizationFieldsAccess.formationKpi,
  OrganizationFieldsAccess.opportunities,
];

export const PremiumSubscription = [];
