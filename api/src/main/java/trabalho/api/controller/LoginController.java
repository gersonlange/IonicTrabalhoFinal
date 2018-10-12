package trabalho.api.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import trabalho.api.model.Login;
import trabalho.api.model.Token;

@RestController
public class LoginController
{
	private static HashMap<String, String> usuarios = new HashMap<>();
	private static HashMap<String, Long> tokens = new HashMap<>();
	
	@PostConstruct
	private void dados()
	{
		usuarios.put("jose" , "1234");
		usuarios.put("maria", "1111");
	}

	@PostMapping("/auth")
	public ResponseEntity<?> auth(
			@RequestBody Login login)
	{
		if ( usuarios.containsKey(login.getUsername()) && usuarios.get(login.getUsername()).equals(login.getPassword()) )
		{
			Token token = new Token();
			token.setToken(UUID.randomUUID().toString());
			token.setData(new Date().getTime());

			tokens.put(token.getToken(), token.getData());

			return new ResponseEntity<Token>(token, HttpStatus.OK);
		}

		return new ResponseEntity<String>(HttpStatus.UNAUTHORIZED);
	}
}