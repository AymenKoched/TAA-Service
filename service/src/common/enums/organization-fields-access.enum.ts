export enum OrganizationGeneralFields {
  FullName = 'full_name',
  LegalStatus = 'legal_status',
  FoundingYear = 'founding_year',
  GroupAffiliation = 'group_affiliation',

  HeadOffice = 'head_office',
  PostalCode = 'postal_code',
  RAndDSites = 'r_and_d_sites',
  OtherLocations = 'other_locations',
  City = 'city',
  Country = 'country',

  Phone = 'phone',
  Adherent = 'adherent',
  Linkedin = 'linkedin',
  Facebook = 'facebook',
  Twitter = 'twitter',
  WebsiteUrl = 'website_url',
  Email = 'email',

  ExternalViews = 'external_views',
  InternalViews = 'internal_views',
}

export enum OrganizationProductsFields {
  LocalSites = 'local_sites',
  ForeignImplantationSites = 'foreign_implantationSites',
  ForeignExportationSites = 'foreign_exportationSites',

  PrimaryActivities = 'primary_activities',
  SecondaryActivities = 'secondary_activities',

  Products = 'products',
  Products_NGP = 'products_ngp',
}

export enum OrganizationHumanResourcesFields {
  DirectEmployees = 'direct_employees',
  IndirectEmployees = 'indirect_employees',

  Contracts = 'contracts',

  RevenueKpis = 'revenue_kpis',

  AgeKpis = 'age_kpis',

  FormationKpi = 'formation_kpi',
}

export enum OrganizationRevenuesFields {
  TurnoverDistribution = 'turnover_distribution',

  ClientsTypes = 'clients_types',

  Turnover = 'turnover',

  CountriesParticipation = 'countries_participation',
}

export enum OrganizationExtrasFields {
  NewProducts = 'new_products',

  Investments = 'investments',
  Esgs = 'esgs',
  Partnerships = 'partnerships',
  Technologies = 'technologies',

  ResearchDevelopment = 'research_development',

  Certifications = 'certifications',

  RAndDProjects = 'r_and_d_projects',

  Initiatives = 'initiatives',
}

export enum OrganizationOthersFields {
  Environment = 'environment',
  WasteDistribution = 'waste_distribution',
  Questions = 'questions',
}

export enum OrganizationOpportunitiesFields {
  Opportunities = 'opportunities',
}

export enum OrganizationFieldsAccess {
  // General
  FullName = OrganizationGeneralFields.FullName,
  LegalStatus = OrganizationGeneralFields.LegalStatus,
  FoundingYear = OrganizationGeneralFields.FoundingYear,
  GroupAffiliation = OrganizationGeneralFields.GroupAffiliation,
  HeadOffice = OrganizationGeneralFields.HeadOffice,
  PostalCode = OrganizationGeneralFields.PostalCode,
  RAndDSites = OrganizationGeneralFields.RAndDSites,
  OtherLocations = OrganizationGeneralFields.OtherLocations,
  City = OrganizationGeneralFields.City,
  Country = OrganizationGeneralFields.Country,
  Phone = OrganizationGeneralFields.Phone,
  Adherent = OrganizationGeneralFields.Adherent,
  Linkedin = OrganizationGeneralFields.Linkedin,
  Facebook = OrganizationGeneralFields.Facebook,
  Twitter = OrganizationGeneralFields.Twitter,
  WebsiteUrl = OrganizationGeneralFields.WebsiteUrl,
  Email = OrganizationGeneralFields.Email,
  ExternalViews = OrganizationGeneralFields.ExternalViews,
  InternalViews = OrganizationGeneralFields.InternalViews,

  // Products
  LocalSites = OrganizationProductsFields.LocalSites,
  ForeignImplantationSites = OrganizationProductsFields.ForeignImplantationSites,
  ForeignExportationSites = OrganizationProductsFields.ForeignExportationSites,
  PrimaryActivities = OrganizationProductsFields.PrimaryActivities,
  SecondaryActivities = OrganizationProductsFields.SecondaryActivities,
  Products = OrganizationProductsFields.Products,
  Products_NGP = OrganizationProductsFields.Products_NGP,

  // Human Resources
  DirectEmployees = OrganizationHumanResourcesFields.DirectEmployees,
  IndirectEmployees = OrganizationHumanResourcesFields.IndirectEmployees,
  Contracts = OrganizationHumanResourcesFields.Contracts,
  RevenueKpis = OrganizationHumanResourcesFields.RevenueKpis,
  AgeKpis = OrganizationHumanResourcesFields.AgeKpis,
  FormationKpi = OrganizationHumanResourcesFields.FormationKpi,

  // Revenues
  TurnoverDistribution = OrganizationRevenuesFields.TurnoverDistribution,
  ClientsTypes = OrganizationRevenuesFields.ClientsTypes,
  Turnover = OrganizationRevenuesFields.Turnover,
  CountriesParticipation = OrganizationRevenuesFields.CountriesParticipation,

  // Extras
  NewProducts = OrganizationExtrasFields.NewProducts,
  Investments = OrganizationExtrasFields.Investments,
  Esgs = OrganizationExtrasFields.Esgs,
  Partnerships = OrganizationExtrasFields.Partnerships,
  Technologies = OrganizationExtrasFields.Technologies,
  ResearchDevelopment = OrganizationExtrasFields.ResearchDevelopment,
  Certifications = OrganizationExtrasFields.Certifications,
  RAndDProjects = OrganizationExtrasFields.RAndDProjects,
  Initiatives = OrganizationExtrasFields.Initiatives,

  // Others
  Environment = OrganizationOthersFields.Environment,
  WasteDistribution = OrganizationOthersFields.WasteDistribution,
  Questions = OrganizationOthersFields.Questions,

  // Opportunities
  Opportunities = OrganizationOpportunitiesFields.Opportunities,
}

export const StandardSubscription = [
  OrganizationFieldsAccess.Products_NGP,
  OrganizationFieldsAccess.FormationKpi,
  OrganizationFieldsAccess.Opportunities,
];

export const PremiumSubscription = [];
