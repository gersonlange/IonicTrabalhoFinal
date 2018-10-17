package trabalho.api.model;

import lombok.Getter;
import lombok.Setter;

public class Token {

	@Setter @Getter
	private String token;

	@Setter @Getter
	private String nome;

	@Setter @Getter
	private long data;
}