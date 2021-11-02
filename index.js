const port = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()

const newspapers = [
    {
        name:'The Times',
        address:'https://www.thetimes.co.uk/environment/climate-change'
    },
    {
        name:'The Guardian',
        address:'https://www.theguardian.com/environment/climate-crisis'
    },
    {
        name:'BBC',
        address:'https://www.bbc.com/news/science-environment-56837908'
    },
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
         const $ = cheerio.load(html) 

         $('a:contains("climate")',html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url,
                source:newspaper.name
            })
         })
    })
})

app.get('/',(req,res) => {
    res.json('climate change API')
})

 app.get('/news',(req,res) => {
  res.json(articles)
 })

app.listen(port, () => console.log('${port}'))


//     axios.get('https://www.dailymail.co.uk/news/climate_change_global_warming/index.html')
//     .then((response) => {
//         const html = response.data
//         const $ = cheerio.load(html)

//         $('a:contains("climate")', html).each(function () {
//             const title = $(this).text()
//             const url = $(this).attr('href')
//             articles.push({
//                 title,
//                 url
//             })
//         })
//         res.json(articles)
//     }).catch(err => console.log(err))