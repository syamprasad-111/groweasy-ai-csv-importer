import { CRMRecord } from "../types/crm";

const VALID_STATUS = [
  "GOOD_LEAD_FOLLOW_UP",
  "DID_NOT_CONNECT",
  "BAD_LEAD",
  "SALE_DONE",
] as const;

const VALID_DATA_SOURCE = [
  "leads_on_demand",
  "meridian_tower",
  "eden_park",
  "varah_swamy",
  "sarjapur_plots",
] as const;

const CRM_FIELDS: (keyof CRMRecord)[] = [
  "created_at",
  "name",
  "email",
  "country_code",
  "mobile_without_country_code",
  "company",
  "city",
  "state",
  "country",
  "lead_owner",
  "crm_status",
  "crm_note",
  "data_source",
  "possession_time",
  "description",
];

export const validateCRMRecords = (
  records: CRMRecord[]
): CRMRecord[] => {
  return records.map((record) => {
    const validated = {} as CRMRecord;

    // Ensure every CRM field exists
    CRM_FIELDS.forEach((field) => {
      validated[field] = record[field] ?? "";
    });

    // Validate CRM Status
    if (!VALID_STATUS.includes(validated.crm_status as typeof VALID_STATUS[number])) {
      validated.crm_status = "";
    }

    // Validate Data Source
    if (
      !VALID_DATA_SOURCE.includes(
        validated.data_source as typeof VALID_DATA_SOURCE[number]
      )
    ) {
      validated.data_source = "";
    }

    // Normalize null/undefined
    CRM_FIELDS.forEach((field) => {
      if (
        validated[field] === null ||
        validated[field] === undefined
      ) {
        validated[field] = "";
      }
    });

    return validated;
  });
};