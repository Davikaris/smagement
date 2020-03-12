<template>
    <div class="container">
        <div class="row mt-5">
        <div class="col-md-12">
          <div class="card ">
            <div class="card-header ">
              <h3 class="card-title ">Users List</h3>

              <div class="card-tools">
                <button class="btn btn-success" @click="newModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="card-body table-responsive no-padding">
              <table class="table table-hover">
                <tbody><tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Registered At</th>
                  <th>Modify</th>
                </tr>
                
                <tr v-for="user in users" :key="user.id" >
                  <td>{{user.id}}</td>
                  <td>{{user.name | upText}}</td>
                  <td>{{user.email }}</td>
                  <td>{{user.type|upText}}</td>
                  <td>{{user.created_at|myDate}}</td>
             
                  <td>
                     
                        <a href="#" @click="editModal(user)">
                            <i class="fa fa-edit blue"></i>
                        </a>
                        /
                        <a href="#" @click="deleteUser(user.id)">
                            <i class="fa fa-trash red"></i>
                        </a>
                  </td>
                 
                </tr>
                
                
              </tbody></table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
           <!-- Modal -->
                <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewlLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-show="!editmode" class="modal-title" id="addNewLabel">Add New User</h5>
                        <h5 v-show="editmode" class="modal-title" id="addNewLabel">Update User Info</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form @submit.prevent=" editmode ? updateUser() : createUser()">
                    <div class="modal-body">

            <div class="form-group">
                
                <input v-model="form.name" type="text" name="name"
                placeholder="Name"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                <has-error :form="form" field="name"></has-error>

                
                
            </div>
           
                
                <div class="form-group">
                
                <input v-model="form.email" type="email" name="email"
                placeholder="Email Address"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                <has-error :form="form" field="email"></has-error>
            </div>

             <div class="form-group">
                
                <textarea v-model="form.bio" type="text" name="bio"
                placeholder="Short bio for the user (optional)"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                </textarea>
                <has-error :form="form" field="bio"></has-error>
            </div>
                

           

            <div class="form-group">
                
                <select name="type" v-model="form.type" id="type"  class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                
                <option value="">Select User Role</option>
                <option value="Admin">Admin</option>
                <option value="Standard User">Standard User</option>
                <option value="Author">Author</option>
                </select>
                <has-error :form="form" field="type"></has-error>
            </div>

            
            <div class="form-group">
                <label>Password</label>
                <input v-model="form.password" type="password" name="password"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                <has-error :form="form" field="password"></has-error>
              </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button v-show="editmode" type="submit" class="btn btn-success">Update !</button>
                        <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
                        
                    </div>

                    </form>
                    </div>
                </div>
                </div>
         </div>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                user:{},
                 form: new Form({
                        editmode: true,
                        id:'',
                        name: '',
                        email: '',
                        password: '',
                        type: '',
                        bio:'',
                        photo:''

                 })   

            }  
        },

        methods: {
                    
                    
                 updateUser(){
                      this.$Progress.start();
                     this.form.put('api/user/'+this.form.id)
                     
                    .then(()=>{
                        //success
                        $('#addNew').modal('hide')

                        Swal.fire(
                                'Updated!',
                                'User information has been updated!.',
                                'success'
                                )
                         this.$Progress.finish();
                        Fire.$emit('AfterCreate');
                        setInterval(()=> this.loadUsers(),3000);
                    })
                    .catch(()=>{

                         this.$Progress.fail();
                         Swl("Failed!","There was something wrong.")
                    });
                },   
                editModal(user){
                 this.$Progress.start();     
                this.editmode = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);
            },
                newModal(){
                 this.editmode=false;   
                 this.form.reset();
                 $('#addNew').modal('show');

                },
            

            deleteUser(id){

                    Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        //send request to the server
                         this.$Progress.start();
                        this.form.delete('api/user/'+id).then(()=>{
                        
                                Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                                )
                    
                        })
                        
                        .catch(()=>{
                             this.$Progress.fail();
                            Swl("Failed!","There was something wrong.")
                        })

                   
                    })

            },


            loadUsers(){
                 this.$Progress.start();
                axios.get("api/user").then(({data})=>(this.users=data.data));
                
            },
             
            createUser(){
                this.$Progress.start();  
                this.form.post('api/user')

                //Start use error check

                    .then(()=>{
                           
                Fire.$emit('AfterCreate');//Event of creating Event user
                 
                $('#addNew').modal('hide')

                const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
                })
                    toast.fire({
                    icon: 'success',
                    title: 'User created successfully'
                })
                
                
               
                    })

                     .catch(()=>{
                          this.$Progress.fail();
                         //catching the error
                      

                     })   


                 
            }
        },
        created() {
            this.loadUsers();

            Fire.$on('AfterCreate',()=>{
                this.$Progress.start();  
                this.loadUsers();
            });//Listening to the event after create
            // setInterval(()=> this.loadUsers(),3000);  // sending request to the server after every 3 sec 
        }

        
    }
</script>
