import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface ICustomer {
    customerNr: number
    name: string
    email: string
    addresse: string
    townCity: string
    country: string
    postNr: number
    telefonNr: number
    currency: string
    cvr: number
}

interface IProduct {
    productId: number
    productNr: number
    customerNr: number
    invoiceNr: number
    serialNr: string
}

// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
let baseUrl: string = "https://customerrestservice.azurewebsites.net/api/Customers"

let baseUrl2: string = "https://customerrestservice.azurewebsites.net/api/Products"


new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        customers: [],
        searchToGetBy: "",
        updateData: { customerNr: "", name: "", email: "", addresse: "", townCity: "", country: "", postNr: "", telefonNr: "", currency: "", cvr: ""},
        updateMessage: "",
        deleteId: 0,
        deleteMessage: "",
        products: [],
        customerNrToGetBy: 0
    },
    methods: {
        // Gør det nemmere for Get metoder at vise værdierne, hvor den bruger axios' get-metode og URL'en, men kun med kunder.
        helperGetAndShow(url: string) {
            axios.get<ICustomer[]>(url)
                .then((response: AxiosResponse<ICustomer[]>) => {
                    this.customers = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        },
        // Gør det samme som det ovenover, men med varer.
        helperGetAndShow2(url: string) {
            axios.get<IProduct[]>(url)
                .then((response: AxiosResponse<IProduct[]>) => {
                    this.products = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        },
        // Henter alle kunder ved hjælp af helperGetAndShow
        getAllCustomers() {
            this.helperGetAndShow(baseUrl)
        },
        // Henter en liste med kunder, så længer vædierne passer til det der indtastes i "search".
        getBySearch(keyword: string) {
            let url: string = baseUrl + "/" + "search" + "/" + keyword
            this.helperGetAndShow(url)
        },
        // Opdater en kunde med den rigtige URL og kundens kundenummer.
        updateCustomer() {
            let url: string = baseUrl + "/" + this.updateData.customerNr
            axios.put<ICustomer>(url, this.updateData)
                .then((response: AxiosResponse) => {
                    let message: string = response.statusText + " kunden er opdateret."
                    this.updateMessage = message
                    this.getAllCustomers()
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        },
        // Sletter en kunde med et bestemt kundenummer.
        deleteCustomer(customerNr: number) {
            let url: string = baseUrl + "/" + customerNr
            axios.delete<void>(url)
                            .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = response.statusText + " kunden er fjernet"
                    this.getAllCustomers()
               })
                .catch((error: AxiosError) => {
                    //this.deleteMessage = error.message
                    alert(error.message)
                })
        },
        // Henter en liste af varer der passer med kundens kundenummer, og bruger den rigtige URL så den kan hente varer.
        getByCustomerNr(customerNr: number) {
            let url: string = baseUrl2 + "/" + "customerNr" + "/" + customerNr
            this.helperGetAndShow2(url)
        }
    }
})
