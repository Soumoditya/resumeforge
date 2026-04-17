"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { INITIAL_RESUME } from "@/lib/constants";

const ResumeContext = createContext(null);

const STORAGE_KEY = "resumeforge_data";

function resumeReducer(state, action) {
  switch (action.type) {
    case "SET_PERSONAL":
      return { ...state, personal: { ...state.personal, ...action.payload } };

    case "ADD_EXPERIENCE":
      return {
        ...state,
        experience: [
          ...state.experience,
          { ...action.payload, id: crypto.randomUUID() },
        ],
      };

    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload } : exp
        ),
      };

    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.filter((exp) => exp.id !== action.payload),
      };

    case "REORDER_EXPERIENCE":
      return { ...state, experience: action.payload };

    case "ADD_EDUCATION":
      return {
        ...state,
        education: [
          ...state.education,
          { ...action.payload, id: crypto.randomUUID() },
        ],
      };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? { ...edu, ...action.payload } : edu
        ),
      };

    case "REMOVE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((edu) => edu.id !== action.payload),
      };

    case "SET_SKILLS":
      return {
        ...state,
        skills: { ...state.skills, ...action.payload },
      };

    case "SET_TEMPLATE":
      return { ...state, selectedTemplate: action.payload };

    case "LOAD_RESUME":
      return { ...action.payload };

    case "RESET":
      return { ...INITIAL_RESUME };

    default:
      return state;
  }
}

export function ResumeProvider({ children }) {
  const [resume, dispatch] = useReducer(resumeReducer, INITIAL_RESUME);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "LOAD_RESUME", payload: parsed });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    } catch {
      // Ignore storage errors
    }
  }, [resume]);

  return (
    <ResumeContext.Provider value={{ resume, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
