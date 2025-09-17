// src/components/AdminPanel.jsx
const AdminPanel = ({ registrations }) => {
  return (
    <section className="admin-panel">
      <div className="container">
        <h2>Panel de Administración</h2>
        <p>Total de inscripciones: {registrations.length}</p>
        
        <div className="registrations-list">
          <h3>Inscripciones</h3>
          {registrations.length === 0 ? (
            <p>No hay inscripciones aún.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Experiencia</th>
                  <th>Preferencias</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, index) => (
                  <tr key={index}>
                    <td>{reg.name}</td>
                    <td>{reg.email}</td>
                    <td>{reg.phone}</td>
                    <td>{reg.experience}</td>
                    <td>
                      {Object.entries(reg.preferences)
                        .filter(([_, value]) => value)
                        .map(([key]) => key)
                        .join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  )
}

export default AdminPanel