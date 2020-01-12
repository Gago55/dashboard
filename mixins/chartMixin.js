import axios from 'axios'

export default {
    data() {
        return {
          chartdata: {
            labels: [],
            datasets: [
              {
                label: this.toCurrency,
                backgroundColor: this.color,
                fill: this.fill,
                data: []
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true
          },
          clearRange: this.dateRange
        }
      },
      watch: {
        dateRange(value) {
          if (value.length === 2) {
            if (this.checkData()) {
              // this.checkDaysCount()
              this.getData()
            }
          }
        }
      } ,
      mounted() {
        this.getData()
      },
      methods: {
        checkData() {
          let date1 = new Date(this.dateRange[0]).getTime() / 1000 //Get unix timestamp
          let date2 = new Date(this.dateRange[1]).getTime() / 1000 //Get unix timestamp
    
          let currentData = new Date().getTime() / 1000
    
          let to = date1 > date2 ? date1 : date2
          let from = date1 < date2 ? date1 : date2
    
          if (from > currentData) return false
    
          if (to <= currentData) return true
          else {
            let newRange = []
    
            newRange.push(this.getDateStringFromTimestamp(from))
            newRange.push(this.getDateStringFromTimestamp(currentData))
            this.clearRange = newRange
    
            return true
          }
        },
        checkDaysCount() {
          let limit = this.daysLimit
    
          let date1 = new Date(this.dateRange[0]).getTime() / 1000 //Get unix timestamp
          let date2 = new Date(this.dateRange[1]).getTime() / 1000 //Get unix timestamp
    
          let currentData = new Date().getTime() / 1000
    
          let to = date1 > date2 ? date1 : date2
          let from = date1 < date2 ? date1 : date2
          let daysCount = Math.abs(date1 - date2) / (60 * 60 * 24)
    
          if (daysCount > limit) {
            let newToDate = from + 60 * 60 * 24 * (limit - 1)
            let newRange = []
            newRange.push(this.getDateStringFromTimestamp(from))
            newRange.push(this.getDateStringFromTimestamp(newToDate))
            this.dateRange = newRange
          }
        },
        getDateStringFromTimestamp(time) {
          let year = new Date(time * 1000).getFullYear()
          let month = new Date(time * 1000).getMonth() + 1
          let day = new Date(time * 1000).getDate()
    
          month = month.toString().length > 1 ? month : "0" + month
          day = day.toString().length > 1 ? day : "0" + day
    
          return `${year}-${month}-${day}`
        },
        getData() {
          let date1 = new Date(this.dateRange[0]).getTime() / 1000 //Get unix timestamp
          let date2 = new Date(this.dateRange[1]).getTime() / 1000 //Get unix timestamp
    
          let to = date1 > date2 ? date1 : date2
          let daysCount = Math.abs(date1 - date2) / (60 * 60 * 24)
    
          axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${this.fromCurrency}&tsym=${this.toCurrency}&limit=${daysCount}&toTs=${to}`,{
                authorization:
                  "35e71bf39ce066a87cc504b0f0143498c2b0b146876c56a9cf0fde9b764d1836"
              }
            )
            .then(response => {
              if (response.data.Response === "Success") {
                let data = response.data.Data.Data
                let values = []
                let labels = []
                // debugger
                data.forEach(d => {
                  let time = new Date(d.time * 1000)
                  values.push(d.open)
                  labels.push("" + time.getDate() + "/" + (time.getMonth() + 1))
                })
                this.chartdata.datasets[0].data = values
                this.chartdata.labels = labels
    
                if(this.$store.getters.getIsAuth)
                  this.renderChart(this.chartdata, this.options)
              }
            })
        }
      }
}