import { toast } from "react-toastify"
import { usePatientStore } from "../store"
import { Patient } from "../types"
import PatientDetailsItem from "./PatientDetailsItem"

type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({patient}: PatientDetailsProps) {

  const deletePatient = usePatientStore(state => state.deletePatient)
  const setActiveId = usePatientStore(state => state.setActiveId)

  const handleClik = () => {
    deletePatient(patient.id)
    toast("Paciente Eliminado del Sistema", {
      type: "error"
    })
  }

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
        <PatientDetailsItem label="id" data={patient.id} />
        <PatientDetailsItem label="nombre" data={patient.name} />
        <PatientDetailsItem label="propietario" data={patient.caretaker} />
        <PatientDetailsItem label="email" data={patient.email} />
        <PatientDetailsItem label="alta" data={patient.date.toString()} />
        <PatientDetailsItem label="sintomas" data={patient.symptoms} />

        <div className="flex flex-col sm:flex-row gap-3 justify-between mt-10">
          <button
          type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold uppercase"
           onClick={() => setActiveId(patient.id)}
          >Editar</button>
          <button
          type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold uppercase"
            onClick={handleClik}
          >Eliminar</button>
        </div>
    </div>
  )
}
