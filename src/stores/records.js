import { defineStore } from 'pinia'

export const useRecordsStore = defineStore('records', {
  state: () => ({
     records:[
      {
        id:1,
        activity_date:"2021-06-25",
        activity_name: "Encuentro de Integración",
        consecutive: "F1",
        cultural_right_id: "Referencias a comunidades culturales",
        expertise_id: "Juegos tradicionales",
        final_hour: "11:50",
        nac_id:"ANDALUCÍA",
        start_time:"00:00",
        status:'En Revisión'
      },
      {
        id:2,
        activity_date:"2022-06-25",
        activity_name: "Lectura al Parque",
        consecutive: "F2",
        cultural_right_id: "Identidad y patrimonios culturales",
        expertise_id: "Promoción de lectura",
        final_hour: "11:50",
        nac_id:"ALCALÁ",
        start_time:"00:00",
        status:'En Revisión'
      },
      {
        id:3,
        activity_date:"2023-06-25",
        activity_name: "Lenguaje de Señas",
        consecutive: "F3",
        cultural_right_id: "Cooperación cultural",
        expertise_id: "Juegos tradicionales",
        final_hour: "11:50",
        nac_id:"BUGA",
        start_time:"00:00",
        status:'En Revisión'
      },
      {
        id:4,
        activity_date:"2023-06-25",
        activity_name: "Lenguaje de Señas",
        consecutive: "F4",
        cultural_right_id: "Cooperación cultural",
        expertise_id: "Juegos tradicionales",
        final_hour: "11:50",
        nac_id:"ANSERMANUEVO",
        start_time:"00:00",
        status:'Aprobado'
      },
      {
        id:5,
        activity_date:"2023-06-25",
        activity_name: "Lenguaje de Señas",
        consecutive: "F4",
        cultural_right_id: "Información y comunicación",
        expertise_id: "Juegos tradicionales",
        final_hour: "11:50",
        nac_id:"BUENAVENTURA",
        start_time:"00:00",
        status:'Rechazado'
      }
     ]
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    addRecord(record) {
      this.records.push(record)
    },
  },
})

