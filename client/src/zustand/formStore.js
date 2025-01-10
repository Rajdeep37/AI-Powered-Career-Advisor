import { create } from "zustand";

const useFormStore = create((set) => ({
  personal: null,
  education: null,
  experience: null,
  skill: null,
  project: null,
  interest: null,
  prefernce: null,

  setPersonal: (personalDetails) =>
    set(() => ({
      personal: personalDetails,
    })),

  setEducation: (educationDetails) =>
    set(() => ({
      education: educationDetails,
    })),

  setExperience: (experienceDetails) =>
    set(() => ({
      experience: experienceDetails,
    })),

  setSkill: (skillsDetails) =>
    set(() => ({
      skill: skillsDetails,
    })),

  setProject: (projectsDetails) =>
    set(() => ({
      project: projectsDetails,
    })),

  setInterest: (interestsDetails) =>
    set(() => ({
      interest: interestsDetails,
    })),

  setPreference: (preferencesDetails) =>
    set(() => ({
      preference: preferencesDetails,
    })),
}));

export default useFormStore;
