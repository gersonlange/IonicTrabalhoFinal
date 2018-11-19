package trabalho.api.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
public class Professor {
	@Setter @Getter
	private Long id;

	@Setter @Getter
	private String nome;

	@Setter @Getter
	private String data_nascimento;

	@Setter @Getter
	private String curriculo;
	
	@Setter @Getter
	private Boolean status;

	@Setter @Getter
	private String foto;
}
