<template>
  <v-data-table :headers="headers" :items="cities" sort-by="id" :sort-desc="true" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cities</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New City</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="editedItem.valid">
                  <v-row>
                    <v-col cols="2" sm="2" md="2"><v-text-field disabled :value="editedItem.id" label="Id"></v-text-field></v-col>
                    <v-col cols="5" sm="5" md="5"><v-text-field v-model="editedItem.name_ua" :rules="[rules.required]" label="Name UA"></v-text-field></v-col>
                    <v-col cols="5" sm="5" md="5"><v-text-field v-model="editedItem.name_en" :rules="[rules.required]" label="Name EN"></v-text-field></v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="save">{{ formSaveButtonTitle }}</v-btn>
              <v-btn color="secondary" @click="close">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6">Are you sure you want to delete this City?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="deleteItemConfirm">Delete</v-btn>
              <v-btn color="secondary" @click="closeDelete">Cancel</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
const defaultItem = {
  id: null,
  name: null,
  valid: false
}

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Id', value: 'id', align: 'start'},
      { text: 'Name UA', value: 'name_ua'},
      { text: 'Name EN', value: 'name_en'},
      { text: '', value: 'actions' },
    ],
    items: [],
    rules: {
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      required: v => !!v || 'This field is required',
    },      
    dateMenu: false,
    editedIndex: -1,
    editedItem: Object.assign({}, defaultItem),
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New City' : 'Edit City'
    },
    formSaveButtonTitle () {
      return this.editedIndex === -1 ? 'Create' : 'Update'
    },
    cities(){
      return this.$store.getters.cities
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.$store.dispatch("reloadCities")
    },

    editItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = item.id
      this.editedItem = item
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$store.dispatch("deleteCity", this.editedIndex)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, defaultItem),
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, defaultItem),
        this.editedIndex = -1
      })
    },

    save() {
      this.$refs.form.validate()
      if (this.editedItem.valid) {
        if (this.editedIndex > -1) {
          this.$store.dispatch("editCity", this.editedItem)
        } else {
          this.$store.dispatch("createCity", this.editedItem)
        }
        this.close()
      }
    },
  },
}
</script>