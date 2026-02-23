import { personalData } from "./personal";
import { workData } from "./work";
import { educationData } from "./education";
import { projectsData } from "./projects";
import { skillsData } from "./skills";
import { hackathonsData } from "./hackathons";

export const DATA = {
  ...personalData,
  work: workData,
  education: educationData,
  projects: projectsData,
  skills: skillsData,
  hackathons: hackathonsData,
} as const;
