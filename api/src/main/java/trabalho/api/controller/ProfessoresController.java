/**
 * 
 */
package trabalho.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import trabalho.api.entity.Professores;
import trabalho.api.model.Professor;
import trabalho.api.repo.ProfessoresRepository;

/**
 * @author gerson
 *
 */
@RestController
public class ProfessoresController
{
	private static Logger logger = LoggerFactory.getLogger(ProfessoresController.class);

	@Autowired
	private ProfessoresRepository professoresRepository;

	@GetMapping(value = "/professores")
	@CrossOrigin(origins = {"http://localhost:8100", "http://localhost:8080"})	
	public ResponseEntity<List<Professores>> lista()
	{
		List<Professores> lista = professoresRepository.findAll();
		
		return new ResponseEntity<List<Professores>>(lista, HttpStatus.OK);

	}

	@PostMapping(value = "/professor")
	@CrossOrigin(origins = {"http://localhost:8100", "http://localhost:8080"})	
	public ResponseEntity<?> salvar(
			@RequestBody Professor dados)
	{
		logger.info("dados: " + dados);

		Professores d = new Professores();

		if ( dados.getId() > 0 )
			d.setId(dados.getId());

		d.setNome(dados.getNome());
		d.setDataNascimento(dados.getData_nascimento());
		d.setCurriculo(dados.getCurriculo());
		d.setStatus(dados.getStatus());
		d.setFoto(dados.getFoto());
		professoresRepository.save(d);

		return new ResponseEntity<String>(HttpStatus.OK);

	}

	@DeleteMapping(value = "/professor/{id}")
	@CrossOrigin(origins = {"http://localhost:8100", "http://localhost:8080"})	
	public ResponseEntity<?> deletar(
			@PathVariable("id") long id)
	{
		logger.info("id: " + id);

		professoresRepository.delete(id);

		return new ResponseEntity<String>(HttpStatus.OK);

	}
}