import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function BlogPost1() {
  return (
    <>
      <Navbar />
      
      <article style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fce7f3', padding: '80px 20px', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500', textTransform: 'uppercase' }}>
            Rutinas
          </span>
          <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#111827', marginTop: '16px', marginBottom: '24px', maxWidth: '800px', margin: '16px auto 24px' }}>
            Rutina Coreana de 10 Pasos para Piel Tropical
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
            <span>25 Abr 2026</span>
            <span>·</span>
            <span>8 min de lectura</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', backgroundColor: 'white' }}>
          <div style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '24px' }}>
              La famosa rutina coreana de 10 pasos llegó para quedarse, pero ¿sabías que en el Caribe necesitamos adaptarla? La humedad alta (75-85%), la radiación UV constante y la tendencia a la hiperpigmentación exigen ajustes inteligentes.
            </p>

            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginTop: '48px', marginBottom: '24px' }}>
              Paso 1: Doble Limpieza (Oil + Water)
            </h2>
            <p style={{ marginBottom: '24px' }}>
              En clima tropical, la doble limpieza es NO NEGOCIABLE. El exceso de sebo, el sudor y el protector solar resistente al agua requieren dos pasos:
            </p>
            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Oil Cleanser:</strong> Disuelve SPF, maquillaje y sebo. Busca texturas ligeras con carbón activado o tea tree.</li>
              <li style={{ marginBottom: '12px' }}><strong>Water Cleanser:</strong> Limpia residuos y purifica. pH bajo (5.5) con heartleaf o BHA suave.</li>
            </ul>

            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginTop: '48px', marginBottom: '24px' }}>
              Paso 2: Tónico Hidratante
            </h2>
            <p style={{ marginBottom: '24px' }}>
              Olvidate de los tónicos astringentes con alcohol. En el Caribe necesitás hidratación ligera. Buscá ingredientes como:
            </p>
            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Ácido hialurónico</li>
              <li style={{ marginBottom: '8px' }}>Beta-glucano</li>
              <li style={{ marginBottom: '8px' }}>Extracto de durazno</li>
              <li style={{ marginBottom: '8px' }}>Niacinamida (3-5%)</li>
            </ul>

            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginTop: '48px', marginBottom: '24px' }}>
              Paso 3-4: Esencia + Sérum
            </h2>
            <p style={{ marginBottom: '24px' }}>
              Acá es donde atacás tus preocupaciones específicas:
            </p>
            <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Para manchas y PIH:</h3>
              <p style={{ fontSize: '14px', color: '#4b5563' }}>
                Niacinamida 5% + Ácido Tranexámico 2%. Combinación probada para hiperpigmentación post-inflamatoria, común en piel caribeña.
              </p>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginTop: '48px', marginBottom: '24px' }}>
              Paso 5: Crema Hidratante
            </h2>
            <p style={{ marginBottom: '24px' }}>
              En clima tropical, menos es más. Buscá texturas gel-cream o water-gel. Ingredientes clave:
            </p>
            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Centella asiática (calma)</li>
              <li style={{ marginBottom: '8px' }}>Ceramidas (barrera)</li>
              <li style={{ marginBottom: '8px' }}>Escualano (hidratación sin peso)</li>
            </ul>

            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginTop: '48px', marginBottom: '24px' }}>
              Paso 6: Protector Solar (EL MÁS IMPORTANTE)
            </h2>
            <p style={{ marginBottom: '24px' }}>
              En el Caribe, el SPF no es opcional. Es EL paso que previene manchas, envejecimiento prematuro y cáncer de piel.
            </p>
            <div style={{ backgroundColor: '#fef3c7', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>🌞 Lo que necesitás:</h3>
              <ul style={{ fontSize: '14px', color: '#4b5563', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>SPF50+ PA++++ (máxima protección UVA/UVB)</li>
                <li style={{ marginBottom: '8px' }}>Filtros químicos de nueva generación (sin cast blanco)</li>
                <li style={{ marginBottom: '8px' }}>Resistente al sudor y agua</li>
                <li style={{ marginBottom: '8px' }}>Textura ligera tipo esencia</li>
                <li style={{ marginBottom: '8px' }}>Reaplicar cada 2-3 horas si estás al sol</li>
              </ul>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginTop: '48px', marginBottom: '24px' }}>
              Pasos 7-10 (Opcionales según necesidad)
            </h2>
            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Mascarilla sheet mask:</strong> 2-3 veces por semana para hidratación extra</li>
              <li style={{ marginBottom: '12px' }}><strong>Contorno de ojos:</strong> Si tenés preocupaciones específicas (ojeras, líneas)</li>
              <li style={{ marginBottom: '12px' }}><strong>Tratamiento spot:</strong> Para granitos ocasionales (tea tree, AHA/BHA)</li>
              <li style={{ marginBottom: '12px' }}><strong>Mascarilla sleeping pack:</strong> Opcional, solo si tu piel lo necesita</li>
            </ul>

            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginTop: '48px', marginBottom: '24px' }}>
              Adaptación para el Caribe: Resumen
            </h2>
            <div style={{ backgroundColor: '#d1fae5', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #059669' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#065f46' }}>Paso</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#065f46' }}>Adaptación Tropical</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #a7f3d0' }}>
                    <td style={{ padding: '12px', color: '#065f46' }}>Limpieza</td>
                    <td style={{ padding: '12px', color: '#065f46' }}>Doble limpieza obligatoria</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #a7f3d0' }}>
                    <td style={{ padding: '12px', color: '#065f46' }}>Tónico</td>
                    <td style={{ padding: '12px', color: '#065f46' }}>Hidratante, sin alcohol</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #a7f3d0' }}>
                    <td style={{ padding: '12px', color: '#065f46' }}>Sérum</td>
                    <td style={{ padding: '12px', color: '#065f46' }}>Niacinamida + TXA para manchas</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #a7f3d0' }}>
                    <td style={{ padding: '12px', color: '#065f46' }}>Crema</td>
                    <td style={{ padding: '12px', color: '#065f46' }}>Textura gel, ligera</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', color: '#065f46' }}>SPF</td>
                    <td style={{ padding: '12px', color: '#065f46' }}>SPF50+ PA++++, resistente al agua</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: '16px', color: '#6b7280', fontStyle: 'italic', borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: '48px' }}>
              ¿Tenés dudas sobre tu rutina ideal? Escribinos por WhatsApp y te asesoramos personalmente.
            </p>
          </div>
        </div>

        {/* Footer del post */}
        <div style={{ backgroundColor: '#f9fafb', padding: '40px 20px', textAlign: 'center' }}>
          <Link
            href="/blog"
            style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}
          >
            ← Volver al blog
          </Link>
        </div>
      </article>
    </>
  )
}
