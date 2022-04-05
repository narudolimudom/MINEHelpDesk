import axios from 'axios';
const url = '/api/post';

export default class API{
// to get all the posts from the server
static async getAllPost(){
    const res = await axios.get(url);
    return res.data;
}

// to get single post by id
static async getPostByID(id){
    const res = await axios.get(`${url}/${id}`);
    return res.data;
}

// to insert post into database
static async addPost(post){
    const res = await axios.post(url, post);
    return res.data;
}

// to update post into database
static async updatePost(id, post){
    const res = await axios.patch(`${url}/${id}`, post);
    return res.data;
}

// to delete a post
static async deletePost(id){
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
}

static async fetchBySort(sort){
    let id = null
    if(sort == 'Pending'){
        id = 1
    }else if(sort == 'Accepted'){
        id = 2
    }else if(sort == 'Resolved'){
        id = 3
    }
    else if(sort == 'Rejected'){
        id = 4
    }else if(sort == 'None'){
        const res= await axios.get(url)
        return res.data
    }
    const res= await axios.get(`${url}/sort/${id}`)
    return res.data
}


}