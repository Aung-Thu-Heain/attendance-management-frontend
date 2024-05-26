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
                    <v-select
                      v-model="editedItem.classroom"
                      :items="classroomsList"
                      label="Class"
                    ></v-select>
                  </v-col>
                  <v-col cols="6" md="6" sm="6">
                    <v-select
                      v-model="editedItem.roles"
                      :items="rolesList"
                      label="Role"
                      chips
                      multiple
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
                  <v-col
                    cols="12"
                    md="6"
                    sm="6"
                    v-if="editedItem.roles.includes('teacher')"
                  >
                    <v-text-field
                      v-model="editedItem.education"
                      label="Education"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    sm="6"
                    v-if="editedItem.roles.includes('teacher')"
                  >
                    <v-text-field
                      v-model="editedItem.startDate"
                      label="Start date"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    sm="6"
                    v-if="editedItem.roles.includes('student')"
                  >
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

    <template v-slot:item.roles="{ item }">
      <v-chip
        v-for="ite in item.roles"
        :key="ite.id"
        color="green"
        class="ma-1"
      >
        {{ ite }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import axios from "axios";
import { computed, nextTick, onMounted, ref, watch } from "vue";

const token = "1|eiHeVA4G97q274dEEYx8cXoRJkSUKyLMp0CuoHu2d1d45d8e";
const classroomsList = ref([]);
const rolesList = ref([]);
const dialog = ref(false);
const search = ref("");
const dialogDelete = ref(false);
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
const desserts = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  id: 0,
  name: "",
  email: "",
  roles: [],
  classroom: "Kindergarten",

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
  roles: [],
  classroom: "Kindergarten",

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
  (value) => (value || "").length <= 20 || "Max 20 characters",
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
  const response = await axios.get("http://attendanceBe.test/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  desserts.value = response.data.users;
}

const getAllClassrooms = async () => {
  const response = await axios.get("http://attendanceBe.test/api/classrooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let classArray = response.data.classrooms.map((item) => item.name);

  classroomsList.value = classArray;
};

const getAllRoles = async () => {
  const response = await axios.get("http://attendanceBe.test/api/roles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let rolesArray = response.data.roles.map((item) => item.name);

  rolesList.value = rolesArray;
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
}

function deleteItemConfirm() {
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
    desserts.value.push(editedItem.value);
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
