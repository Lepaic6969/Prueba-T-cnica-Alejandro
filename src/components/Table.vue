<template>
  <div class="table-container">
   
    
    <div class="select-container">
      <div class="input-container">
        <label for="buscar">Buscar: </label>
        <input type="text" id="buscar" placeholder="Busqueda por nombre     🔍" v-model="nombre">
      </div>
      <Select :data="cultural_rights" :allOption="true" title="Derecho Cultural" v-model="cultural"/>
      <Select :data="nacs" :allOption="true" title="Nac" v-model="nacionalidad"/>
      <Select :data="expertises" :allOption="true" title="Experiencia" v-model="experiencia"/>
      <div class="select-container">
        <label for="entradas">Entradas: </label>
        <select  class="entradas" v-model="entradas">
          <option :value="1" selected >1</option>
          <option :value="3" selected >3</option>
          <option :value="5" selected >5</option>
          <option :value="10" selected >10</option>
        </select>
      </div>
      <div class="select-container">
        <label for="entradas">Estado: </label>
        <select  class="entradas" v-model="estado">
          <option :value="null" selected>Todos</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Rechazado">Rechazado</option>
          <option value="En Revisión">En Revisión</option>
        </select>
      </div>
    </div>
    <div class="date-container">
      <div>
        <label for="inicial">Fecha Inicial:</label>
        <input class="entradas" type="date" id="inicial" v-model="inicial">
        <label for="final">Fecha Final:</label>
        <input class="entradas" type="date" id="final" v-model="final">
      </div>
      <div class="btn-container">
        <button class="btn-export pdf" @click="handlePDF">Exportar PDF</button>
        <button class="btn-export" @click="handleXLS">Exportar XLS</button>
      </div>
     
    </div>
    <table class="tabla" id="tabla">
    <thead>
      <tr>
        <th>ID TABLE</th>
        <th>CONSECUTIVO</th>
        <th>NOMBRE</th>
        <th>DERECHO CULTURAL</th>
        <th>NAC</th>
        <th>FECHA</th>
        <th>HORA INICIO</th>
        <th>HORA FINAL</th>
        <th>EXPERTICIA</th>
        <th>ESTADO</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="record in leakedRecords" :key="record.id">
          <td>{{ record.id }}</td>
          <td>{{ record.consecutive }}</td>
          <td>{{ record.activity_name }}</td>
          <td>{{ record.cultural_right_id }}</td>
          <td>{{ record.nac_id }}</td>
          <td>{{ record.activity_date }}</td>
          <td>{{ record.start_time }}</td>
          <td>{{ record.final_hour }}</td>
          <td>{{ record.expertise_id }}</td>
          <td>{{ record.status }}</td>
      </tr>
      <tr v-if="leakedRecords.length===0">
        <td colspan="10">
          Sin Registros para las especificaciones ingresadas...
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import exportFromJSON from 'export-from-json'

import {defineAsyncComponent} from 'vue'
import {expertises,cultural_rights,nacs} from '../assets/data-selects'
import {storeToRefs} from 'pinia'
import {useRecordsStore} from '../stores/records'
const recordsStore=useRecordsStore()
const {records}=storeToRefs(recordsStore)

export default {
  components:{
    Select:defineAsyncComponent(()=>import('../components/SelectComponent.vue'))
  },
  data(){
    return {
        records,
        leakedRecords:[],
        //Variables para los select
        expertises,
        cultural_rights,
        nacs,
        //Variables para los filtros de búsqueda
        experiencia:null,
        cultural:null,
        nacionalidad:null,
        nombre:null,
        entradas:10,
        estado:null,
        inicial:null,
        final:null
    }
  },
  methods:{
    filterRecords(){
      this.leakedRecords=this.records
      if(this.experiencia){
        this.leakedRecords=this.leakedRecords.filter(record=>record.expertise_id===this.experiencia)
      }
      if(this.cultural){
        this.leakedRecords=this.leakedRecords.filter(record=>record.cultural_right_id===this.cultural)
      }
      if(this.nacionalidad){
        this.leakedRecords=this.leakedRecords.filter(record=>record.nac_id===this.nacionalidad)
      }
      if(this.nombre){
        this.leakedRecords=this.leakedRecords.filter(record=>record.activity_name.toLowerCase().includes(this.nombre.toLowerCase()))
      }
      if(this.estado){
        this.leakedRecords=this.leakedRecords.filter(record=>record.status===this.estado)
      }
      if(this.inicial&&this.final){
        this.leakedRecords=this.leakedRecords.filter(record=>(new Date(record.activity_date).getTime()>=new Date(this.inicial).getTime() && new Date(record.activity_date).getTime()<=new Date(this.final).getTime()))
      }
      this.leakedRecords=this.leakedRecords.slice(0,this.entradas)
    },
    handlePDF(){
      const doc = new jsPDF();
      const tablaHTML=document.getElementById('tabla');
      html2canvas(tablaHTML).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 180; // Anchura de la imagen en mm (ajusta según tus necesidades)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula la altura proporcional
      doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      doc.save('tabla.pdf');
      });
    },
    handleXLS(){
      const data = this.leakedRecords
      const fileName = 'tabla'
      const exportType =  exportFromJSON.types.xls
      exportFromJSON({ data, fileName, exportType })
    }
  },
  watch:{
    experiencia(newExp,oldExp){
      this.filterRecords()
    },
    cultural(){
      this.filterRecords()
    },
    nacionalidad(){
      this.filterRecords()
    },
    nombre(){
      this.filterRecords()
    },
    entradas(){
      this.filterRecords()
    },
    estado(){
      this.filterRecords()
    },
    inicial(){
      this.filterRecords()
    },
    final(){
      this.filterRecords()
    }
  },
  mounted(){
    this.filterRecords()
  }
}
</script>

<style scoped>
.table-container{
  min-height: 500px;
}
.tabla {
  width: 98%;
  border-collapse: collapse;
  background-color: #ffffff;
  margin:0 auto;
  margin-bottom: 10px;
}

.tabla th,
.tabla td {
  border: 1px solid #dddddd;
  padding: 8px;
}

.tabla th {
  background-color: #f2f2f2;
}
.select-container{
  display:flex;
  align-items: flex-start;
  gap:10px;
  width:50%;
  margin-left: 13px;
  margin-bottom: 10px;
  /* border:1px solid black; */
}
.input-container{
  display: flex;
  align-items: flex-start;
  gap:5px;
}
.input-container input{
  padding: 5px;
}
.select-container{
  display:flex;

}
.entradas{
  padding: 5px 0;
  border:1px solid rgb(38,146,253);
  margin-bottom: 10px;
  filter: drop-shadow(0px 0px 2px rgba(227, 244, 235, 0.5));
}

.date-container{
  display:flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-left: 10px;
}
.date-container label{
  margin-right: 5px;
  margin-left: 5px;
}
.btn-export{
  padding: 5px 10px;
  cursor:pointer;
  background-color: rgb(38,166,154);
  color:white;
  border-color:white;
}
.pdf{
  background-color: rgb(232,0,18);
}
.btn-export:hover{
  border-color:black;
}
.btn-container{
  margin-right: 20px;
  display:flex;
  align-items: center;
  gap:10px;
}

</style>