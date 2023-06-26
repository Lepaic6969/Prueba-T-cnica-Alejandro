<template>
    <form class="container" @submit.prevent="handleSubmit">
        <div class="left">
            <label class="label" for="activity_name">NOMBRE ACTIVIDAD *</label>
            <input class="input" :class="(!activity_name_ok)?'wrong-input':''"  type="text" id="activity_name" v-model="activity_name">
            <p class="user-help" v-if="!activity_name_ok">Por favor ingrese este campo</p>

            <label class="label" for="start-time">HORA INICIO *</label>
            <input class="input" :class="(!start_time_ok || !correct_hours)?'wrong-input':''" type="time" id="start-time" v-model="start_time">
            <p class="user-help" v-if="!start_time_ok">Por favor ingrese este campo</p>
            <p class="user-help" v-if="!correct_hours">Recuerde que la hora inicial debe ser inferior a la hora final</p>

            <label class="label" for="cultural rights">Derechos culturales *</label>
            <Select :data="cultural_rights" title="seleccione" :class="(!cultural_right_id_ok)?'wrong-input':''" id="cultural rights"  v-model="cultural_right_id"/>
            <p class="user-help" v-if="!cultural_right_id_ok">Por favor ingrese este campo</p>

            <label class="label" for="experience">EXPERTICIA *</label>
            <Select :data="expertises" title="seleccione" :class="(!expertise_id_ok)?'wrong-input':''" id="experience" v-model="expertise_id"/>
            <p class="user-help" v-if="!expertise_id_ok">Por favor ingrese este campo</p>
        </div>
        <div class="right">
            <label class="label" for="date">FECHA *</label>
            <input class="input" :class="(!activity_date_ok)?'wrong-input':''" type="date" id="date" v-model="activity_date">
            <p class="user-help" v-if="!activity_date_ok">Por favor ingrese este campo</p>

            <label class="label" for="final-time">HORA FINAL *</label>
            <input class="input" :class="(!final_hour_ok || !correct_hours)?'wrong-input':''" type="time" id="final-time" v-model="final_hour">
            <p class="user-help" v-if="!final_hour_ok">Por favor ingrese este campo</p>
            <p class="user-help" v-if="!correct_hours">Recuerde que la hora inicial debe ser inferior a la hora final</p>

            <label class="label" for="nac">NAC *</label>
            <Select :data="nacs" title="seleccione" :class="(!nac_id_ok)?'wrong-input':''" id="nac"  v-model="nac_id"/>
            <p class="user-help" v-if="!nac_id_ok">Por favor ingrese este campo</p>

            <button class="btn-save">Guardar</button>
        </div>
    </form>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import Swal from 'sweetalert2'
import {storeToRefs} from 'pinia'
import {expertises,cultural_rights,nacs} from '../assets/data-selects'
import {useRecordsStore} from '../stores/records'

const recordsStore=useRecordsStore()
const {addRecord}=recordsStore
const {records}=storeToRefs(recordsStore)


export default {
    components:{
        Select:defineAsyncComponent(()=>import('./SelectComponent.vue'))
    },
    data(){
        return {
            expertises,
            cultural_rights,
            nacs,

            //Variables ligadas al form
            activity_name:null,
            start_time:null,
            cultural_right_id:null,
            expertise_id:null,
            activity_date:null,
            final_hour:null,
            nac_id:null,

            //Variables para la validación del form y la ayuda visual al usuario.
            activity_name_ok:true,
            start_time_ok:true,
            cultural_right_id_ok:true,
            expertise_id_ok:true,
            activity_date_ok:true,
            final_hour_ok:true,
            nac_id_ok:true,
            correct_hours:true,

            records, //Variable que viene desde pinia
        }
    },
    methods:{
        validateData(){
            let flag=true //Si pasa todas las validaciones quedará en verdadero
            let correctTime=true
            if(!this.activity_name){
                this.activity_name_ok=false
                flag=false
            }
            if(!this.start_time){
                this.start_time_ok=false
                flag=false
            }
            if(!this.cultural_right_id){
                this.cultural_right_id_ok=false
                flag=false
            }
            if(!this.expertise_id){
                this.expertise_id_ok=false
                flag=false
            }
            if(!this.activity_date){
                this.activity_date_ok=false
                flag=false
            }
            if(!this.final_hour){
                this.final_hour_ok=false
                flag=false
            }
            if(!this.nac_id){
                this.nac_id_ok=false
                flag=false
            }

            if(this.start_time && this.final_hour){
                correctTime=this.validateTime()
            }
            return flag&&correctTime
        },
        timeFormat(time) {
            let hourArray = time.split(':');
            let hour = parseInt(hourArray[0]);
            let minutes = parseInt(hourArray[1]);

            if (time.toLowerCase().includes('pm') && hour !== 12) {
                hour += 12;
            } else if (time.toLowerCase().includes('am') && hour === 12) {
                hour = 0;
            }

            return hour * 60 + minutes;
        },
        validateTime(){
            let flag=true

            let horaInicio24 = this.timeFormat(this.start_time);
            let horaFin24 = this.timeFormat(this.final_hour);

            if (horaInicio24 >= horaFin24) {
                this.correct_hours=false
                flag=false
            }
            return flag
        },
        generateConsecutive(){
            let number=this.records[this.records.length-1].id //Este número debe provenir de una base de datos o algo por el estilo
            number++
            const id=number
            return [`F${number}`,id]
        },
        resetOk(){
            this.activity_name_ok=true
            this.start_time_ok=true
            this.cultural_right_id_ok=true
            this.expertise_id_ok=true
            this.activity_date_ok=true
            this.final_hour_ok=true
            this.nac_id_ok=true
            this.correct_hours=true
        },
        resetForm(){
            this.activity_name=null
            this.start_time=null
            this.cultural_right_id=null
            this.expertise_id=null
            this.activity_date=null
            this.final_hour=null
            this.nac_id=null
        },
        handleSubmit(){
            this.resetOk()
            const flag=this.validateData()
            if(flag){
                const data={
                    activity_name:this.activity_name,
                    start_time:this.start_time,
                    cultural_right_id:this.cultural_right_id,
                    expertise_id:this.expertise_id,
                    activity_date:this.activity_date,
                    final_hour:this.final_hour,
                    nac_id:this.nac_id,
                    status:'En Revisión'
                }
                const[consecutive,id]=this.generateConsecutive()
                data['consecutive']=consecutive
                data['id']=id

                addRecord(data)
                this.resetForm()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se ha guardado correctamente su información',
                    showConfirmButton: false,
                    timer: 2500
                })
            }else{
                return
            }
        },

    },
    computed:{
      
    },
    mounted(){

    }
}
</script>

<style scoped>
    .container{
        width: 90%;
        margin: 20px;
        margin-top:30px;
        margin-bottom: 70px;
        display:flex;
        justify-content: space-between;
        overflow-x: hidden;
        border:1px solid rgb(38,146,253);
        padding: 50px;
        border-radius: 10px;
    }
    .left,.right{
        width: 40%;
        display:flex;
        flex-direction: column;
    }
    .label{
        font-weight: bold;
    }
    .input{
        padding: 5px 0;
        border:1px solid rgb(38,146,253);
        margin-bottom: 10px;
        filter: drop-shadow(0px 0px 2px rgba(227, 244, 235, 0.5));
    }
    .wrong-input{
        border:1px solid red;
    }
    .btn-save{
        background-color: RGB(97,187,209);
        width: 30%;
        padding: 10px;
        color:white;
        font-size:22px;
        font-weight: bold;
        border:1px solid white;
        border-radius:10px;
        align-self: flex-end;
        cursor:pointer;
    }
    .btn-save:hover{
        background-color:rgb(26,115,232) ;
    }
    .user-help{
        margin: 0;
        margin-top:-10px;
        margin-bottom: 10px;
        color:red;
        font-size: 14px;
    }
</style>