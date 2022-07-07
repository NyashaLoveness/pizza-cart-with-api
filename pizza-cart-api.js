document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {
        init() {
            axios
        .get("https://pizza-cart-api.herokuapp.com/api/pizzas")
        .then((result) =>{
            this.pizzas = result.data.pizzas
        })
        // now we get the username
        .then((result) => {
            return this.createCart();
        })
        // now we ge the cart ID
        .then((result) => {
            this.cartID = result.data.cart_code;
        });
        },

        createCart(){
            return axios
            .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
        },

        showCart(){
            const url = 'https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartID}/get';

            axios
            .get(url)
            .then((result) => {
                this.cart = result.data;
            });
        },


        pizzas: [],
        username: 'Nyasha Loveness',
        cartID: '',
        message: " ",
        cart: {total: 0},

        // now you are going to send parameters to the API using post
        add(pizza) {
            const parameters = {
                cart_code: this.cartID,
                pizza_id: pizza.id
            }
            axios
            .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', parameters)
            .then(() => {
                this.message = 'Pizza added to the cart'
                this.showCart();
            })
            .catch(err => alert(err));
        },
      }
    })
})