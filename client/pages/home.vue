<template>
  <!-- <Loading v-if="$fetchState.pending" />
  <div data-app v-else> -->
  <div>
    <v-alert
      dark
      :value="alert.show"
      dismissible
      elevation="2"
      :type="alert.type"
      >{{ alert.message }}</v-alert
    >
    <v-data-table
      class="usertable elevation-2"
      ref="myTable"
      :headers="header_users"
      :items="users"
      item-key="_id"
      :loading="loading"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      show-expand
      :single-expand="true"
      :expanded.sync="expanded"
      @page-count="pageCount = $event"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-data-table
            flat
            dense
            class="usertable mb-8 elevation-0"
            ref="myTable"
            :headers="header_extra_info_users"
            :items="[item]"
            item-key="_id"
            hide-default-footer
          ></v-data-table>
        </td>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="pa-5">User admin</v-toolbar-title>
          <v-text-field
            class="pa-10"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-card-actions class="pa-10">
            <div class="container fluid">
              <v-row>
                <v-btn
                  title="Create new user"
                  color="primary"
                  elevation="2"
                  @click="addItem"
                >
                  Add user
                </v-btn>
              </v-row>
            </div>
          </v-card-actions>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-row>
          <v-col>
            <v-icon title="Edit user" @click="editItem(item)">
              mdi-pencil-outline
            </v-icon>
          </v-col>
          <v-col>
            <v-icon
              title="Delete user"
              color="primary"
              @click="deleteItem(item)"
            >
              mdi-delete-outline
            </v-icon>
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.data-table-expand`]="{ item, isExpanded }">
        <v-icon
          title="Extra info user"
          @click="handleExpansion(item, isExpanded)"
          >{{ isExpanded ? "mdi-minus" : "mdi-plus" }}</v-icon
        >
      </template>
    </v-data-table>
    <v-dialog v-model="dialogCreate" max-width="800px">
      <v-card class="pa-6">
        <CreateUser
          :editedItem="editedItem"
          @submit-form="createUser"
          @close-modal="dialogCreate = false"
        />
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" max-width="800px">
      <v-card class="pa-6">
        <Edituser
          :editedItem="editedItem"
          @submit-form="editUser"
          @close-modal="dialogEdit = false"
        />
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="800px">
      <v-card class="pa-4">
        <v-card-title class="text-h5"
          >Are you sure you want to delete {{ editedItem.email }}?</v-card-title
        >
        <v-card-actions>
          <v-row>
            <v-col class="mr-2" align="right">
              <v-btn color="primary" elevation="2" @click="dialogDelete = false"
                >Close</v-btn
              >
              <v-btn color="primary" elevation="2" @click="deleteUser"
                >Ok</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <v-text-field
        :value="itemsPerPage"
        label="User per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import global from "~/mixins.js/global.js";
import moment from "moment";

export default {
  name: "DataTable",
  middleware: "auth",
  mixins: [global],
  components: {
    //CustomSelect,
  },
  data: () => ({
    alert: { type: "error", show: false, message: "" },
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    expanded: [],
    dialogCreate: false,
    dialogDelete: false,
    dialogEdit: false,
    users: [],
    loading: true,
    editedItem: {
      name: "",
      surname: "",
      birth_date: "",
      phone_number: "",
      shipping_address: {},
      codice_fiscale: "",
      email: "",
      created_at: new Date().toISOString(),
      dark_theme: true,
      password: "",
      confirmpassword: "",
    },
  }),
  watch: {
    async search() {
      console.log(this.search);
      var result_search = "";
      if (this.search.length > 2) {
        result_search = await this.getFromSearch();
        if (!result_search.length) this.users = [];
      }
      //if (!result_search.length) this.users = [];
      if (result_search.length > 0 && result_search !== undefined)
        this.users = result_search;
      if (!this.search.length) this.fetchData();
    },
  },
  methods: {
    handleExpansion(item, state) {
      const itemIndex = this.expanded.indexOf(item);

      state ? this.expanded.splice(itemIndex, 1) : this.expanded.push(item);
    },
    async addItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialogCreate = true;
    },
    editItem(item) {
      this.defaultSelected = [];
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    getFromSearch() {
      const params = { q: this.search };
      return this.$axios
        .get("http://192.168.1.86:3001/api/users/search", { params })
        .then(function (response) {
          console.log(`response.data: ${JSON.stringify(response.data)}`);
          var result = response.data;
          return result;
        })
        .catch(function (error) {
          //handle error
          console.log(error);
        });
    },
    async createUser() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        await axios
          .post("http://192.168.1.86:3001/api/auth/signup", {
            user: this.editedItem,
          })
          .then((response) => {
            this.alert = {
              type: "success",
              show: true,
              message: response.data.message,
            };
            this.users.push(this.editedItem);
            this.dialogCreate = false;
          })
          .catch((error) => {
            this.alert = {
              type: "error",
              show: true,
              message: error.response.data.message,
            };
            return error;
          });
      }
    },
    async editUser() {
      await axios
        .post("http://192.168.1.86:3001/api/auth/update", {
          _id: this.editedItem._id,
          user: this.editedItem,
        })
        .then((response) => {
          this.alert = {
            type: "success",
            show: true,
            message: response.data.message,
          };
          this.users.push(this.editedItem);
          this.users.splice(this.editedIndex, 1);
          this.dialogEdit = false;
        })
        .catch((error) => {
          this.alert = {
            type: "error",
            show: true,
            message: error.response.data.message,
          };
          return error;
        });
    },
    async deleteUser() {
      await axios
        .post("http://192.168.1.86:3001/api/auth/delete", {
          _id: this.editedItem._id,
        })
        .then((response) => {
          this.alert = {
            type: "success",
            show: true,
            message: response.data.message,
          };
          this.users.splice(this.editedIndex, 1);
          this.dialogDelete = false;
        })
        .catch((error) => {
          this.alert = {
            type: "error",
            show: true,
            message: error.response.data.message,
          };
          return error;
        });
    },
    async fetchData() {
      this.loading = true;
      axios.get("http://192.168.1.86:3001/api/users").then(async (res) => {
        this.loading = false;
        res.data.map((user) => {
          user.created_at = moment(user.created_at).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        this.users = res.data;
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
