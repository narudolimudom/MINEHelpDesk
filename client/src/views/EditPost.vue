<template>
  <v-contrainer>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Edit this Post</v-card-title>
          <v-divider></v-divider>
          <v-form
            ref="form"
            @submit.prevent="updateForm"
            class="pa-5"
            enctype="multipart/form-data"
          >
            <v-text-field
              label="Title"
              v-model="post.title"
              prepend-icon="mdi-note"
              :rules="rules"
            ></v-text-field>

            <v-textarea label="description"  prepend-icon="mdi-note-plus" v-model="post.description"  :rules="rules"></v-textarea>
                    <v-text-field label="fullname"  prepend-icon="mdi-note" v-model="post.fullname" :rules="rules"></v-text-field>
                    <v-text-field label="email"  prepend-icon="mdi-note" v-model="post.email" :rules="emailRules"></v-text-field>
                    <v-text-field label="phone"  prepend-icon="mdi-note" v-model="post.phone" :rules="rules"  type="number"></v-text-field>
            <v-img :src="`/${post.image}`" width="120"></v-img>
            <v-btn type="submit" class="mt-3" color="success"
              >Update Post</v-btn
            >
          </v-form>
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
      rules: [(value) => !!value || "This field is required!"],
             emailRules: [
                v => !!v || 'E-mail is required',
                 v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
      post: {
        title: "",
        category: "",
        content: "",
        image: "",
      },

      image: "",
    };
  },

  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async updateForm() {
      const formData = new FormData();
            formData.append('Title',this.post.title);
            formData.append('description',this.post.description);
            formData.append('fullname',this.post.fullname);
            formData.append('email',this.post.email);
            formData.append('phone',this.post.phone);
            console.log(this.post);
      if (this.$refs.form.validate()) {
        const response = await API.updatePost(this.$route.params.id, this.post);
        this.$router.push({
          name: "home",
          params: { message: response.message },
        });
      }
    },
  },
};
</script>



