<template>
  <Loading v-if="showHideSpinner" />
  <div v-else>
    <v-alert
      outlined
      :value="alert.show"
      dismissible
      elevation="3"
      :type="alert.type"
      >{{ alert.message }}</v-alert
    >
    <v-data-table
      class="usertable elevation-2"
      ref="myTable"
      :headers="header_users"
      sort-by="email"
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
            dense
            class="usertable mb-8 pa-2"
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
          <v-text-field
            class="pa-2"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-card-actions class="pa-6">
            <v-row>
              <v-col align="right">
                <v-btn
                  title="Create new user"
                  color="primary"
                  elevation="2"
                  @click="addItem"
                >
                  Add user
                </v-btn>
              </v-col>
            </v-row>
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
    <v-dialog
      v-model="openModalCreate"
      max-width="800px"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <Stepform
          :editedItem="editedItem"
          @submit-form="createUser"
          @close-modal="closeModalCreate"
        />
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="openModalEdit"
      fullscreen
      hide-overlay
      max-width="800px"
    >
      <v-card>
        <Stepform
          :editedItem="editedItem"
          @submit-form="editUser"
          @close-modal="closeModalEdit"
        />
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="openModalDelete"
      max-width="800px"
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-4">
        <v-card-title class="text-h5"
          >Are you sure you want to delete {{ editedItem.email }}?</v-card-title
        >
        <v-card-actions>
          <v-btn
            large
            width="20%"
            class="mr-5 arrow-prev"
            elevation="2"
            @click="closeModalDelete"
            >Close</v-btn
          >
          <v-spacer />
          <v-btn
            large
            width="20%"
            class="mr-5 arrow-prev"
            color="primary"
            elevation="2"
            @click="deleteUser"
            >Ok</v-btn
          >
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
import global from "~/mixins/global.js";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "home",
  middleware: "auth",
  mixins: [global],
  data: () => ({
    alert: { type: "error", show: false, message: "" },
    search: "",
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    expanded: [],
    users: [],
    loading: true,
    editedItem: {
      name: "",
      surname: "",
      birth_date: "",
      phone_number: "",
      shipping_address: {
        country: "",
        region: "",
        province: "",
        locality: "",
        route: "",
        street_number: "",
        postal_code: "",
      },
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
      var result_search = "";
      if (this.search.length > 2) {
        result_search = await this.getFromSearch();
        if (!result_search.length) this.users = [];
      }
      if (result_search.length > 0 && result_search !== undefined)
        this.users = result_search;
      if (!this.search.length) this.getUsers();
    },
  },
  methods: {
    handleExpansion(item, state) {
      const itemIndex = this.expanded.indexOf(item);
      state ? this.expanded.splice(itemIndex, 1) : this.expanded.push(item);
    },
    addItem() {
      this.resetModals();
      this.resetMyStep();

      this.editedItem = Object.assign(this.editedItem, this.defaultItem);
      this.$store.commit("modal/setModalCreate", true);
    },
    editItem(item) {
      this.resetModals();
      this.resetMyStep();

      this.defaultSelected = [];
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$store.commit("modal/setModalEdit", true);
    },
    deleteItem(item) {
      this.resetModals();
      this.resetMyStep();

      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$store.commit("modal/setModalDelete", true);
    },
    getFromSearch() {
      const params = { q: this.search };
      return this.$axios
        .get("http://localhost:3002/api/users/search", { params })
        .then(function (response) {
          var result = response.data;
          return result;
        })
        .catch(function (error) {
          this.alert = {
            type: "error",
            show: true,
            message: error.message,
          };
        });
    },
    async createUser() {
      if (this.editedItem.password === this.editedItem.confirmpassword) {
        await axios
          .post("http://localhost:3002/api/auth/signup", {
            user: this.editedItem,
          })
          .then((response) => {
            this.alert = {
              type: "success",
              show: true,
              message: response.data.message,
            };
            this.users.push(this.editedItem);
            this.closeModalCreate();
          })
          .catch((error) => {
            this.alert = {
              type: "error",
              show: true,
              message: error.response.data.message,
            };
            return error;
          });
      } else {
        this.alert = {
          type: "error",
          show: true,
          message: "Passowrd does not match",
        };
      }
    },
    async editUser() {
      await axios
        .post("http://localhost:3002/api/auth/update", {
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
          this.closeModalEdit();
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
        .post("http://localhost:3002/api/auth/delete", {
          _id: this.editedItem._id,
          email: this.editedItem.email,
        })
        .then((response) => {
          this.alert = {
            type: "success",
            show: true,
            message: response.data.message,
          };
          if (this.getUserInfo.email === this.editedItem.email)
            this.$auth.logout();
          this.users.splice(this.editedIndex, 1);
          this.closeModalDelete();
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
    closeModalDelete() {
      this.resetMyStep();
      this.$store.commit("modal/setModalDelete", false);
    },
    closeModalEdit() {
      this.resetMyStep();
      this.$store.commit("modal/setModalEdit", false);
    },
    closeModalCreate() {
      this.resetMyStep();
      this.$store.commit("modal/setModalCreate", false);
    },
    ...mapActions({
      resetMyStep: "step/resetMyStep",
      resetModals: "modal/resetModals",
    }),
    ...mapMutations({
      setModalDelete: "modal/setModalDelete",
      setModalEdit: "modal/setModalEdit",
      setModalCreate: "modal/setModalCreate",
    }),
  },
  computed: {
    ...mapState({
      openModalDelete: (state) => state.modal.modalDelete,
      openModalEdit: (state) => state.modal.modalEdit,
      openModalCreate: (state) => state.modal.modalCreate,
    }),
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
