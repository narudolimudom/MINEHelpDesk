<template>
  <v-contrainer>
    <v-row>
      <v-col sm="10" class="pa-4 mx-auto">
        <v-card class="pa-2">
          <v-card-actions class="pb-0">
            <v-row class="mt-1 mx-1">
              <v-col sm="2">
                <v-btn small outlined color="primary">{{
                  post.status
                }}</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline">
            <h3>{{ post.title }}</h3>
          </v-card-subtitle>
          <v-card-text class="grey--text">
            <p>{{ post.description }}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col class="col-auto mr-auto">
          <v-card-subtitle >
            <h3>Contact</h3>
          </v-card-subtitle>
          <v-card-text class="grey--text">
            <p>{{"Name:  "+post.fullname}}</p>
            <p>{{"Email:  "+post.email}}</p>
            <p>{{"Phone:  "+post.phone}}</p>
          </v-card-text>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="col-auto">
 <v-card-text class="timestamp grey--text">
            <p>{{"Created at "+ timeformat(post.createdAt) }}</p>
            <p>{{"Updated at "+timeformat(post.updatedAt)}}</p>
          </v-card-text>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <br>
            <v-row>
              <v-col class=" mr-auto">
                <h3 class="ml-3">Status :</h3>
              </v-col>
            <v-col class="select-field" cols="3">
                <v-select
          v-model="ansStatus"
          :items="ticketSortBy"
          menu-props="auto"
          label="Select"
          hide-details
          color="#e81d76"
          prepend-icon="mdi-map"
          single-line
        ></v-select>
              </v-col>        
              <v-col class="col-auto">
               <v-btn @click="confirm()" type="submit" color="success">Comfirm</v-btn>
              </v-col>
            </v-row>
          </v-container>

  
        </v-card>
      </v-col>
    </v-row>
  </v-contrainer>
</template>

<script>
import API from "../api";
export default {
  data() {
    return {
      post: {},
      ticketSortBy:[
         'pending','accepted', 'resolved', 'rejected'
      ],
      ansStatus: null
    }
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
    this.ansStatus = this.post.status
  },
  methods:{
    timeformat(time){
    let date = time.substr(0, 10)
    let resultTime = time.substr(11, 8)
    let arrtime = resultTime.split(":")
    let hour = parseInt(arrtime[0])+7
    resultTime = hour + ":" + arrtime[1] + ":" + arrtime[2]
    let result = date + " " + resultTime
    console.log(date);
    console.log(result)
     return result

    },

   async confirm(){
        this.post.status = this.ansStatus
        const response = await API.updatePost(this.$route.params.id, this.post);
          this.$router.push({
          name: "admin",
          params: { message: response.message },
        });
    }
  },

};
</script>
<style scoped>
.timestamp{
  font-size: 12px;
  line-height: 3px;
  margin-top: 7rem;
}
.select-field{
  margin-top: -1rem;
}
</style>
