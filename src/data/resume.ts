import { personalData } from "./personal";
import { workData } from "./work";
import { educationData } from "./education";
import { getProjectsByLang } from "@/data/projects";
import { skillsData } from "./skills";
import { hackathonsData } from "./hackathons";

export const DATA = {
  ...personalData,
  work: workData,
  education: educationData,
  projects: getProjectsByLang("en"),
  skills: skillsData,
  hackathons: hackathonsData,
};
