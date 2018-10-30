package trabalho.api.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import trabalho.api.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>
{
	Usuario findByUsuario(String usuario);
	
	Usuario findByEmail(String email);
}