import Navbar from '@/components/Navbar'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', padding: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px', color: '#111827' }}>Términos de Servicio</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>Última actualización: 25 de abril de 2026</p>

          <div style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar el sitio web www.onnicosmetics.com (en adelante, "el Sitio"), operado por ONNI Caribe (Arias Group Caribe SRL, RNC 1-33-63109-1), usted acepta y se obliga legalmente por estos Términos de Servicio.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>2. Información de la Empresa</h2>
            <p><strong>ONNI Caribe</strong><br />
            Arias Group Caribe SRL<br />
            RNC: 1-33-63109-1<br />
            Registro Mercantil: 219020SD<br />
            Dirección: Av. Independencia Km 6, Plaza Atala I, Santo Domingo, República Dominicana<br />
            Email: hola@onnicosmetics.com<br />
            WhatsApp: +1 (849) 475-4442</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>3. Productos</h2>
            <p>Todos los productos vendidos en este Sitio son cosméticos coreanos 100% auténticos, importados directamente desde Corea del Sur. Los productos están sujetos a disponibilidad. Nos reservamos el derecho de limitar cantidades y discontinuar productos sin previo aviso.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>4. Precios y Pagos</h2>
            <p>Todos los precios están en USD (dólares estadounidenses). Los precios pueden cambiar sin previo aviso. Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, MercadoPago y Nequi (Colombia).</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>5. Envíos</h2>
            <p>Realizamos envíos a República Dominicana, Panamá, Costa Rica, Puerto Rico, Colombia y resto de Latinoamérica. Los tiempos de entrega varían entre 3-15 días hábiles según el destino.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>6. Devoluciones</h2>
            <p>Aceptamos devoluciones dentro de los 30 días posteriores a la entrega. Los productos deben estar sin usar y en su empaque original. El cliente cubre los costos de envío de devolución (excepto defectos de fábrica).</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>7. Limitación de Responsabilidad</h2>
            <p>Los productos cosméticos son para uso externo únicamente. ONNI Caribe no se hace responsable por reacciones alérgicas o adversas derivadas del mal uso de los productos.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>8. Ley Aplicable</h2>
            <p>Estos términos se rigen por las leyes de la República Dominicana. Cualquier disputa será sometida a los tribunales de Santo Domingo.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>9. Contacto</h2>
            <p>Para cualquier pregunta sobre estos Términos de Servicio:<br />
            Email: legal@onnicosmetics.com<br />
            WhatsApp: +1 (849) 475-4442</p>
          </div>
        </div>
      </div>
    </>
  )
}
