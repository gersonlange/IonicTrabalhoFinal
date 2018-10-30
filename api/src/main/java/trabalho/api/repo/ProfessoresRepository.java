package trabalho.api.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import trabalho.api.entity.Professores;

public interface ProfessoresRepository extends JpaRepository<Professores, Long>
{
}