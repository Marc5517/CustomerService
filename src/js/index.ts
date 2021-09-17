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
    publicEntry: Date
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
        updateData: { customerNr: "", name: "", email: "", addresse: "", townCity: "", country: "", postNr: "", telefonNr: "", currency: "", cvr: "", publicEntry:""},
        updateMessage: "",
        deleteId: 0,
        deleteMessage: "",
        products: [],
        customerNrToGetBy: 0
    },
    methods: {
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
        getAllCustomers() {
            this.helperGetAndShow(baseUrl)
        },
        getBySearch(keyword: string) {
            let url: string = baseUrl + "/" + "search" + "/" + keyword
            this.helperGetAndShow(url)
        },
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
        getByCustomerNr(customerNr: number) {
            let url: string = baseUrl2 + "/" + "customerNr" + "/" + customerNr
            this.helperGetAndShow2(url)
        }
    }
})