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
              <v-col sm="10" class="d-flex justify-end">
                <v-btn color="success" text :to="{name: 'edit-post', params: {id: post._id}}" >Edit</v-btn>
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
      post: {}
    }
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
  },
  methods:{
    async removePost(id){
      const response = await API.deletePost(id);
      this.$router.push({name: 'home', params: {message: response.message}})
    },
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
</style>
