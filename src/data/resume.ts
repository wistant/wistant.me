import { personalData } from "./personal";
import { workData } from "./work";
import { educationData } from "./education";
import { getProjectsByLang } from "@/data/projects";
import { skillsData } from "./skills";
import { hackathonsData } from "./hackathons";
import { ResumeData } from "@/types/resume";

/**
 * Returns the localized resume data based on the requested language.
 */
export function getResumeData(lang: string = "en"): ResumeData {
  const l = (lang === "fr" || lang === "en") ? lang : "en";

  return {
    ...personalData[l],
    contact: personalData.contact,
    work: workData[l] || workData.en,
    education: educationData[l] || educationData.en,
    projects: getProjectsByLang(l as any),
    skills: skillsData,
    hackathons: hackathonsData,
  };
}

// Legacy export for compatibility (deprecated)
export const DATA = getResumeData("en");
