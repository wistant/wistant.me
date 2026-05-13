import { z } from "zod";

export const SocialSchema = z.object({
  name: z.string(),
  url: z.string(),
  icon: z.string(),
  navbar: z.boolean().optional(),
});

export const ContactSchema = z.object({
  email: z.string(),
  tel: z.string(),
  social: z.record(z.string(), SocialSchema),
});

export const NavbarItemSchema = z.object({
  href: z.string(),
  icon: z.string(),
  label: z.string(),
});

export const PersonalDataSchema = z.object({
  name: z.string(),
  initials: z.string(),
  url: z.string(),
  location: z.string(),
  locationLink: z.string(),
  description: z.string(),
  about: z.string(),
  avatarUrl: z.string(),
  post: z.string(),
  navbar: z.array(NavbarItemSchema),
});

export const WorkExperienceSchema = z.object({
  company: z.string(),
  href: z.string(),
  badges: z.array(z.string()),
  icons: z.array(z.string()),
  location: z.string(),
  title: z.string(),
  logoUrl: z.string(),
  start: z.string(),
  end: z.string().optional(),
  description: z.string(),
});

export const EducationSchema = z.object({
  school: z.string(),
  href: z.string(),
  degree: z.string(),
  logoUrl: z.string(),
  start: z.string(),
  end: z.string().optional(),
});

export const SkillSchema = z.object({
  name: z.string(),
  icon: z.string(),
});

export const HackathonSchema = z.object({
  title: z.string(),
  dates: z.string(),
  location: z.string(),
  description: z.string(),
  image: z.string(),
  links: z.array(z.object({
    title: z.string(),
    icon: z.string(),
    href: z.string(),
  })),
});

export type Social = z.infer<typeof SocialSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type NavbarItem = z.infer<typeof NavbarItemSchema>;
export type PersonalData = z.infer<typeof PersonalDataSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Hackathon = z.infer<typeof HackathonSchema>;

import { ProjectEntry } from "@/lib/mdx-registry";

export const ResumeDataSchema = PersonalDataSchema.extend({
  contact: ContactSchema,
  work: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(SkillSchema),
  hackathons: z.array(HackathonSchema),
  projects: z.array(z.custom<ProjectEntry>()), // Projects come from our native mdx-registry
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
