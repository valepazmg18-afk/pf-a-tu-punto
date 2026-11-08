import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_cpld3bu'
const TEMPLATE_ID = 'template_i7ihbq9'
const PUBLIC_KEY = 'qtb32QbCOeflC-6QQ'

export function enviarSolicitud(datos) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    datos,
    PUBLIC_KEY
  )
}