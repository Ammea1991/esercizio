import moment from "moment";
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode,
    required,
    digits,
    email,
    max,
    regex
} from 'vee-validate/dist/vee-validate.full';

setInteractionMode("eager");

extend("digits", {
    ...digits,
    message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
    ...required,
    message: "{_field_} can not be empty",
});


extend("max", {
    ...max,
    message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
    ...regex,
    message: "{_field_} {_value_} does not match ",
});

extend("email", {
    ...email,
    message: "Email must be valid",
});


export default {
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        showHideSpinner: true,
        alert: { type: "error", show: false, message: "" },
        loginData: {
            email: "",
            password: "",
        },
        defaultItem: {
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
        header_extra_info_users: [
            { text: "Country", value: "shipping_address.country", sortable: false },
            { text: "Region", value: "shipping_address.region", sortable: false },
            { text: "Province", value: "shipping_address.province", sortable: false },
            { text: "Locality", value: "shipping_address.locality", sortable: false },
            { text: "Route", value: "shipping_address.route", sortable: false },
            { text: "Street number", value: "shipping_address.street_number", sortable: false },
            { text: "Phonenumber", value: "phone_number", sortable: false },
            { text: "Birth date", value: "birth_date", sortable: false },
        ],
        header_users: [
            { text: "Email", value: "email" },
            { text: "Name", value: "name" },
            { text: "Surname", value: "surname" },
            { text: "Codice fiscale", value: "codice_fiscale" },
            { text: "", value: "actions", sortable: false },
        ],
        alert: { type: "error", show: false, message: "" },
        users: [],
        menu2: false,
        user: [],
        password: "Password",
        show_psw: false,
        show_confpsw: false,
        totalUsers: 0,
        loading: true,
    }),
    methods: {
        ...mapActions({
            resetMyStep: "step/resetMyStep",
            resetModals: "modal/resetModals",
        }),
        async login() {
            await this.$auth.loginWith("local", {
                data: this.loginData,
            }).then((response) => {
                if (response)
                    this.$router.push("/home");
            }).catch((error) => {
                this.alert = {
                    type: "error",
                    show: true,
                    message: `${error.response.data.message}`,
                };

            })
        },
        submit() {
            this.$refs.observer.validate();
        },
        async getCurrentUser() {
            this.loading = true;
            const params = { email: this.$store.getters.getUserInfo.email };
            axios
                .get("http://localhost:3002/api/user", { params })
                .then(async (response) => {
                    this.alert = {
                        type: "info",
                        show: true,
                        message: response.data.message,
                    };
                    this.loading = false;
                    this.editedItem = response.data.user;
                });
        },
        async getUsers() {
            this.loading = true;
            await axios
                .get("http://localhost:3002/api/users").then(async (res) => {
                    this.loading = false;
                    res.data.map((user) => {
                        user.created_at = moment(user.created_at).format(
                            "YYYY-MM-DD"
                        );
                        user.birth_date = moment(user.birth_date).format(
                            "YYYY-MM-DD"
                        );
                    });
                    this.users = res.data;
                });
        },
        async subscribeUser() {
            var path = this.$route.path;
            await axios
                .post("http://localhost:3002/api/auth/signup", {
                    user: this.editedItem,
                })
                .then((response) => {
                    this.resetMyStep();
                    this.$router.push({
                        path: '/login'
                    })
                })
                .catch((error) => {
                    return error;
                });
        },
        async addUser() {
            if (this.editedItem.password === this.editedItem.confirmpassword) {
                var path = this.$route.path;
                await axios
                    .post("http://localhost:3002/api/auth/signup", {
                        user: this.editedItem,
                    })
                    .then((response) => {
                        this.users.push(this.editedItem)
                        this.resetMyStep();
                        if (path === '/subscription') {
                            this.$router.push({
                                path: '/login'
                            })
                        }
                    })
                    .catch((error) => {
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
                    this.resetMyStep();
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
        async editPsw() {
            if (this.editedItem.password === this.editedItem.confirmpassword) {
                await axios
                    .post("http://localhost:3002/api/auth/changePsw", {
                        email: this.editedItem.email,
                        password: this.editedItem.confirmpassword,
                    })
                    .then((response) => {
                        this.alert = {
                            type: "success",
                            show: true,
                            message: response.data.message,
                        };
                    })
                    .catch((error) => {
                        this.alert = {
                            type: "error",
                            show: true,
                            message: error.response.data.message,
                        };
                        return error;
                    });
                this.users.splice(this.editedIndex, 1);
            } else {
                this.alert = {
                    type: "error",
                    show: true,
                    message: "Passowrd does not match",
                };
            }

        },
    },
    watch: {
        alert(new_val) {
            if (new_val) {
                setTimeout(() => {
                    this.alert.show = false;
                }, 6000);
            }
        },
    },
    async fetch() {
        await this.getUsers();
    },
    beforeCreate() {
        this.showHideSpinner = true;
    },
    mounted() {
        this.showHideSpinner = false;
    },
}
