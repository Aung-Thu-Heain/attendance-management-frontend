<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    class="pa-5"
    :sort-by="[{ key: 'id', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
          class="search_box"
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              <span class="mdi mdi-plus"></span>
              Create user
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                      :rules="[required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      :rules="mailValidate"
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="editedItem.password"
                      type="password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-select
                      v-model="editedItem.classroom"
                      :items="classroomsList"
                      item-title="name"
                      item-value="id"
                      label="Class"
                    ></v-select>
                  </v-col>
                  <v-col cols="6" md="6" sm="6">
                    <v-select
                      v-model="editedItem.roles"
                      :items="rolesList"
                      item-title="name"
                      item-value="id"
                      label="Role"
                      chips
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="editedItem.fatherName"
                      label="Father's name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="editedItem.dob"
                      label="Date of birth"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="editedItem.contactNumber"
                      label="Contact number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="editedItem.nrcNumber"
                      label="NRC number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6" v-if="editedItem.roles == 2">
                    <v-text-field
                      v-model="editedItem.education"
                      label="Education"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6" v-if="editedItem.roles == 2">
                    <v-text-field
                      v-model="editedItem.startDate"
                      label="Start date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6" v-if="editedItem.roles == 3">
                    <v-text-field
                      v-model="editedItem.rollNumber"
                      label="Roll number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.classroom="{ item }">
      <v-chip color="green" class="ma-1">
        {{ item.classroom.name }}
      </v-chip>
    </template>

    <template v-slot:item.roles="{ item }">
      <v-chip
        v-for="ite in item.roles"
        :key="ite.id"
        color="green"
        class="ma-1"
      >
        {{ ite.name }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" class="me-2" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
      <v-icon size="small"> mdi-eye-circle-outline </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import axios from "axios";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import {useUserStore} from '@/stores/user';
const token = localStorage.getItem("token");
const classroomsList = ref([]);
const rolesList = ref([]);
const dialog = ref(false);
const search = ref("");
const dialogDelete = ref(false);
const userStore = useUserStore();
const headers = ref([
  {
    title: "Id",
    align: "start",
    key: "id",
  },
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Classroom", key: "classroom" },
  { title: "Role", key: "roles" },
  { title: "Actions", key: "actions", sortable: false },
]);
const desserts = computed(()=>userStore.getUsers);
const editedIndex = ref(-1);
const editedItem = ref({
  id: 0,
  name: "",
  email: "",
  password: "",
  roles: [],
  classroom: "",

  fatherName: "",
  dob: "",
  contactNumber: "",
  nrcNumber: "",

  education: "",
  startDate: "",

  rollNumber: "",
});

const defaultItem = ref({
  id: "",
  name: "",
  email: "",
  password: "",
  roles: [],
  classroom: "",

  fatherName: "",
  dob: "",
  contactNumber: "",
  nrcNumber: "",

  education: "",
  startDate: "",

  rollNumber: "",
});

onMounted(() => {
  getAllClassrooms();
  getAllRoles();
  initialize();
});

const mailValidate = [
  (value) => !!value || "Required.",
  (value) => (value || "").length <= 30 || "Max 30 characters",
  (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
];

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Create user" : "Edit user";
});

async function initialize() {
  await userStore.getUsersFun();
}

const getAllClassrooms = async () => {
  const response = await axios.get("http://attendanceBe.test/api/classrooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let classArray = response.data.classrooms.map((item) => item.name);

  classroomsList.value = response.data.classrooms;
};

const getAllRoles = async () => {
  const response = await axios.get("http://attendanceBe.test/api/roles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let rolesArray = response.data.roles.map((item) => item.name);

  rolesList.value = response.data.roles;
};

function editItem(item) {
  editedIndex.value = desserts.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function deleteItem(item) {
  editedIndex.value = desserts.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
  console.log(item);
}

function deleteItemConfirm() {
  userDelete(editedItem.value.id);
  desserts.value.splice(editedIndex.value, 1);
  closeDelete();
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

function save() {
  if (editedIndex.value > -1) {
    Object.assign(desserts.value[editedIndex.value], editedItem.value);
  } else {
    editedItem.value.id = desserts.value.length + 1;
    desserts.value.push(editedItem.value);
    userCreate(editedItem.value);
  }
  close();
}

watch(dialog, (val) => {
  console.log("dialog watch", val);
  val || close();
});

watch(dialogDelete, (val) => {
  val || closeDelete();
});

let required = (v) => {
  return !!v || "Field is required";
};

async function userCreate(user) {
  const response = await axios.post(
    "http://attendanceBe.test/api/users/create",
    user,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("ddd", response.data);
}

async function userDelete(id) {
  const response = await axios.delete(
    "http://attendaceBe.test/api/users/delete/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response.data.message);
}
</script>

<style>
.search_box .v-field__field {
  height: 38px;
}
.search_box .v-field--center-affix {
  margin: 5px;
}
.search_box .v-field__input {
  top: -25%;
}
</style>
