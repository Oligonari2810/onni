import Navbar from '@/components/Navbar'

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', padding: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px', color: '#111827' }}>Política de Envíos</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>Última actualización: 25 de abril de 2026</p>

          <div style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>1. Zonas de Envío</h2>
            <p>Realizamos envíos a República Dominicana, Panamá, Costa Rica, Puerto Rico, Colombia, México, Chile, Perú, Ecuador, Argentina, Brasil y resto de Latinoamérica.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>2. Tiempos de Entrega</h2>
            <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginTop: '16px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>🇩🇴 <strong>República Dominicana:</strong> 2-3 días hábiles</li>
                <li style={{ marginBottom: '8px' }}>🇵🇷 <strong>Puerto Rico:</strong> 3-5 días hábiles</li>
                <li style={{ marginBottom: '8px' }}>🇵🇦 <strong>Panamá:</strong> 5-7 días hábiles</li>
                <li style={{ marginBottom: '8px' }}>🇨🇷 <strong>Costa Rica:</strong> 5-7 días hábiles</li>
                <li style={{ marginBottom: '8px' }}>🇨🇴 <strong>Colombia:</strong> 7-10 días hábiles</li>
                <li style={{ marginBottom: '8px' }}>🇲🇽 <strong>México, Chile, Perú:</strong> 10-15 días hábiles</li>
                <li style={{ marginBottom: '8px' }}>🇦🇷 <strong>Argentina, Brasil:</strong> 10-15 días hábiles</li>
                <li style={{ marginBottom: '8px' }}>🏝️ <strong>Resto del Caribe:</strong> 7-12 días hábiles</li>
              </ul>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>3. Costos de Envío</h2>
            <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginTop: '16px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>🇩🇴 <strong>República Dominicana:</strong> $5.99 (Gratis sobre $50)</li>
                <li style={{ marginBottom: '8px' }}>🇵🇷 <strong>Puerto Rico:</strong> $6.99 (Gratis sobre $60)</li>
                <li style={{ marginBottom: '8px' }}>🇵🇦 🇨🇷 <strong>Panamá / Costa Rica:</strong> $8.99 (Gratis sobre $75)</li>
                <li style={{ marginBottom: '8px' }}>🇨🇴 <strong>Colombia:</strong> $12.99 (Gratis sobre $100)</li>
                <li style={{ marginBottom: '8px' }}>🇲🇽 🇨🇱 🇵🇪 <strong>México / Chile / Perú:</strong> $14.99 (Gratis sobre $120)</li>
                <li style={{ marginBottom: '8px' }}>🇦🇷 🇧🇷 <strong>Argentina / Brasil:</strong> $14.99 (Gratis sobre $120)</li>
                <li style={{ marginBottom: '8px' }}>🏝️ <strong>Resto del Caribe:</strong> $14.99 (Gratis sobre $120)</li>
              </ul>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>4. Procesamiento de Pedidos</h2>
            <p>Los pedidos se procesan en 1-2 días hábiles. Los pedidos realizados después de las 2:00 PM (AST) se procesan al día hábil siguiente.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>5. Tracking</h2>
            <p>Todos los pedidos incluyen número de tracking que será enviado por email una vez despachado el pedido. Podrás seguir tu pedido en todo momento.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>6. Aduanas e Impuestos</h2>
            <p>Los precios incluyen todos los impuestos de República Dominicana. Para envíos internacionales, los aranceles e impuestos de importación dependen de cada país y corren por cuenta del destinatario.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>7. Pedidos Dañados o Perdidos</h2>
            <p>Si tu pedido llega dañado o se pierde durante el envío, contáctanos dentro de las 48 horas posteriores a la entrega (o fecha estimada de entrega). Cubriremos todos los costos de reemplazo.</p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>8. Contacto</h2>
            <p>Para consultas sobre envíos:<br />
            Email: envios@onnicosmetics.com<br />
            WhatsApp: +1 (849) 475-4442<br />
            Horario: Lunes-Viernes 9AM-6PM (AST)</p>
          </div>
        </div>
      </div>
    </>
  )
}
