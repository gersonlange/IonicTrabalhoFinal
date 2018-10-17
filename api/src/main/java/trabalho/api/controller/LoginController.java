package trabalho.api.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import trabalho.api.entity.Usuario;
import trabalho.api.model.Login;
import trabalho.api.model.Token;
import trabalho.api.repo.UsuarioRepository;

@RestController
public class LoginController
{
	private static HashMap<String, Long> tokens = new HashMap<>();
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@PostMapping(value = "/auth")
	@CrossOrigin(origins = {"http://localhost:8100", "http://localhost:8080"})	
	public ResponseEntity<?> auth(
			@RequestBody Login login) throws JsonParseException, JsonMappingException, IOException
	{
		Usuario usuario = usuarioRepository.findByUsuario(login.getUsername());

		if ( usuario != null && usuario.getSenha().equals(login.getPassword()) )
		{
			Token token = new Token();
			token.setNome(usuario.getNome());
			token.setToken(UUID.randomUUID().toString());
			token.setData(new Date().getTime());

			tokens.put(token.getToken(), token.getData());

			return new ResponseEntity<Token>(token, HttpStatus.OK);
		}

		return new ResponseEntity<String>(HttpStatus.UNAUTHORIZED);
	}
}