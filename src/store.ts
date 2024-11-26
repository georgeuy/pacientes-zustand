import { create } from "zustand";
import { devtools } from "zustand/middleware"
import { DraftPatient, Patient } from "./types";
import { v4 as uuidv4 } from "uuid";

type PatientState = {
    patients: Patient[]
    activeId: Patient['id']

    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    setActiveId: (id: Patient['id']) => void
}

export const usePatientStore = create<PatientState>()(devtools(((set) => ({
    patients: [],
    activeId: "",
    addPatient: (data) => {
        const newPatient:Patient = {...data, id:uuidv4()}
        set((state) => ({
            patients: [...state.patients, newPatient]
        }))
    },
    deletePatient: (id) => {
        set((state) => ({
            patients: state.patients.filter(patient => patient.id !== id)
        }))
    },
    setActiveId: (id) => {
        
        set(()=>({
            activeId: id
        }))
    },
}))
))