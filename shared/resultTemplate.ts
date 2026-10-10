export const RESULT_TEMPLATE_SECTIONS = ["Nursery", "Primary", "Junior", "Senior"] as const;
export type ResultTemplateSection = (typeof RESULT_TEMPLATE_SECTIONS)[number];
export type ResultTemplateOrientation = "portrait" | "landscape";

export const APPROVED_RESULT_FONTS = ["system", "Inter", "Manrope", "Nunito Sans", "Noto Sans Arabic"] as const;
export type ApprovedResultFont = (typeof APPROVED_RESULT_FONTS)[number];

export type ResultTemplateLayoutValues = {
  pageOrientation: ResultTemplateOrientation;
  fontFamily: ApprovedResultFont;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  titleFontSize: number;
  bodyFontSize: number;
  arabicTitleSize: number;
  logoSize: number;
  headerSpacing: number;
  rowHeight: number;
  commentBoxSize: number;
  tableGap: number;
  customHeader: string;
  customFooter: string;
  watermarkUrl: string | null;
  watermarkKey: string | null;
  watermarkOpacity: number;
  watermarkSize: number;
};

export type ResultTemplateLayout = ResultTemplateLayoutValues & {
  id: number;
  section: ResultTemplateSection;
  updatedBy: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export const DEFAULT_RESULT_TEMPLATE_LAYOUT: ResultTemplateLayoutValues = {
  pageOrientation: "portrait",
  fontFamily: "system",
  marginTop: 16,
  marginRight: 14,
  marginBottom: 14,
  marginLeft: 14,
  titleFontSize: 20,
  bodyFontSize: 11,
  arabicTitleSize: 22,
  logoSize: 64,
  headerSpacing: 12,
  rowHeight: 32,
  commentBoxSize: 104,
  tableGap: 8,
  customHeader: "",
  customFooter: "",
  watermarkUrl: null,
  watermarkKey: null,
  watermarkOpacity: 12,
  watermarkSize: 60,
};

export type ResultTemplateNumericField = Exclude<keyof ResultTemplateLayoutValues, "pageOrientation" | "fontFamily" | "customHeader" | "customFooter" | "watermarkUrl" | "watermarkKey">;

export const RESULT_TEMPLATE_LIMITS = {
  marginTop: { min: 4, max: 40 },
  marginRight: { min: 4, max: 40 },
  marginBottom: { min: 4, max: 40 },
  marginLeft: { min: 4, max: 40 },
  titleFontSize: { min: 12, max: 40 },
  bodyFontSize: { min: 8, max: 22 },
  arabicTitleSize: { min: 14, max: 48 },
  logoSize: { min: 24, max: 140 },
  headerSpacing: { min: 4, max: 48 },
  rowHeight: { min: 20, max: 72 },
  commentBoxSize: { min: 64, max: 220 },
  tableGap: { min: 0, max: 32 },
  watermarkOpacity: { min: 0, max: 45 },
  watermarkSize: { min: 15, max: 95 },
} as const;

export function getDefaultResultTemplateLayout(section: ResultTemplateSection): ResultTemplateLayout {
  return {
    id: 0,
    section,
    ...DEFAULT_RESULT_TEMPLATE_LAYOUT,
    updatedBy: null,
    createdAt: "",
    updatedAt: "",
  };
}

export function clampResultTemplateValue(field: ResultTemplateNumericField, value: number) {
  const limits = RESULT_TEMPLATE_LIMITS[field];
  return Math.min(limits.max, Math.max(limits.min, Math.round(value)));
}
