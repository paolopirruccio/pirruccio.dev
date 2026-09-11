export const CASE_STUDIES_ENABLED = false;
const readyStudies = new Set(["astergift", "sarcofago-tebanianus", "laprendoconsport", "text-encoding", "nasa", "blogowl", "cineo", "bussola-infouma"]);
export function isCaseStudyEnabled(slug:string) { return CASE_STUDIES_ENABLED || readyStudies.has(slug); }
