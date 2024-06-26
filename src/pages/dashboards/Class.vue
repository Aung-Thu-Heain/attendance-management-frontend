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
              Create class
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
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

    <template v-slot:item.permissions="{ item }">
      <v-chip
        v-for="ite in item.permissions"
        :key="ite.id"
        class="ma-1"
        color="green"
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
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useClassStore } from "@/stores/class";

const classStore = useClassStore();

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
  { title: "Actions", key: "actions", sortable: false },
]);
const desserts = computed(() => classStore.getClass);
const editedIndex = ref(-1);
const editedItem = ref({
  id: 0,
  name: "",
});
const defaultItem = ref({
  id: "",
  name: "",
});

onMounted(() => {
  initialize();
});

async function initialize() {
  classStore.getClassFun();
}

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Create class" : "Edit class";
});

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
  classStore.deleteClassFun(editedItem.value.id);
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
    classStore.updateClassFun(editedItem.value.id, editedItem.value);
  } else {
    editedItem.value.id = desserts.value.length + 1;
    desserts.value.push(editedItem.value);
    classStore.createClassFun(editedItem.value);
  }
  close();
}

watch(dialog, (val) => {
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
