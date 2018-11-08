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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import trabalho.api.entity.Professores;
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
		
		logger.debug(lista.toString());

		return new ResponseEntity<List<Professores>>(lista, HttpStatus.OK);

	}
}