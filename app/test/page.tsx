export default function TestPage() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      backgroundColor: '#1e293b',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Teste - Sistema Funcionando!
        </h1>
        <p style={{ color: '#94a3b8' }}>
          Se você está vendo isso, o Next.js está funcionando.
        </p>
      </div>
    </div>
  )
}
