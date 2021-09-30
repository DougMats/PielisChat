// const ApiCrm      = 'https://pdtclientsolutions.com/ventascc/api'
// const ApiWhatsapp = 'https://apiwa.pdtcomunicaciones.com:3001'


const Api = 'https://pdtclientsolutions.com/laser/api'
const ApiCrm      = 'https://pdtclientsolutions.com/ventascc/api'



const ApiWhatsapp = 'https://apiwa.pdtcomunicaciones.com:3001' // 3001 //3003  //'http://127.0.0.1:3001'
const base_url = function base_url(server, uri){
    return `${server}/${uri}`
}
export  {
    base_url,
    ApiCrm,
    ApiWhatsapp,
    Api
}