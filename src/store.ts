import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { DraftPatient, Patient } from "./types";
import { v4 as uuidv4 } from "uuid";

type PatientState = {
    patients: Patient[]
    activeId: Patient['id']

    addPatient: (data: DraftPatient) => void
    updatePatient: (id:Patient['id'], data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    setActiveId: (id: Patient['id']) => void
}

export const usePatientStore = create<PatientState>()(
    devtools(persist(((set) => ({
    patients: [],
    activeId: "",
    addPatient: (data) => {
        // add or update patient
        set((state) => ({
            patients: [...state.patients, {...data, id: uuidv4()}]
        }))
    },
    updatePatient: (id, data) => {
        // add or update patient
        set((state) => ({
            patients: state.patients.map(patient => patient.id === id ? {...data, id} : patient),
            activeId: ""
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
})),{
    name: 'patient-storage',
    storage: createJSONStorage(() => localStorage)
})
))