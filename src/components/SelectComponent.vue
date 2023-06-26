<template>
   
    <select class="form-select"  v-model="reactiveVariable">
        <option :value="null" selected disabled>{{ title }}</option>
        <option v-if="allOption" :value="null">Todos</option>
        <template v-for="item in data" :key="item.id" >
            <option :value="item.name" >{{item.name}}</option>
        </template> 
    </select>
</template>

<script>
    export default {
        props:{
            data:{
                type:Array,
                required:true
            },
            title:{
                type:String,
                default:''
            },
            allOption:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
               reactiveVariable:null,
            }
        },
        watch:{
            reactiveVariable(newReactiveVariable){
             this.$emit('input',newReactiveVariable)
           }
        }
            
        
    }
</script>

<style>
    .form-select{
        padding: 5px 0;
        border:1px solid rgb(38,146,253);
        margin-bottom: 10px;
        filter: drop-shadow(0px 0px 2px rgba(227, 244, 235, 0.5));
    }
</style>