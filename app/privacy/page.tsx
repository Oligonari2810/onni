import Navbar from '@/components/Navbar'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', padding: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px', color: '#111827' }}>Política de Privacidad</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>Última actualización: 25 de abril de 2026</p>

          <div style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>1. Información que Recopilamos</h2>
            <p>Recopilamos información que usted proporciona directamente: nombre, email, teléfono, dirección de envío y facturación, e información de pago (procesada de forma segura por terceros).</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>2. Cómo Usamos su Información</h2>
            <p>Usamos su información para procesar pedidos, enviar comunicaciones de servicio, responder consultas, personalizar su experiencia, y enviar marketing (solo con su consentimiento).</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>3. Con Quién Compartimos su Información</h2>
            <p>Compartimos información con procesadores de pago (Stripe, PayPal), empresas de envío (DHL, FedEx, UPS), y proveedores de email. NO vendemos su información a terceros.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>4. Transferencias Internacionales</h2>
            <p>Su información puede ser transferida y procesada en República Dominicana, Canadá (Shopify), Estados Unidos (Stripe, Google), y otros países donde operan nuestros proveedores.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>5. Seguridad de Datos</h2>
            <p>Implementamos encriptación SSL/TLS para todas las transacciones, encriptación de datos en reposo, acceso restringido solo a personal autorizado, y monitoreo continuo de actividades sospechosas.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>6. Sus Derechos</h2>
            <p>Usted tiene derecho a acceso, rectificación, eliminación, portabilidad, oposición y limitación de sus datos. Puede ejercer estos derechos contactando a privacidad@onnicosmetics.com.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>7. Menores de Edad</h2>
            <p>Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información de menores.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>8. Cambios a esta Política</h2>
            <p>Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos mediante email o banner en nuestro sitio web.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>9. Contacto</h2>
            <p>Para consultas sobre privacidad:<br />
            Email: privacidad@onnicosmetics.com<br />
            WhatsApp: +1 (849) 475-4442<br />
            Dirección: Av. Independencia Km 6, Plaza Atala I, Santo Domingo, República Dominicana</p>
          </div>
        </div>
      </div>
    </>
  )
}
