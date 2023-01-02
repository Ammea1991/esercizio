import moment from "moment";
import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode,
} from "vee-validate";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";


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

        defaultItem: {
            name: "",
            surname: "",
            birth_date: "",
            phone_number: "",
            address: {},
            shipping_address: {},
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
            { text: "Email", value: "email", filterable: true },
            { text: "Name", value: "name", filterable: true },
            { text: "Surname", value: "surname", filterable: true },
            { text: "Codice fiscale", value: "codice_fiscale", filterable: true },
            { text: "", value: "actions", sortable: false },
        ],
        showModalAdd: false,
        showModalEdit: false,
        showModalDelete: false,
        alert: { type: "error", show: false, message: "" },
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        search: "",
        defaultSelected: [],
        users: [],
        dialog: false,
        dialogDelete: false,
        dialogEdit: false,
        menu2: false,
        keep_for_shipping: true,
        user: [],
        password: "Password",
        show_psw: false,
        show_confpsw: false,
        movies: [],
        rules: {
            required: (value) => !!value || "Required.",
        },
        totalUsers: 0,
        loading: true,
        pagination: {},
    }),
    methods: {
        submit() {
            this.$refs.observer.validate();
        },
        clear() {
            this.editedItem.name = "";
            this.editedItem.surname = "";
            this.editedItem.phoneNumber = "";
            this.editedItem.email = "";
            this.keep_for_shipping = null;
            this.$refs.observer.reset();
        },
        closeDialog() {
            this.show = false
            // this.$nextTick(() => {
            //     this.editedItem = Object.assign({}, this.defaultItem);
            //     this.editedIndex = -1;
            // });
        },
        async getMovies() {
            const data = this.$axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=b8e3a8c9cfbc5262db03ad7f8a367a24')
            const result = await data;
            result.data.results.forEach((movie) => {
                this.movies.push(movie)
            });
            console.log(this.movies)
        },
        async getProducts() {
            await this.$axios
                .get("http://192.168.1.86:3001/api/products", {})
                .then(async (res) => {
                    console.log(res.data)
                    this.products = res.data;
                });
        },
        async addItem() {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.showModalAdd = true;
        },
        async editItem(item) {
            this.defaultSelected = [];
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            console.log(`EditedItem test: ${JSON.stringify(this.editedItem)}`)
            this.showModalEdit = true;
            //return this.editedItem;
        },
        async deleteItem(item) {
            this.defaultSelected = [];
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            console.log(`EditedItem test: ${this.editedItem.email}`)
            this.showModalDelete = true;
            return this.editedItem;

        },

        async getUsers() {
            await this.$axios
                .get("http://192.168.1.86:3001/api/users").then(async (res) => {
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
            this.closeDialog();
            var path = this.$route.path;
            await this.$axios
                .post("http://192.168.1.86:3001/api/auth/signup", {
                    user: this.editedItem,
                })
                .then((response) => {
                    this.$router.push({
                        path: '/login'
                    })
                })
                .catch((error) => {
                    return error;
                });
        },
        async fetchData() {
            this.loading = true;
            await this.$axios
                .get("http://192.168.1.86:3001/api/users")
                .then(async (res) => {
                    this.loading = false;
                    res.data.map((user) => {
                        user.created_at = moment(user.created_at).format(
                            "YYYY-MM-DD HH:mm:ss"
                        );
                    });
                    this.users = res.data;
                });
        },
        async addUser() {
            this.closeDialog();
            var path = this.$route.path;
            await this.$axios
                .post("http://192.168.1.86:3001/api/auth/signup", {
                    user: this.editedItem,
                })
                .then((response) => {
                    if (path === '/subscription') {
                        this.$router.push({
                            path: '/login'
                        })
                    }
                    this.users.push(this.editedItem)
                })
                .catch((error) => {
                    return error;
                });
        },
        async editPsw() {
            this.closeDialog();
            await this.$axios
                .post("http://192.168.1.86:3001/api/auth/changePsw", {
                    email: this.editedItem.email,
                    password: this.editedItem.confirmpassword,
                })
                .then((response) => {
                    this.alert = {
                        type: "success",
                        show: true,
                        message: response.data.message,
                    };
                    this.$fetch()
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
        },
    },
    async fetch() {
        await this.getUsers();
    },
}
