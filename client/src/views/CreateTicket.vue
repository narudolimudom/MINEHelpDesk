<template>
    <v-contrainer>
        <v-alert dismissible v-if="this.$route.params.message" border="left" close-text="Close Alert" dark color="green accent-4"></v-alert>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Create New Ticket</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                    <v-text-field color="#e81d76" label="Title"  prepend-icon="mdi-note" v-model="post.title" :rules="rules"></v-text-field>
                    <v-textarea  color="#e81d76" label="description"  prepend-icon="mdi-note-plus" v-model="post.description"  :rules="rules"></v-textarea>
                    <v-text-field color="#e81d76"  label="fullname"  prepend-icon="mdi-note" v-model="post.fullname" :rules="rules"></v-text-field>
                    <v-text-field  color="#e81d76" label="email"  prepend-icon="mdi-note" v-model="post.email" :rules="emailRules"></v-text-field>
                    <v-text-field color="#e81d76" label="phone"  prepend-icon="mdi-note" v-model="post.phone" :rules="rules"  type="number"  ></v-text-field>
                    <v-btn  type="submit" class="mt-3" color="#e81d76">Create Ticket</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-contrainer>
</template>

<script>
import API from '../api'
export default {
    name: 'createTicket',
    data(){
        return{
            rules: [(value) => !!value || "This field is required!"],
             emailRules: [
                v => !!v || 'E-mail is required',
                 v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            post:{
                title: "",
                description: "", 
                status: "pending",
                fullname: "",
                email: "",
                phone: "",
                createdtime: new Date().getTime(),
            }
        }
    },
    methods:{
        async submitForm(){
            const formData = new FormData();
            formData.append('Title',this.post.title);
            formData.append('description',this.post.description);
            formData.append('fullname',this.post.fullname);
            formData.append('email',this.post.email);
            formData.append('phone',this.post.phone);
            console.log(formData);
            // formData.append('createdtime',this.post.createdtime);
            if (this.$refs.form.validate()) {
              const response =   await API.addPost(this.post);
                this.$router.push({name: 'home', params: {message: response.message}})
            }
                
            
        }
    }

}
</script>

<style>

</style>