<template>
 <div>
     <v-container >
    <v-row align="end">
      <v-col cols="12" xs="12" sm="6" class="menu">
        <p>Sort By</p>
        <v-select
          v-model="e1"
          @change="sortBy(e1)"
          :items="ticketSortBy"
          menu-props="auto"
          label="Select"
          hide-details
          color="#e81d76"
          prepend-icon="mdi-map"
          single-line
        ></v-select>
      </v-col>
      <v-col cols="12"  xs="12" sm="6" class="menu">
        <p>Filter</p>
        <v-select
          v-model="e2"
          @change="filterTicket(e2)"
          :items="ticketFilter"
          menu-props="auto"
          label="Select"
          hide-details
          color="#e81d76"
          prepend-icon="mdi-map"
          single-line
        ></v-select>
      </v-col>
          </v-row>
  </v-container>
   <v-container class="">
     <v-row no-gutters  class=" ">

              <v-col  sm="12" cols="0">
         <v-card elevation="0 " class="ticket ml-2  d-none d-sm-flex d-md-flex" color="#e81d76">
           <v-row> 
             <v-col  sm="2" cols="3"><v-card-text class="head-table">Status</v-card-text>  </v-col>
             <v-col  sm="4" cols="3"><v-card-text class="head-table">Ticket Name</v-card-text></v-col>
              <v-col  sm="3" cols="3"><v-card-text class="head-table">Author</v-card-text>  </v-col>
             <v-col  sm="3" cols="3"><v-card-text class="head-table">Created Time</v-card-text></v-col>
           </v-row>
           </v-card >
          </v-col >

          
       <v-col  sm="12">
         <v-card   class="ticket" v-for="ticket in posts" :key="ticket._id" :to="{name:'post',params:{id:ticket._id}}">
           <v-row>
             <v-col sm="2" cols="2">
               <v-btn  class="ml-4 mt-3" small outlined color="indigo">{{ticket.status}}</v-btn>
             </v-col>
             <v-col sm="4" cols="12"><p class="ticket-name">{{Cuttext(ticket.title)}}</p></v-col>
             <v-col sm="3" cols="6"><v-card-text>{{ticket.fullname}}</v-card-text>  </v-col>
             <v-col sm="3" cols="12"><v-card-text>{{timeformat(ticket.createdAt)}}</v-card-text></v-col>
           </v-row>
           </v-card >
          </v-col >


     </v-row>
   </v-container>
 </div>
</template>

<script>
 import API from '../api'
  export default {
    name: 'Home',

    data(){
      return{
        posts : [],
        ticketSortBy :[
          'None','pending', 'accepted', 'resolved', 'rejected','created time','updated time'
        ],
        ticketFilter :[
          'None','Pending', 'Accepted', 'Resolved', 'Rejected'
        ],
        e1: 'None',
        e2: 'None'
      }
    },
    async created(){
      this.posts = await API.getAllPost();
      
    },
    methods:{
         timeformat(time){
    let date = time.substr(0, 10)
    let resultTime = time.substr(11, 8)
    let arrtime = resultTime.split(":")
    let hour = parseInt(arrtime[0])+7
    resultTime = hour + ":" + arrtime[1] + ":" + arrtime[2]
    let result = date + " " + resultTime
     return result
    },
   async sortBy(e){
     this.e2 = 'None'
    this.posts = await API.getAllPost()
    if(e == 'created time'){
      this.posts = this.posts.sort((a,b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    }else if(e == 'updated time'){
      this.posts = this.posts.sort((a,b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      })

    }
    else{
    let result = []
    let group1 = (this.posts.filter(post => post.status == e))
    let group2 = (this.posts.filter(post => post.status !== e))
    result = [...group1, ...group2]
    this.posts =result
    }
    },

    async filterTicket(e){
      this.e1 = 'None'
      let result = await API.fetchBySort(e)
      this.posts = result
      console.log(this.posts);
    },
    Cuttext(text){
      if(text.length > 28){
        return text.substr(0,28) + "..."
    }else{
      return text
    }
    }
    }
    
  }


</script>

<style scoped>

.addb{
  border: red solid 2px;
}
.ticket{
  display: flex;
  margin-bottom: 0.5rem;
}
.ticket-name{
  /* font-size: 20px; */
  font-weight: bold;
  margin-top: 0.8rem;
  /* margin-right: 2rem; */
  margin-left: 1rem;
}

.menu{
  display: flex;
  justify-content: center;
}
.menu p{
  margin-top: 1.3rem;
  margin-right: 2rem;
}

.head-table{
  font-weight: bold;
  font-size: 20px;
}

.menu-box{
  border: red 2px solid;
}

</style>
